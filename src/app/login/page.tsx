import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex h-screen flex-row-reverse">
      <div className="relative basis-1/2">
        <Image
          src="/SVGs/Side login image.jpg"
          alt="side image"
          fill
          className="h-fit w-fit"
        />
      </div>
      <div className="basis-1/2">
        <div className="flex items-center justify-between px-8 pt-12">
          <Image
            src="/SVGs/skillmaxxing-brain-logo.jpg"
            alt=""
            width={48}
            height={38}
          />
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
            <form className="w-[488px] space-y-7" action="">
              <Input placeholder="Enter your e-mail address" />
              <Input placeholder="Enter your password" />

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
