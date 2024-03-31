import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["500"],
  subsets: ["latin"],
});
export default function HomePage() {
  return (
    <main className={``}>
      <div className="flex flex-col gap-12 pt-8 text-center ">
        <h1
          className={`text-6xl  font-extrabold tracking-wider text-[#1E1E1E] ${poppins.className}`}
        >
          Max your potential With <br />
          <span className=" text-[#072E6A] "> Skillmaxxing</span>{" "}
        </h1>
        {/* <p className=" text-2xl font-light leading-tight">
          Explore endless possibilities and ignite your curiosity <br /> with
          our interactive learning experience. <br /> Ready to embark on your
          learning journey?
        </p> */}

        {/* TODO: change this code to be just a link this shit smelly af*/}

        {/* <Link href="/signin">
          <Button
            variant="hover"
            className="w-fit py-7 text-2xl font-semibold hover:-translate-y-1 hover:translate-x-1 hover:scale-110"
          >
            {" "}
            Get Started
          </Button>
        </Link> */}
      </div>
      <div className="relative flex items-center justify-center overflow-hidden">
        <div className="z-30 pr-4">
          <Image
            src="/SVGs/centered_nigga.svg"
            alt=" "
            width={550}
            height={729}
          />
        </div>
        <div className=" absolute -bottom-24 h-[666px] w-[666px] rounded-full bg-[#072E6A]"></div>
      </div>
    </main>
  );
}
