import React from "react";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Router, { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import ProgressBar from "@badrap/bar-of-progress";
import signIn from "./auth/signin";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Head from "next/head";

const progress = new ProgressBar({
  size: 5,
  color: "#ECE656",
  className: "z-50",
  delay: 100,
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
            @import
            url('https://fonts.googleapis.com/css2?family=Mitr&display=swap');
            @import
            url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
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
