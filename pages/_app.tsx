import { ReactNode, useMemo } from "react";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import Page from "../layout/page";
import { AppContextProvider } from "../contexts/app-context";
import { ToastContainer } from "react-toastify";
import { create } from "apisauce";
import { getIdToken } from "../services/magic-service";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { CookiesProvider } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";
import "normalize.css";
import "../styles/global.scss";
import Home from ".";

import "react-toastify/dist/ReactToastify.css";
import "normalize.css";
import "../styles/global.scss";
import "@solana/wallet-adapter-react-ui/styles.css";
import "react-coinbase-commerce/dist/coinbase-commerce-button.css";

export const api = create({
  baseURL: process.env.MFC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.addAsyncRequestTransform(async (req) => {
  const idToken = await getIdToken();
  req.headers["Authorization"] = `Bearer ${idToken}`;
});

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const network =
    process.env.NODE_ENV === "development"
      ? WalletAdapterNetwork.Devnet
      : WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  const getLayout =
    Component.getLayout || ((page: ReactNode) => <Page>{page}</Page>);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AppContextProvider>
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              theme="dark"
              rtl={false}
            />
            <CookiesProvider>
              {getLayout(<Component {...pageProps} />)}
            </CookiesProvider>
          </AppContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default MyApp;
