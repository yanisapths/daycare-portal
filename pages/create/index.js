import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";

function Create() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [daycareImageProfile, setDaycareImageProfile] = useState("");
    const [input, setInput] = useState({});
    
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  
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
      register,
      watch,
      formState: { isValid },
    } = useForm({
      mode: "onSubmit",
      reValidateMode: "onChange",
      defaultValues: {
        clinic_name: '',
        address: '',
        phoneNumber:'',
        owner:'',
        email: '',
        price: '',
        description: '',
      }     
    });
    // Handles the submit event on form submit.
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = {
        clinic_name: event.target.clinic_name.value,
        address: event.target.address.value,
        phoneNumber: event.target.phoneNumber.value,
        owner: event.target.owner.value,
        email: event.target.email.value,
        imageUrl: event.target.imageUrl.files,
        price: event.target.price.value,
        description: event.target.description.value,
      };

      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
      
      let imgBase64 = "";
      await getBase64(data.imageUrl[0], async (result) => {
        data.imageUrl = result;
    
        const response = await axios.post(
          `https://olive-service-api.vercel.app/clinic/create`,
          data,
          axiosConfig
        ).then((res) => {
          console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
      });
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
      <Header />

      <main className="main bg-white md:h-full overflow-hidden ">
        <div className="flex-grow  md:pt-0 pb-0  mt-5 mb-5  px-20 py-20  sm:px-6 lg:px-8 bg-yellow-50 rounded-md ">
          <section className="pt-6">
            <div className="text-center max-w-2xl pb-3 mx-24">
              <h1 className="font-bold font-noto text-2xl text-[#6C5137] ">
                สร้างคลีนิค
              </h1>
            </div>
          </section>
          <form
            className="mt-0 grid grid-cols-2 gap-2 md:grid md:grid-cols-6 md:gap-2"
            onSubmit={handleSubmit}
          >
            <div className="md:col-span-3  col-span-2">
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
            <div className="md:col-span-3 col-span-2">
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
                className="inputBox border-0 pb-10 "
                type="file"
                id="imageUrl"
                name="imageUrl"
                required
              />
            </div>
            <div className="md:col-span-6">
              <label className="inputLabel" htmlFor="description">
                Describe your daycare
              </label>
              <input
                className="inputBox flex flex-wrap py-20 "
                type="text"
                id="description"
                name="description"
                required
              />
            </div>

            <div className="md:col-start-3 md:col-span-2 items-center text-center ">
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
