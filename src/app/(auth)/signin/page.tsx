import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { validateRequest } from "@/server/auth";
import { Form } from "@/lib/Form";
import { signupAction } from "@/actions/auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Signin = async () => {
  const { user } = await validateRequest();
  if (user) return redirect("/courses");

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
            <Form className="w-[488px] space-y-7" action={signupAction}>
              <Input name="username" placeholder="Enter your user name" />
              {/* <Input type="email" placeholder="Enter your e-mail address" /> */}
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
              />

              <Button className="w-full rounded-lg">Create Account</Button>
            </Form>
            <div className="flex items-center justify-center gap-3">
              <hr className="  h-1 grow" />
              <p className="text-md text-gray-500">Or Continue With</p>
              <hr
                className=" h-1
               grow"
              />
            </div>
            <Link
              href="/api/github"
              className={`${buttonVariants({ variant: "outline" })}   w-full space-x-1 rounded-lg `}
            >
              <GitHubLogoIcon className=" h-5 w-5" />
              <p>Github</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
