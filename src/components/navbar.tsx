import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between px-14">
      <div>
        <Image
          width="58"
          height="48"
          src="/SVGs/skillmaxxing-brain-logo.svg"
          alt="logo"
        />
      </div>
      <div className="flex grow  items-end gap-7  pl-96  text-lg">
        <Link className={buttonVariants({ variant: "link" })} href="">
          Courses
        </Link>
        <Link className={buttonVariants({ variant: "link" })} href="">
          Pricing
        </Link>
        <Link className={buttonVariants({ variant: "link" })} href="">
          Contact us
        </Link>
      </div>
      <div className="flex gap-3  ">
        <Button variant="outline" className="font-semibold">
          Login
        </Button>
        <Button variant="hover" className="font-semibold">
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
