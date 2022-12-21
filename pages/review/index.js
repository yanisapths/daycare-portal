import React from "react";
import Header from "../../components/Header";
import Head from "next/head";

const index = () => {
  return (
    <div>
      <Head>
        <title>Daycare | Review </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
    </div>
  );
};

export default index;
