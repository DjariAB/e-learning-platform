import { loginAction } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateRequest } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Login = async () => {
  const { user } = await validateRequest();
  if (user) return redirect("/");

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
            <form className="w-[488px] space-y-7" action={loginAction}>
              <Input name="username" placeholder="Enter your user name" />
              {/* <Input type="email" placeholder="Enter your e-mail address" /> */}
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
              />
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
              {/* <Button className="w-full rounded-lg" variant="outline">
                Github
              </Button> */}

              <Link
                href="/login/github"
                className={`${buttonVariants({ variant: "outline" })}   w-full rounded-lg`}
              >
                Github
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;