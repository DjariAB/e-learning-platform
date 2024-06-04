"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import UserButton from "./userButton";

function MainNavBar({ userName }: { userName: string }) {
  return (
    <div
      className={cn(
        " flex w-full items-center px-5 py-3 transition duration-300 ease-in ",
        "",
      )}
    >
      <Link href="/" className="grow">
        <Image
          src="/SVGs/logo_text.svg"
          alt="text logo"
          className=" "
          width={170}
          height={43}
        />
      </Link>

      <div className="flex items-center gap-9">
        <Link href="/student_dashboard" className="w-30 text-lg ">
          My Courses
        </Link>
        <Link href="">
          <Image
            src="/SVGs/leaderBoard.svg"
            height={0}
            width={32}
            alt=""
            className="h-8"
          />
        </Link>
        <UserButton />
        {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mainblue">
          <p className="text-xl font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default MainNavBar;
