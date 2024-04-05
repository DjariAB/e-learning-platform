import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Poppins } from "next/font/google";
import styles from "@/styles/main.module.css";
import NavBar from "@/components/navbar";
const poppins = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});
export default function HomePage() {
  return (
    <main className={``}>
      <div
        className={`${styles.mainBg} relative flex h-[85vh] flex-col  gap-12   rounded-[0px_0px_200px_200px]  pt-8 text-center`}
      >
        <NavBar />
        <div className="relative flex grow flex-col items-center gap-12 overflow-hidden">
          <h1
            className={`z-0 text-5xl font-extrabold tracking-wider text-[#1E1E1E] ${poppins.className}`}
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
          <div className="absolute z-30 pr-4 pt-[65px]">
            <Image
              src="/SVGs/centered_nigga.svg"
              alt=" "
              width={520}
              height={700}
            />
          </div>
          <div className=" absolute top-40 h-[666px] w-[666px] rounded-full bg-[#072E6A]"></div>
        </div>
      </div>
      <div className="absolute bottom-20 left-1/2 z-40 flex w-fit -translate-x-1/2 gap-7 self-center rounded-full bg-white p-3 text-center text-xl">
        <Button variant="default" className="bg-[#072E6A] ">
          Get Started
        </Button>
        <Button variant="outlinehover">I&apos;m A Mentor</Button>
      </div>
    </main>
  );
}
