import React from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Router, { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import ProgressBar from "@badrap/bar-of-progress";
import signIn from "./auth/signin";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Head from "next/head";

const progress = new ProgressBar({
  size: 5,
  color: "#ECE656",
  className: "z-50",
  delay: 0.5,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Head>
          <style>
          @import url(&#39;https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai&display=swap&#39;);
          </style>
        </Head>
        <RecoilRoot>
          <Toaster />
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
