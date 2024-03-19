import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

import { db } from "@/server/db/index";
// import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/server/auth";
import { redirect } from "next/navigation";
import { ActionResult, Form } from "@/lib/Form";
import { generateId } from "lucia";
import { userTable } from "@/server/db/schema";

const Signin = async () => {
  const { user } = await validateRequest();
  if (user) return redirect("/");

  return (
    <div className="flex h-screen">
      <div className="relative basis-1/2">
        <Image
          src="/SVGs/Side login image.jpg"
          alt="side image"
          fill
          className="h-fit w-fit"
        />
      </div>
      <div className="basis-1/2 ">
        <div className="flex items-center justify-between px-8 pt-12">
          <Link href="/">
            <Image
              src="/SVGs/skillmaxxing-brain-logo.svg"
              alt="logo"
              width={48}
              height={38}
            />
          </Link>

          <Link href="login">
            <Button className="rounded-md px-6" variant="ghost">
              {" "}
              Login{" "}
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-7 pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Create your account</h1>
            <p>Start your learning journey now!</p>
          </div>
          <div className="m-auto space-y-7 text-center ">
            <form className="w-[488px] space-y-7" action={signup}>
              <Input name="username" placeholder="Enter your user name" />
              <Input type="email" placeholder="Enter your e-mail address" />
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
              />

              <Button className="w-full rounded-lg">Create Account</Button>
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

export default Signin;

async function signup(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
  // keep in mind some database (e.g. mysql) are case insensitive
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

  // const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    await db
      .insert(userTable)
      .values({ id: userId, userName: username, password });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    await lucia.invalidateSession(userId);

    const cookiess=lucia.readSessionCookie("username")

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    cookies().delete("username")
  } catch (e) {
    // if (e instanceof DrizzleError ) {
    //   return {
    //     error: "Username already used",
    //   };
    // }

    return {
      error: "An unknown error occurred",
    };
  }
  return redirect("/");
}
