import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { validateRequest } from "@/server/auth";
import { logoutAction } from "@/actions/auth";

const NavBar = async () => {
  const { user } = await validateRequest();

  return (
    <nav className="flex items-center justify-between bg-transparent px-14 ">
      <div>
        <Image width={170} height={55} src="/SVGs/logo text.svg" alt="logo" />
      </div>
      <div className="  flex gap-8 text-lg ">
        <Link href="/courses">Courses</Link>
        <Link href="">Pricing</Link>
        <Link href="">Contact us</Link>
      </div>

      {/* TODO: change this code to be just a link this is a bad thing to do*/}

      {!user ? (
        <Link
          href="/login"
          className={`${buttonVariants({ variant: "outlinehover" })}  text-lg font-semibold hover:-translate-y-1 `}
        >
          Login
        </Link>
      ) : (
        <form action={logoutAction}>
          <Button
            variant="outlinehover"
            type="submit"
            className="text-lg font-semibold hover:-translate-y-1 "
          >
            logout
          </Button>
        </form>
      )}
    </nav>
  );
};
export default NavBar;
