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
  
    if (status === "loading") {
      return <p>Loading...</p>;
    }
  
    async function getBase64(file, cb) {
      let reader = new FileReader();
      await reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
    }
  
    console.log(
      watch(["clinic_name", "address", "phoneNumber", "owner", "email"])
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
                  Create Clinic Center
                </h1>
              </div>
            </section>
            <form
              className="max-w-md mx-auto mt-8 mb-0 space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="inputLabel" htmlFor="clinic_name">
                  Clinic Name
                </label>
                <input
                  className="inputBox"
                  type="text"
                  id="clinic_name"
                  name="clinic_name"
                  onChange={handleInputChange}
                  {...register("clinic_name", {
                    required: "Required",
                  })}
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
                  {...register("address", {
                    required: "Required",
                  })}
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
                  {...register("owner", {
                    required: "Required",
                  })}
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
                  {...register("phoneNumber", {
                    required: "Required",
                  })}
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
                  {...register("email", {
                    required: "Required",
                  })}
                />
              </div>
              <div>
                <label className="inputLabel" htmlFor="price">
                  Base Price (฿/hour)
                </label>
                <input
                  className="inputBox"
                  type="text"
                  id="price"
                  name="price"
                  {...register("price", {
                    required: "Required",
                  })}
                />
              </div>
              <div>
                <label className="inputLabel" htmlFor="imageUrl" onChange={uploadToClient}>
                  Upload Your Daycare Image
                </label>
                <input
                  className="inputBox"
                  type="file"
                  id="imageUrl"
                  name="imageUrl"
                  {...register("imageUrl", {
                    required: "Required",
                  })}   
                />
              </div>
              <div>
                <label className="inputLabel" htmlFor="description">
                Describe your daycare
                </label>
                <input
                  className="inputBox"
                  type="text"
                  id="description"
                  name="description"
                  {...register("description", {
                    required: "Required",
                  })}  
                />
              </div>
  
              <div className="relative text-center">
              <input type="submit"   className="buttonPrimary bg-[#AD8259] cursor-pointer font-bold text-lg"/>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
}

 export default Create;
