// import { loginAction } from "@/actions/auth";
import { mentorLoginAction } from "@/actions/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { AuthForm } from "@/lib/Form";
import { validateRequest } from "@/server/auth";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Login = async () => {
  const { user } = await validateRequest();
  if (user && user.isMentor) return redirect("/dashboard");

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
          <Link href="/signin/mentor">
            <Button className="rounded-md px-4" variant="ghost">
              {" "}
              Create an account{" "}
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-7 pt-20">
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Welcome back</h1>
            {/* TODO choose between text-zinc or text-gray  */}

            <p className="text-zinc-500">Reconnect and start your journey</p>
          </div>
          <div className="m-auto space-y-7 text-center ">
            {/* <Form className="w-[488px] space-y-7" action={loginAction}>
              <Input name="username" placeholder="Enter your user name" />
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
              />
              <Button className="w-full rounded-lg">Login</Button>
            </Form> */}
            <AuthForm
              action={mentorLoginAction}
              ButtonText="Login"
              className="w-[488px] space-y-7"
            />

            <div className="flex items-center justify-center gap-3">
              <hr className="  h-1 grow" />
              {/* TODO choose between text-zinc or text-gray  */}

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

export default Login;
