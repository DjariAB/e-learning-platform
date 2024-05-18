"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

function MainNavBar({ userName }: { userName: string }) {
  const [Bg, setBg] = useState("bg-transparent backdrop-blur-xl");
  function handleScroll() {
    window.scrollY > 360
? setBg("bg-black")
      : setBg("bg-transparent backdrop-blur-xl");
  }
  window.addEventListener("scroll", handleScroll);
  return (
    <div
      className={cn(
        "fixed flex w-full items-center px-5 py-3 transition duration-300 ease-in ",
        Bg,
      )}
    >
      <Link href="/" className="grow">
        <Image
          src="/SVGs/logo-text-white.svg"
          alt="text logo"
          className=" "
          width={170}
          height={43}
        />
      </Link>

      <div className="flex items-center gap-9">
        <Link href="/student_dashboard" className="w-20 text-white">
          my courses
        </Link>
        <Link href="">
          <Image
            src="/SVGs/leaderBoardWhite.svg"
            height={0}
            width={32}
            alt=""
            className="h-8"
          />
        </Link>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mainblue">
          <p className="text-xl font-semibold text-white">
            {userName.charAt(0).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainNavBar;
