import { getSession, useSession } from "next-auth/react";
import React from "react";

function Dashboard({ data }) {
  return (
    <>
      <section className="pt-28">
        <div>
          <h2 className="text-5xl py-8 text-gray-400 ">{data.clinic_name}</h2>
        </div>
      </section>
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
