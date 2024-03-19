import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { validateRequest } from "@/server/auth";
import { cookies } from "next/headers";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { sessionTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const NavBar = async () => {
  const { user } = await validateRequest();
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
          <form action={logout}>
            <Button type="submit">logout</Button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

async function logout() {
  "use server";

  const c = cookies().get("auth_session");

  await db.delete(sessionTable).where(eq(sessionTable.id, c!.value));
  // await lucia.invalidateSession(sessionCookie!);

  cookies().delete("auth_session");

  return redirect("/");
}
