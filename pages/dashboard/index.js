import { getSession, useSession } from "next-auth/react";
import React from "react";
import LinkGridCard from "../../components/LinkGridCard";

function Dashboard({ data }) {
  console.log(data);
  return (
    <>
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
