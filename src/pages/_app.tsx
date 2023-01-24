import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fira_Sans } from "@next/font/google";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${firaSans.className} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
