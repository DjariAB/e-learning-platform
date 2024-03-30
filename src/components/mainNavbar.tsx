/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Input } from "./ui/input";
import Image from "next/image";
import { validateRequest } from "@/server/auth";

const MainNavBar = async () => {
  const { user } = await validateRequest();
  if (user)
    return (
      <>
        <div className="flex items-center justify-center gap-4 px-5 py-1 ">
          <Link
            href="/"
            // className="flex gap-2"
          >
            <Image
              src="/SVGs/logo text.svg"
              alt="text logo"
              className=" "
              width={170}
              height={43}
            />
            {/* <p>Skillmaxxing</p> */}
          </Link>
          <div className="grow">
            <Input
              type="text"
              placeholder="  Search for a course"
              className=" rounded-full border border-solid border-gray-950 "
            />
          </div>
          {/* <div className="flex grow gap-1 rounded-full border border-solid border-black px-2 py-1">
          <img
            src="/SVGs/search-icon.svg"
            alt=""
            className="h-8 rounded-full"
          />
          <input type="text" placeholder="Search for a course" />
        </div> */}
          <Link href="" className="w-20 break-normal">
            my courses
          </Link>
          <Link href="">
            <Image
              src="/SVGs/leaderBoard.svg"
              height={0}
              width={32}
              alt=""
              className="h-8 "
            />
          </Link>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
            <p className="text-xl font-semibold text-white">
              {user.userName.toUpperCase().charAt(0)}
            </p>
          </div>
        </div>
      </>
    );
};

export default MainNavBar;
