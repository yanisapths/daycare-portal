import { getSession, useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import LinkGridCard from "../../components/LinkGridCard";
import AmountCard from "../../components/AmountCard";

function Dashboard({ data }) {
  const { data: session, status } = useSession();
  const [requestData, setRequestData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchRequest = async () => {
      const res = await fetch(
        `${process.env.dev}/appointment/match/owner/${session.user.id}/pending`
      );

      const approve = await fetch(
        `${process.env.dev}/appointment/match/owner/${session.user.id}/approved`
      );
      const requestData = await res.json();
      const appointmentData = await approve.json();

      if (isSubscribed) {
        setRequestData(requestData);
        setAppointmentData(appointmentData);
      }
    };

    fetchRequest().catch(console.error);

    return () => (isSubscribed = false);
  },);

  return (
    <>
      <AmountCard requests={requestData} appointments={appointmentData} />
      <LinkGridCard data={data} />

      {/* Clinic Hours */}
      <div className="px-4 pt-24 sm:px-6 lg:col-span-3 lg:px-8">
        <div>
          <span className="caption tracking-wide text-gray-500 uppercase">
            เบอร์ติดต่อคลินิก
          </span>

          <p className="block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl">
            {data.phoneNumber}
          </p>
        </div>

        <ul className="mt-8 space-y-1 text-gray-700">
          <span className="caption tracking-wide text-gray-500 uppercase">
            วันและเวลาทำการ
          </span>
          <li className="h5">
            {data.openDay}: {data.openTime} am - {data.closeTime} pm
          </li>
        </ul>
      </div>
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
