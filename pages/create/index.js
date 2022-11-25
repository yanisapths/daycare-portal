import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSession, getSession } from "next-auth/react";
import FooterSocial from "../../components/FooterSocial";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../../lib/firebase";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";

function Create() {
  const { data: session, status } = useSession();
  const {
    watch,
    formState: { isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      name: event.target.daycareName.value,
      address: event.target.address.value,
      phoneNumber: event.target.phoneNumber.value,
      owner: event.target.owner.value,
      email: event.target.email.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(
      `https://tvda8762ih.execute-api.ap-northeast-1.amazonaws.com/prod/daycare`,
      options
    );

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    alert(`Is this your full name: ${result.data}`);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  console.log(
    watch(["daycareName", "address", "phoneNumber", "owner", "email"])
  );

  return (
    <div>
      <Head>
        <title>Olive | Create </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Header />
      <main className="main bg-teal-50 md:h-full overflow-hidden">
        <div className="flex-grow pt-10  md:pt-30 mt-5   px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-white rounded-md ">
          <section className="pt-6">
            <div className="max-w-lg mx-auto text-center pb-8 ">
              <h1 className="font-bold  text-3xl text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
                Create Daycare Center
              </h1>
            </div>
          </section>
          <form
            className="max-w-md mx-auto mt-8 mb-0 space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="inputLabel" htmlFor="daycareName">
                Daycare Name
              </label>
              <input
                className="inputBox"
                type="text"
                id="daycareName"
                name="daycareName"
                required
              />
            </div>
            <div>
              <label className="inputLabel" htmlFor="address">
                Address
              </label>
              <input
                className="inputBox"
                type="text"
                id="address"
                name="address"
                required
              />
            </div>
            <div>
              <label className="inputLabel" htmlFor="owner">
                Owner Name
              </label>
              <input
                className="inputBox"
                type="text"
                id="owner"
                name="owner"
                required
              />
            </div>
            <div>
              <label className="inputLabel" htmlFor="phoneNumber">
                phone number
              </label>
              <input
                className="inputBox"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                required
              />
            </div>
            <div>
              <label className="inputLabel" htmlFor="email">
                Email
              </label>
              <input
                className="inputBox"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>

            <div className="relative text-center">
              <button
                type="submit"
                className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                disabled={!isValid}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Create;
