import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between px-14 ">
      <div>
        <Image
          width="58"
          height="48"
          src="/SVGs/skillmaxxing-brain-logo.svg"
          alt="logo"
        />
      </div>
      <div className="flex grow  items-end  justify-end pr-56  text-lg">
        <Link
          className={buttonVariants({ variant: "link", size: "lg" })}
          href=""
        >
          Courses
        </Link>
        <Link
          className={buttonVariants({ variant: "link", size: "lg" })}
          href=""
        >
          Pricing
        </Link>
        <Link
          className={buttonVariants({ variant: "link", size: "lg" })}
          href=""
        >
          Contact us
        </Link>
      </div>
      <div className="flex gap-3  ">
        <Link href="/signin">
          <Button
            variant="outlinehover"
            className="text-lg font-semibold hover:-translate-y-1"
          >
            Login
          </Button>
        </Link>
        <Link href="/login">
          <Button
            variant="hover"
            className="text-lg font-semibold hover:-translate-y-1 "
          >
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
