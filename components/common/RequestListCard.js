import React,{useState,useEffect} from 'react'
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import BtnCancel from "../BtnCancel";
import BtnAccept from "../BtnAccept";
import FormModal from "../../pages/request/FormModal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function RequestListCard({request}) {
  const [course,setCourse] = useState({});
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const fetchData = async () => {
    let isSubscribed = true;
    const courseData = await fetch(
      `${process.env.dev}/course/${request.course_id}`
    );
   
    const course = await courseData.json();
    if (isSubscribed) {
      setCourse(course);
      console.log(course)
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchData().catch(console.error);
    }
  }, [status]);

  async function acceptRequest(appointmentId) {
    const option = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Approved" }),
    };
    const res = await fetch(
      `${process.env.dev}/appointment/accept/${appointmentId}`,
      option
    )
      .then(async (res) => {
        Router.reload();
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error("ไม่สำเร็จ");
      });
  }

  return (
    <>
    {request.status == "pending" ? (
      <div
        key={request._id}
        className="overflow-hidden rounded-2xl shadow-lg transition hover:shadow-2xl mx-3 bg-white my-3 "
      >
        <div className="flex flex-row gap-3 justify-start content-center text-sm  mx-4 ">
          <div className="basis-1/5 mt-5 rounded-full self-start md:basis-16 lg:basis-16">
            <Image
              className="rounded-full "
              src="/user1.jpg"
              alt="User1 Request list"
              width="55"
              height="55"
              layout="fixed"
            />
          </div>
          <div className=" basis-9/12">
            <div className="grid grid-col-6">
              <div className="col-start-1 col-end-7">
                <span className="font-bold text-base text-[#6C5137]">
                  {request.firstName} {request.lastName}
                </span>
              </div>
              <div className="col-start-1 col-end-7">
                <span className="font-semibold">ชื่อเล่น:</span>
                <span className="font-bold text-base text-[#6C5137]">
                  {request.nickname}
                </span>
              </div>
              <div className="col-start-1 col-span-3">
                <span className="font-semibold">เบอร์โทรศัพท์:</span>
                <span> {request.phoneNumber} </span>
              </div>
              <div className="col-start-4 col-span-4">
                <span className="font-semibold">คอร์ส:</span>
                <span>{" "}{course.courseName}</span>
              </div>
              <div className="col-start-1 col-span-3">
                <span className="font-semibold">สถานที่ดูแล:</span>
                <span> {request.appointmentPlace}</span>
              </div>

              <div className="col-start-1 col-span-3">
                <span className="font-semibold ">วันนัดหมาย</span>
                <span className=" text-[#8E6947]">
                  {" "}
                  {new Date(
                    request.appointmentDate
                  ).toDateString()}{" "}
                </span>
              </div>
              <div className="col-start-1 col-span-3 flex">
                <span className="font-semibold ">เวลานัดหมาย</span>
                <span className=" text-[#8E6947] whitespace-nowrap px-2">
                  {request.endTime ? (
                    <p>
                      {new Date(
                        request.appointmentTime
                      ).toLocaleTimeString("en-EN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      {"-"}
                      {new Date(request.endTime).toLocaleTimeString(
                        "en-EN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </p>
                  ) : (
                    <p>
                      {new Date(
                        request.appointmentTime
                      ).toLocaleTimeString("en-EN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap basis-1/5  gap-2 justify-end content-center mx-5 sm:justify-center sm:my-3  pb-5 px-5 ">
          <div>
            <BtnAccept
              text="ยอมรับ"
              onClick={() =>
                Swal.fire({
                  title: "รับคำขอนี้?",
                  text: "รับคำขอแล้วเพิ่มลงในนัดหมาย",
                  icon: "success",
                  showCancelButton: true,
                  confirmButtonText: "ยอบรับ",
                  cancelButtonText: "ยกเลิก",
                  reverseButtons: true,
                }).then((result) => {
                  if (result.isConfirmed) {
                    acceptRequest(request._id,request.status).then(() =>
                      Swal.fire({
                        title: "รับคำขอแล้ว",
                        showConfirmButton: false,
                        icon: "success",
                        timer: 1000,
                      })
                    );
                  } else if (
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    Swal.fire({
                      title: "ยกเลิก",
                      showConfirmButton: false,
                      icon: "error",
                      timer: 1000,
                    });
                  }
                })
              }
            />
          </div>
          <div>
            <BtnCancel text="ปฏิเสธ" onClick={handleClickOpen} />
          </div>
          <FormModal
            open={open}
            handleClose={handleClose}
            request={request}
          />
        </div>
      </div>
    ) : (
      <></>
    )}
  </>
  )
}

export default RequestListCard