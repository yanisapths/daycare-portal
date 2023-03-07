import React, { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import Image from "next/image";
import toast from "react-hot-toast";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

function Profile({ clinicData }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState();

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setSelectedAvatar(i);
      setPreview(URL.createObjectURL(event.target.files[0]));
      var reader = new FileReader();
      reader.readAsDataURL(i);
    }
  };
  async function saveProfile() {
    await getBase64(selectedAvatar, async (result) => {
      const option = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerImageUrl: result }),
      };
      const res = await fetch(
        `${process.env.dev}/clinic/profile/${clinicData._id}`,
        option
      )
        .then(async (res) => {
          toast.success("บันทึกเรียบร้อย");
        })
        .catch((err) => {
          console.log("ERROR: ", err);
          toast.error("ไม่สำเร็จ");
        });
    });
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      if (!clinicData) {
        router.push("/noClinic");
      }
    }
  }, [status]);
  async function getBase64(file, cb) {
    let reader = new FileReader();
    if (file) {
      try {
        await reader.readAsDataURL(file);
        reader.onload = function () {
          cb(reader.result);
        };
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (clinicData) {
    return (
      <div>
        <Head>
          <title>Olive | Physiotherapy Clinic </title>
          <link rel="icon" href="favicon.ico" />
        </Head>
        <Header />
        <main className="main bg-gradient-to-r from-[#FBB7C7]/10 via-[#FFFFCA]/20 to-[#ffe898]/30">
          <div className="pageTitle">บัญชีของฉัน</div>
          <div className="flex pt-4 items-center justify-center">
            <div className="shadow-xl rounded-2xl max-w-screen-lg sm:px-24 px-32 pt-6 pb-20 bg-white">
              <p className="h6 pb-2">รูปเจ้าของคลินิก</p>
              {session && (
                <div className="">
                  <div className="relative">
                    {!preview && !clinicData.ownerImageUrl && (
                      <Image
                        alt="/userLoginImage.png"
                        className="rounded-full"
                        src={session.user.image}
                        width={140}
                        height={140}
                      />
                    )}
                    {preview && (
                      <Image
                        alt="/Avatar.png"
                        className="rounded-full"
                        src={preview}
                        width={140}
                        height={140}
                      />
                    )}
                    {clinicData.ownerImageUrl && !preview && (
                      <Image
                        alt="/userLoginImage.png"
                        className="rounded-full"
                        src={clinicData.ownerImageUrl}
                        width={140}
                        height={140}
                      />
                    )}

                    <div className="rounded-full border-2 text-gray-100 shadow-lg hover:bg-[#E0B186] hover:border-[#E0B186]/5 border-[#AD8259] hover:shadow-[#AD8259]/50 bg-[#AD8259] w-fit h-fit p-1 absolute bottom-0 right-0 cursor-pointer">
                      <input
                        onChange={uploadToClient}
                        type="file"
                        className="cursor-pointer absolute w-full h-full opacity-0"
                      />
                      <DriveFileRenameOutlineIcon className="cursor-pointer" />
                    </div>
                  </div>

                  <div className="text-start px-4 pt-6">
                    <p className="h6">
                      <span className="caption tracking-wide">ชื่อ: </span>
                      {session.user.name}
                    </p>

                    {session.user.email ? (
                      <p className="h5">
                        <span className="caption tracking-wide">email: </span>
                        {session.user.email}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              )}
              <div className="flex justify-center">
                <div className="relative h-10 w-32">
                  <div className="absolute bottom-0 inset-x-0 h-2">
                    <button
                      className="bg-[#AD8259] border-[#AD8259] text-white cursor-pointer border-2 w-fit h-fit rounded-full px-10 p-4 py-1 hover:shadow-xl hover:shadow-[#AD8259]/60 hover:bg-[#E0B186] hover:border-[#E0B186]/5"
                      onClick={() => saveProfile()}
                    >
                      บันทึก
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default Profile;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const url = `${process.env.dev}/clinic/owner/${session.user.id}`;
    try {
      const res = await fetch(url);
      const clinicData = await res.json();
      if (!clinicData) {
        return router.push("/noClinic");
      }
      return { props: { clinicData } };
    } catch (error) {
      return {
        props: {
          error: true,
        },
      };
    }
  }
  return {
    props: {
      error: true,
    },
  };
}
