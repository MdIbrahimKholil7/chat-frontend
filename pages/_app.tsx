import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "../components/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CookiesProvider>
        <Provider store={store}>
         
            <Component {...pageProps} />
         
        </Provider>
      </CookiesProvider>
    </>
  );
}
