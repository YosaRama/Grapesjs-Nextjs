import "../styles/globals.css";

import { SWRConfig } from "swr";
import fetcher from "../config/swr";
import { BuilderContextProvider } from "../store/builderContext";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ refreshInterval: 3000, fetcher }}>
      <BuilderContextProvider>
        <Component {...pageProps} />
      </BuilderContextProvider>
    </SWRConfig>
  );
}

export default MyApp;
