import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ActionResult } from "@/lib/Form";
import { lucia } from "@/server/auth";
import { db } from "@/server/db";
import { userTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Login = () => {
  return (
    <div className="flex h-screen flex-row-reverse">
      <div className="sm:disabled basis-1/2 lg:relative">
        <Image
          src="/SVGs/Side login image.jpg"
          alt="side image"
          fill
          className="h-fit w-fit"
        />
      </div>
      <div className="basis-1/2">
        <div className="flex items-center justify-between px-8 pt-12 sm:px-12">
          <Link href="/">
            <Image
              src="/SVGs/skillmaxxing-brain-logo.svg"
              alt=""
              width={48}
              height={38}
            />
          </Link>

          <Link href="signin">
            <Button className="rounded-md px-4" variant="ghost">
              {" "}
              Create an account{" "}
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-7 pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Welcome back</h1>
            <p>Reconnect and start your journey</p>
          </div>
          <div className="m-auto space-y-7 text-center ">
            <form className="w-[488px] space-y-7" action={login}>
              {/* should be a, e-mail address instead of username */}
              <Input name="username" placeholder="Enter your username" />
              <Input name="password" placeholder="Enter your password" />

              <Button className="w-full rounded-lg">Login</Button>
            </form>
            <div className="flex items-center justify-center gap-3">
              <hr className="  h-1 grow" />
              <p className="text-md text-gray-500">Or Continue With</p>
              <hr
                className=" h-1
               grow"
              />
            </div>
            <form action="">
              <Button className="w-full rounded-lg" variant="outline">
                Github
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

async function login(formData: FormData) {
  "use server";
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  // const existingUser = db
  //   .prepare("SELECT * FROM user WHERE username = ?")
  //   .get(username) as DatabaseUser | undefined;

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.userName, username));
  if (existingUser[0]) {
    // const validPassword = await new Argon2id().verify(
    //   existingUser.password,
    //   password,
    // );

    if (existingUser[0].password !== password) {
      return {
        error: "Incorrect password",
      };
    }

    const session = await lucia.createSession(existingUser[0].id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } else
    return {
      error: "Incorrect username",
    };
}
