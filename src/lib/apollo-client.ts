// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { useSession } from "next-auth/react";
// import { persistCache, LocalForageWrapper } from "apollo3-cache-persist";
// import localForage from "localforage";

// const httpLink = createHttpLink({
//   uri: "http://localhost:3000/api/graphql",
// });
// const cache = new InMemoryCache();

// function createApolloClient() {
//   persistCache({
//     cache,
//     storage: new LocalForageWrapper(localForage),
//   });
//   const authLink = setContext((_, { headers }) => {
//     console.log(headers);

//     return {
//       headers: {
//         ...headers,
//       },
//     };
//   });

//   return new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache,
//   });
// }

// const client = createApolloClient();

// export default client;

import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { setContext } from "@apollo/client/link/context";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const httpLink = new HttpLink({
  uri: "https://cubechron-9b393b862959.herokuapp.com/api/graphql",
  credentials: "include",
});
const authLink = setContext((_, { headers }) => {
  const userId = localStorage.getItem("userid");
  return {
    headers: {
      ...headers,
      userId: userId ? userId : "nope",
    },
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}),
  });
};
// export const optimisticResponseVar = makeVar({});

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null
) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
};
