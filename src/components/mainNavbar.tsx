import Link from "next/link";
import { Input } from "./ui/input";
import Image from "next/image";
import { validateRequest } from "@/server/auth";
import UserButton from "./userButton";

const MainNavBar = async () => {
  const { user } = await validateRequest();
  if (user)
    return (
      <div className="w-full">
        <div className="flex items-center justify-center gap-4 bg-transparent px-5 py-2 text-white ">
          {" "}
          <Link href="/courses">
            <Image
              src="/SVGs/logo_text.svg"
              alt="text logo"
              className=" "
              width={170}
              height={43}
            />
          </Link>
          <div className="grow">
            <Input
              type="text"
              placeholder="  Search for a course"
              className=" rounded-full border border-solid border-gray-950"
            />
          </div>
          <Link href="/student_dashboard" className="w-20 text-black">
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
          {/* <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black">
            <p className="text-xl font-semibold text-white">
              {user.userName.charAt(0).toUpperCase()}
            </p>
          </div> */}
          <UserButton />
        </div>
      </div>
    );
};

export default MainNavBar;
