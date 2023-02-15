import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "@/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <div>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </div>
  );
}
