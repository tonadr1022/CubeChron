import { persistCache } from "apollo3-cache-persist";
import { InMemoryCache } from "@apollo/client";

const initCache = (initialState?: any) => {
  const cache = new InMemoryCache().restore(initialState || {});

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
