import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { validateRequest } from "@/server/auth";
import { logoutAction } from "@/actions/auth";

const NavBar = async () => {
  const { user } = await validateRequest();

  console.log(user);
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
        {/* TODO: change this code to be just a link this is a bad thing to do*/}

        {!user ? (
          <>
            <Link href="/login">
              <Button
                variant="outlinehover"
                className="text-lg font-semibold hover:-translate-y-1"
              >
                Login
              </Button>

              {/* TODO: change this code to be just a link this is a bad thing to do*/}
            </Link>
            <Link href="/signin">
              <Button
                variant="hover"
                className="text-lg font-semibold hover:-translate-y-1 "
              >
                Get Started
              </Button>
            </Link>
          </>
        ) : (
          <form action={logoutAction}>
            <Button type="submit">logout</Button>
          </form>
        )}
      </div>
      <img src="/SVGs/logo text.jpg" alt="" />
    </nav>
  );
};
export default NavBar;
