import React from "react";
import Head from "next/head";
import {
  HomeIcon,
  PlusCircleIcon,
  UserGroupIcon,
  CalendarIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

function Footer() {
  return (
    <footer className="fixed font-noto bottom-0 inset-x-0  text-sm md:text-lg bg-white text-teal-500 flex justify-between  font-extrabold shadow-teal-400 shadow-2xl md:rounded-t-full rounded-t-2xl">
      <Link href="/" className="b">
        <b>
          <HomeIcon className="footer-icon" />
          หน้าหลัก
        </b>
      </Link>
      <Link href="/request/" className="b">
        <b>
          <PlusCircleIcon className="footer-icon" />
          นัด
        </b>
      </Link>
      <Link href="/family/" className="b">
        <b>
          <UserGroupIcon className="footer-icon" />
          ครอบครัว
        </b>
      </Link>
      <Link href="/calendar/" className="b">
        <b>
          <CalendarIcon className="footer-icon" />
          ตารางนัด
        </b>
      </Link>
    </footer>
  );
}

export default Footer;
