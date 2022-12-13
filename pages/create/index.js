import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

function Create() {
  const { data: session, status } = useSession();
  const [daycareImageProfile, setDaycareImageProfile] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState("");

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setDaycareImageProfile(i);
      var reader = new FileReader();
      reader.onload = imageIsLoaded;
      reader.readAsDataURL(i);
    }
  };

  function imageIsLoaded(e) {
    $("div.withBckImage").css({
      "background-image": "url(" + e.target.result + ")",
    });
  }

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
      imageUrl: event.target.imageUrl.files,
      price: event.target.price.value,
      description: event.target.description.value,
    };

    let imgBase64 = "";
    await getBase64(data.imageUrl[0], async (result) => {
      console.log(result);
      data.imageUrl = result;
      const JSONdata = JSON.stringify(data);

      const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Body of the request is the JSON data we created above.
        body: JSONdata,
      };
      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(
        `https://jnbxcl9cr3.execute-api.ap-northeast-1.amazonaws.com/dev/daycare/create`,
        options
      ).then(
        toast.promise(
          response,
           {
             loading: 'Creating...',
             success: <b>Daycare is created! Please wait for approval.</b>,
             error: <b>Could not create.</b>,
           }
         )
      )
    });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  async function getBase64(file, cb) {
    let reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  console.log(
    watch(["daycareName", "address", "phoneNumber", "owner", "email"])
  );

  return (
    <div>
      <Head>
        <title>Daycare | Create </title>
        <link rel="icon" href="favicon.ico" />
      </Head>
        <Header/>
      <main className="main bg-yellow-50 md:h-full overflow-hidden ">
        <div className="flex-grow pt-10  md:pt-30 mt-5 px-4 py-16 mx-auto sm:px-6 lg:px-8 bg-white rounded-md ">
          <section className="pt-6">
            <div className="max-w-xl pb-8 mx-24">
              <h1 className="font-bold text-3xl text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-yellow-300 via-rose-400 to-amber-400">
                Create Daycare Center
              </h1>
            </div>
          </section>
          <form className="mt-8 mx-24 grid grid-cols-2 gap-2 md:grid md:grid-cols-6 md:gap-8" onSubmit={handleSubmit}>
            <div className="md:col-span-2 col-span-3">
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
            <div className="md:col-span-2 col-span-3">
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
            <div className="md:col-span-4">
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
            <div className="md:col-span-2 sm:col-span-3">
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
            <div className="md:col-span-2 sm:col-span-3 ">
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
            <div className="md:col-span-2 sm:col-span-3">
              <label className="inputLabel" htmlFor="price">
                Base Price
              </label>
              <input
                className="inputBox"
                type="text"
                id="price"
                name="price"
                required
              />
            </div>
            <div className="md:col-span-2 sm:col-span-6">
              <label
                className="inputLabel"
                htmlFor="imageUrl"
                onChange={uploadToClient}
              >
                Upload Your Daycare Image
              </label>
              <input
                className="inputBox py-2"
                type="file"
                id="imageUrl"
                name="imageUrl"
                required
              />
            </div>
            <div className="md:col-span-5">
              <label className="inputLabel" htmlFor="description">
                Describe your daycare
              </label>
              <input
                className="inputBox flex flex-wrap py-10"
                type="text"
                id="description"
                name="description"
                required
              />
            </div>

            <div className="absolute items-center text-center pt-[60vh]">
              <div
                type="submit"
                className="buttonPrimary bg-[#AD8259] cursor-pointer font-bold text-lg"
                disabled={!isValid}
              >
                Create
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Create;
