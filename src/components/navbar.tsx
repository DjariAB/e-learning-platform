import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const NavBar = async () => {
  return (
    <nav className="flex items-center justify-between px-14 ">
      <Image
        src="/SVGs/skillmaxxing-brain-logo.jpg"
        width={58}
        height={48}
        alt=""
      />
      <div className="flex grow flex-row-reverse items-center pr-48 ">
        <Link
          href=""
          className={buttonVariants({
            variant: "link",
            size: "default",
          })}
        >
          Courses
        </Link>
        <Link
          href=""
          className={buttonVariants({
            variant: "link",
            size: "default",
          })}
        >
          Pricing
        </Link>
        <Link
          href=""
          className={buttonVariants({
            variant: "link",
            size: "default",
          })}
        >
          Contact us
        </Link>
      </div>
      <div className=" flex items-center gap-3">
        <Link
          href="login"
          className={buttonVariants({
            variant: "outlinehover",
            size: "default",
          })}
        >
          {" "}
          Login
        </Link>
        <Link
          href="signin"
          className={buttonVariants({ variant: "hover", size: "default" })}
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
