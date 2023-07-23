import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useSession } from "next-auth/react";
const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
});

function createApolloClient() {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    console.log(headers);
    // Return the headers to the context so httpLink can read them

    // NextAuth.js session
    // const { data: session } = useSession();
    // const userId = session?.user?.id;
    return {
      headers: {
        ...headers,
        // "x-user-id": userId ? userId : "", // Set the user ID in the headers
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

const client = createApolloClient();

export default client;
