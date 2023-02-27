import { getSession, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LinkGridCard from "../../components/LinkGridCard";
import AmountCard from "../../components/AmountCard";
import VerifiedIcon from "@mui/icons-material/Verified";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

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

function Dashboard({ data }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [clinic, setData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);

  async function fetchClinic() {
    const url = `${process.env.dev}/clinic/owner/${session.user.id}`;
    if (session.user.id) {
      const res = await fetch(url);
      try {
        const clinic = await res.json();
        if (clinic) {
          setData(clinic);
        } else return;
      } catch (err) {
        console.log(err);
        return router.push("/noClinic");
      }
    } else {
    }
  }

  const fetchData = async () => {
    let isSubscribed = true;
    const res = await fetch(
      `${process.env.dev}/appointment/match/${clinic._id}/pending`
    );

    const approve = await fetch(
      `${process.env.dev}/appointment/match/${clinic._id}/approved`
    );
    const requestData = await res.json();
    const appointmentData = await approve.json();

    if (isSubscribed) {
      setRequestData(requestData);
      setAppointmentData(appointmentData);
    }
    return () => (isSubscribed = false);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin/");
    } else {
      fetchClinic();
    }
  }, [status]);

  useEffect(() => {
    if (clinic._id) {
      fetchData();
    }
  }, []);
  return (
    <>
      {/* Clinic Hours */}
      <div className="px-4 pt-8 flex-wrap">
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
        </p>
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
