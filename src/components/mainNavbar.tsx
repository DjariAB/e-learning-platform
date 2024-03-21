/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Input } from "./ui/input";

const MainNavBar = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-4 px-6">
        <img src="/SVGs/logo text.svg" alt="text logo" className="h-8" />
        <div className="flex grow gap-1 rounded-full border border-solid border-black px-2 py-1">
          <img
            src="/SVGs/search-icon.svg"
            alt=""
            className="h-8 rounded-full"
          />
          <input type="text" placeholder="Search for a course" />
        </div>
        <Link href="">my courses</Link>
        <Link href="">
          <img src="/SVGs/leaderBoard.svg" alt="" className="h-8 " />
        </Link>
        <div className="h-10 w-10 rounded-[100%] bg-black p-2 text-center">
          <p className="font-semibold text-white">B</p>
        </div>
      </div>
    </>
  );
};

export default MainNavBar;
