import "../styles/globals.css";

import { SWRConfig } from "swr";
import fetcher from "../config/swr";
import { BuilderContextProvider } from "../store/builderContext";
import { MediaContextProvider } from "../store/mediaContext";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ refreshInterval: 0, fetcher }}>
      <BuilderContextProvider>
        <MediaContextProvider>
          <Component {...pageProps} />
        </MediaContextProvider>
      </BuilderContextProvider>
    </SWRConfig>
  );
}

export default MyApp;
