import Image from "next/image";
import logo from "public/SVGs/skillmaxxing-brain-logo.svg";
import { Button } from "./ui/button";
import { log } from "console";
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
      <div className="flex gap-7 text-lg ">
        {/* <a variant="link">Courses</Button>
        <Button variant="link">Pricing</Button>
        <Button variant="link">Contact us</Button> */}
        <Link href="">Courses</Link>
        <Link href="">Pricing</Link>
        <Link href="">Contact us</Link>
      </div>
      <div className="flex gap-2 ">
        <Button variant="outline">Login</Button>
        <Button variant="hover">Get Started</Button>
      </div>
    </nav>
  );
};

export default NavBar;
