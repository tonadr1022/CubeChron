import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp;
