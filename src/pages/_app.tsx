import { useEffect, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true)
  }, [render])
  
  return (
    <div>
      <AuthContextProvider>
          <Component {...pageProps} />
          {render && <Toaster position="bottom-right" />}
      </AuthContextProvider>
    </div>
  );
}
