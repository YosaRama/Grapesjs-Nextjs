import "../styles/globals.css";

import { SWRConfig } from "swr";
import fetcher from "../config/swr";
import { BuilderContextProvider } from "../store/builderContext";
import { useRouter } from "next/router";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <SWRConfig value={{ refreshInterval: 3000, fetcher }}>
      <BuilderContextProvider>
        <Component {...pageProps} />
      </BuilderContextProvider>
    </SWRConfig>
  );
}

export default MyApp;
