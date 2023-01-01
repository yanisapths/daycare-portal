import React from 'react'
import Header from "../../components/Header";
import Head from "next/head";
import { useTheme } from '@mui/material/styles';

function Course() {
const theme = useTheme();

  return (
    <div>
    <Head>
      <title>Clinic | Course </title>
      <link rel="icon" href="favicon.ico" />
    </Head>
    <Header />
  </div>
  )
}

export default Course