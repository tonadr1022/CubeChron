import { persistCache } from "apollo3-cache-persist";
import { InMemoryCache } from "@apollo/client";

const initCache = (initialState?: any) => {
  const cache = new InMemoryCache({
    // typePolicies: {
    //   Solve: {
    //     keyFields: ["id"], // Specify the key fields for the Solve type (assuming 'id' is the unique identifier)
    //     fields: {
    //       createdAt: {
    //         // Define a custom read function to order the solves by 'createdAt'
    //         read(_, { readField }) {
    //           return (existingSolves = []) => {
    //             // Sort the solves array by 'createdAt' in descending order (most recent first)
    //             return existingSolves.slice().sort((a, b) => {
    //               const createdAtA = readField("createdAt", a);
    //               const createdAtB = readField("createdAt", b);
    //               console.log(createdAtA, createdAtB);
    //               return 1;
    //               // return new Date(createdAtB) - new Date(createdAtA);
    //             });
    //           };
    //         },
    //       },
    //     },
    //   },
    // },
  }).restore(initialState || {});

  /**
   * Cache uses localStorage to save data.
   *
   * This cache is used by Apollo (graphql client).
   */
  if (typeof window !== "undefined") {
    persistCache({
      cache,
      storage: window.localStorage,
    });
  }

  return cache;
};

export default initCache;
