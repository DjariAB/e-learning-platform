
import { Button } from "@/components/ui/button";
import { julius } from "../layout";
import Image from "next/image";
import Link from "next/link";


export default function HomePage() {
  
  return (
    <main className=" flex items-center justify-start ">
     
      <div className="flex w-full  justify-between pl-16">
        <div className="flex flex-col gap-12 pt-44">
          <h1 className={`text-7xl  text-[#1E1E1E] ${julius.className}`}>
            Max your potential <br /> With{" "}
            <span className=" text-neutral-500"> Skillmaxxing</span>{" "}
          </h1>
          <p className=" text-2xl font-light leading-tight">
            Explore endless possibilities and ignite your curiosity <br /> with
            our interactive learning experience. <br /> Ready to embark on your
            learning journey?
          </p>

          {/* TODO: change this code to be just a link this shit smelly af*/}

          <Link href="/signin">
            <Button
              variant="hover"
              className="w-fit py-7 text-2xl font-semibold hover:-translate-y-1 hover:translate-x-1 hover:scale-110"
            >
              {" "}
              Get Started
            </Button>
          </Link>
        </div>
       

        <div>
          <Image src="/SVGs/Group 6.png" alt=" " width={637} height={763} />
        </div>
      </div>
    </main>
  );
}
