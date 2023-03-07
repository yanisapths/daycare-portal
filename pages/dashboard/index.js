import { getSession, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LinkGridCard from "../../components/LinkGridCard";
import AmountCard from "../../components/AmountCard";
import VerifiedIcon from "@mui/icons-material/Verified";
import toast from "react-hot-toast";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import EditClinicForm from "../../components/OLForm/EditClinicForm";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[10],
    fontSize: 14,
    borderRadius: 12,
    p: 8,
  },
}));

function Dashboard({ data,clinicId }) {
  const { data: session, status } = useSession();
  const [requestData, setRequestData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    if (session && data) {
      let isSubscribed = true;
      const res = await fetch(
        `${process.env.dev}/appointment/match/${data._id}/pending`
      );

      const approve = await fetch(
        `${process.env.dev}/appointment/match/${data._id}/approved`
      );
      const requestData = await res.json();
      const appointmentData = await approve.json();

      if (isSubscribed) {
        setRequestData(requestData);
        setAppointmentData(appointmentData);
      }
      return () => (isSubscribed = false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      if (!data) {
        router.push("/noClinic");
      }
      fetchData();
    }
  }, [status]);

  function handleOpenEdit() {
    if (openEdit == true) {
      setOpenEdit(false);
    } else if (openEdit == false) {
      setOpenEdit(true);
    }
  }

  return (
    <>
      {openEdit == false && (
        <div className="px-4 pt-8 flex-wrap">
          <div className="flex justify-between">
            <p className="h2">
              {data.clinic_name}
              {data.approvalStatus == "Authorized" ? (
                <span className="px-2">
                  <CustomTooltip title="Verified Clinic" placement="top">
                    <VerifiedIcon className="text-[#ECE656]" fontSize="large" />
                  </CustomTooltip>
                </span>
              ) : (
                ""
              )}
            </p>{" "}
            <button
              onClick={() => handleOpenEdit()}
              className="rounded-full border-2 text-gray-100 shadow-lg hover:bg-[#E0B186] hover:border-[#E0B186]/5 border-[#AD8259] hover:shadow-[#AD8259]/50 bg-[#AD8259] w-fit h-fit p-1 cursor-pointer"
            >
              <CustomTooltip title="แก้ไขข้อมูล" placement="top">
                <DriveFileRenameOutlineIcon className="cursor-pointer" />
              </CustomTooltip>
            </button>{" "}
          </div>
          <p className="mt-2 text-xl font-bold text-black/75">{data.address}</p>
          <p className="mt-4 text-lg text-black/75 sm:truncate ">
            {data.description}
          </p>

          <div className="py-4">
            <span className="caption tracking-wide text-gray-500 uppercase">
              เบอร์ติดต่อคลินิก
            </span>

            <p className="block text-xl font-medium text-gray-900 hover:opacity-75 sm:text-sm">
              {data.phoneNumber}
            </p>
          </div>

          <ul className="space-y-1 text-gray-700">
            <span className="caption tracking-wide text-gray-500 uppercase">
              วันและเวลาทำการ
            </span>
            <li className="text-lg flex flex-wrap sm:text-[14px] text-gray-900 ">
              {data.openDay}
              {": "}
              {data.openTime} - {data.closeTime}
            </li>
          </ul>
        </div>
      )}
      {openEdit == true && (
        <EditClinicForm data={data} handleOpenEdit={handleOpenEdit} setOpenEdit={setOpenEdit} clinicId={clinicId} />
      )}
      <AmountCard requests={requestData} appointments={appointmentData} />
      <LinkGridCard data={data} />
    </>
  );
}

export default Dashboard;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
