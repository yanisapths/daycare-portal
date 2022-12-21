import React from 'react'
import Link from "next/link";
import AddHomeIcon from "@mui/icons-material/AddHome";

const NoClinic = () => {
  return (
    <>
     <section className="pt-28">
            <h2 className="text-5xl py-8 text-gray-400 ">
              You have no daycare
            </h2>
            <Link href="/create">
              <div className="cursor-pointer inline-flex items-center buttonPrimary">
                <span className="text-xl font-medium"> Add Daycare </span>
                <AddHomeIcon className="ml-3 h-8 w-8" />
              </div>
            </Link>
          </section>
    </>
  )
}

export default NoClinic;

