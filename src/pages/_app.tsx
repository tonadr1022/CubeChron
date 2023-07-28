import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo-client";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const client = useApollo(pageProps);
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
