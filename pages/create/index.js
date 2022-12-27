import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  ListItemText,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import toast from "react-hot-toast";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const useStyles = makeStyles({
  TextField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FEFCE8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FEFCE8",
      },
    },
  },
});

function Create() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [daycareImageProfile, setDaycareImageProfile] = useState("");
  const [setOwnerImageUrl] = useState("");
  const [setBusinessLicense] = useState("");
  const [setProfessionalLicense] = useState("");
  const [input, setInput] = useState({});
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

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
    value,
    watch,
    control,
    getValues,
    setValue,
    formState: { isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      clinic_name: "",
      address: "",
      phoneNumber: "",
      owner: session.user.name,
      email: "",
      price: "",
      description: "",
      openDay: [],
    },
  });
  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      clinic_name: event.target.clinic_name.value,
      address: event.target.address.value,
      phoneNumber: event.target.phoneNumber.value,
      owner: session.user.name,
      email: event.target.email.value,
      imageUrl: event.target.imageUrl.files,
      price: event.target.price.value,
      description: event.target.description.value,
      openDay: event.target.openDay.value,
      openTime: event.target.openTime.value,
      closeTime: event.target.closeTime.value,
      ownerImageUrl: event.target.ownerImageUrl.files,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      businessLicense: event.target.businessLicense.files,
      professionalLicense: event.target.professionalLicense.files,
      ownerContact: event.target.ownerContact.value,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let imgBase64 = "";
    await getBase64(data.imageUrl[0], async (result) => {
      data.imageUrl = result;

      const response = await axios
        .post(
          `https://olive-service-api.vercel.app/clinic/create`,
          data,
          axiosConfig
        )
        .then(async (res) => {
          console.log("RESPONSE RECEIVED: ", res.data);
          const { owner } = res.data.owner;
          const { cid } = res.data._id;

          localStorage.setItem("cid", res.data._id);
          localStorage.getItem("cid", cid);

          localStorage.setItem("owner", res.data.owner);
          localStorage.getItem("owner", owner);
          toast.success("กำลังสร้างคลิกนิก...🛠️🚧");
          router.push(
            {
              pathname: "/",
              query: {
                cid: localStorage.getItem("cid", cid),
                owner: localStorage.getItem("owner", owner),
              },
            },
              "/"
            );
          })
          .catch((err) => {
            console.log("AXIOS ERROR: ", err);
          });
       });
      
   
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  async function getBase64(file,cb) {
    let reader = new FileReader();
    if(file){
      try{
        await reader.readAsDataURL(file);
        reader.onload = function () {
          cb(reader.result);
        };
      }catch(err){
        console.log(err);
      }
    }else {
      toast.error("กรุณาใส่รูปภาพคลินิก");
    }
  }

  console.log(
    watch([
      "clinic_name",
      "address",
      "phoneNumber",
      "owner",
      "email",
      "openDay",
      "openTime",
      "closeTime",
    ])
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
            <div className="text-start max-w-2xl pb-3 ">
              <p className="h2 text-[#6C5137] ">สร้างคลีนิค</p>
            </div>
          </section>
          <div className="pb-4">
            <p className="h4">ข้อมูลคลินิก</p>
          </div>
          <form
            className="mt-0 grid grid-cols-2 gap-2 md:grid md:grid-cols-6 md:gap-2"
            onSubmit={handleSubmit}
          >
            <div className="md:col-span-3  col-span-2">
              <label className="inputLabel" htmlFor="clinic_name">
                ชื่อคลินิก
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
            <div className="md:col-span-4">
              <label className="inputLabel" htmlFor="address">
                ที่อยู่
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
            <div className="md:col-span-2 sm:col-span-3">
              <label className="inputLabel" htmlFor="phoneNumber">
                เบอร์โทรติดต่อของคลินิก
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
            <div className="md:col-span-2 sm:col-span-3">
              <label className="inputLabel" htmlFor="email">
                อีเมล์
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
            <div className="md:col-span-2 sm:col-span-3">
              <label className="inputLabel" htmlFor="price">
                ราคาเริ่มต้น (฿/ชั่วโมง)
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
            <div className="md:col-span-2 sm:col-span-6">
              <label
                className="inputLabel"
                htmlFor="imageUrl"
                onChange={uploadToClient}
              >
                อัพโหลดรูปคลินิก
              </label>
              <input
                className="inputBox border-0 pb-10 "
                type="file"
                id="imageUrl"
                name="imageUrl"
                {...register("imageUrl", {
                  required: "Required",
                })}
              />
            </div>
            <Grid item xs={6} md={8}>
              <FormControl
                sx={{ width: "100%", backgroundColor: "white" }}
                variant="outlined"
                required
              >
                <InputLabel id="openDay-label">วันเปิดของคลินิก</InputLabel>
                <Controller
                  name="openDay"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        input={<OutlinedInput label="วันเปิดของคลินิก" />}
                        MenuProps={MenuProps}
                        renderValue={(selected) => selected.join(", ")}
                        multiple
                      >
                        {days.map((input) => (
                          <MenuItem key={input} value={input}>
                            <ListItemText primary={input} />
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6} md={8}>
              <FormControl sx={{ width: "100%" }} variant="outlined" required>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  variant="outlined"
                  id="openTime"
                  label="เวลาเปิดคลินิก"
                  type="time"
                  onChange={handleTimeChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("openTime")}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={8}>
              <FormControl sx={{ width: "100%" }} variant="outlined" required>
                <TextField
                  sx={{ backgroundColor: "white" }}
                  variant="outlined"
                  id="closeTime"
                  label="เวลาปิดคลินิก"
                  type="time"
                  onChange={handleTimeChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("closeTime")}
                />
              </FormControl>
            </Grid>
            <div className="md:col-span-6 pt-8">
              <label className="inputLabel" htmlFor="description">
                ใส่คำอธิบายคร่าวๆเกี่ยวกับคลินิกของคุณ
                เพื่อให้ผู้คนได้รู้จักคุณดีขึ้น 😊
              </label>
              <input
                className="inputBox flex flex-wrap py-10"
                type="text"
                id="description"
                name="description"
                {...register("description", {
                  required: "Required",
                })}
              />
            </div>

            <div className="col-span-6">
              <p className="h4">ข้อมูลเจ้าของคลินิก</p>
            </div>
            <div className="md:col-span-3 col-span-2">
              <label className="inputLabel" htmlFor="firstName">
                First Name
              </label>
              <input
                className="inputBox"
                type="text"
                id="firstName"
                name="firstName"
                {...register("firstName", {
                  required: "Required",
                })}
              />
            </div>

            <div className="md:col-span-3 col-span-2">
              <label className="inputLabel" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="inputBox"
                type="text"
                id="lastName"
                name="lastName"
                {...register("lastName", {
                  required: "Required",
                })}
              />
            </div>

            <div className="md:col-span-2 sm:col-span-3">
              <label className="inputLabel" htmlFor="ownerContact">
                เบอร์ติดต่อเจ้าของ
              </label>
              <input
                className="inputBox"
                type="text"
                id="ownerContact"
                name="ownerContact"
                {...register("ownerContact", {
                  required: "Required",
                })}
              />
            </div>

            <div className="md:col-span-2 sm:col-span-6">
              <label
                className="inputLabel"
                htmlFor="ownerImageUrl"
                onChange={uploadToClient}
              >
                อัพโหลดรูปเจ้าของกิจการ
              </label>
              <input
                className="inputBox border-0 pb-10 "
                type="file"
                id="ownerImageUrl"
                name="ownerImageUrl"
                {...register("ownerImageUrl", {
                  required: "Required",
                })}
              />
            </div>

            <div className="md:col-span-2 sm:col-span-6">
              <label
                className="inputLabel"
                htmlFor="professionalLicense"
                onChange={uploadToClient}
              >
                อัพโหลดใบประกอบวิชาชีพ
              </label>
              <input
                className="inputBox border-0 pb-10 "
                type="file"
                id="professionalLicense"
                name="professionalLicense"
                {...register("professionalLicense", {
                  required: "Required",
                })}
              />
            </div>

            <div className="pt-2 md:col-start-3 md:col-span-2">
              <input
                type="submit"
                className="buttonPrimary px-20 lg:px-40 md:px-30 bg-[#AD8259] cursor-pointer font-bold text-lg"
              />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Create;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
