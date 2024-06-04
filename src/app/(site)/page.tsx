import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Poppins } from "next/font/google";
import styles from "@/styles/main.module.css";
import NavBar from "@/components/navbar";
import Link from "next/link";
import FeatureCard from "./components/featureCard";
import InstructorCard from "./components/instructorCard";
const poppins = Poppins({
  weight: ["200", "300", "400", "500", "600"],
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
        <div className="absolute -bottom-10 left-1/2 z-40 flex w-fit -translate-x-1/2 gap-7 self-center rounded-full bg-white p-3 text-center text-xl">
          <Button variant="default" className="bg-[#072E6A] ">
            Get Started
          </Button>
          <Link
            href="login/mentor"
            className={`${buttonVariants({ variant: "outlinehover" })} `}
          >
            I&apos;m A Mentor
          </Link>
        </div>
      </div>

      <section
        id="#whyus"
        className={`w-full pb-16 pt-24 text-center ${poppins.className} space-y-16  ${styles.whyUsBg} `}
      >
        <h1 className="text-4xl font-extrabold tracking-wide text-white">
          Why choose us?
        </h1>
        <div className="flex w-full gap-8 px-6 text-white">
          <FeatureCard title="High-Quality Content">
            Enjoy expertly designed lessons and courses that ensure clear,
            engaging, and comprehensive learning to help you excel.
          </FeatureCard>
          <FeatureCard title="Talented Tutors">
            Learn from passionate and knowledgeable instructors dedicated to
            providing the support and guidance you need to succeed.
          </FeatureCard>
          <FeatureCard title="Personalized AI Assistance">
            Our AI helps identify and address your weak points with tailored
            recommendations and practice exercises, boosting your learning
            efficiency.
          </FeatureCard>
        </div>
      </section>
      <section
        id="#instructors"
        className={`flex w-full flex-col items-center py-16 text-center ${poppins.className} gap-8 bg-white `}
      >
        <h1 className="text-4xl font-extrabold tracking-wide">
          Meet our best instructors
        </h1>
        <p className="w-2/3 text-lg font-light">
          Our platform is proud to feature a team of highly skilled and
          passionate instructors. Learn more about their expertise and
          dedication to helping you succeed.
        </p>
        <div className="flex gap-8 px-20">
          <InstructorCard
            image="/images/jane_smith.jpg"
            category="Data Science & Machine Learning"
            name="Dr. Jane Smith"
          >
            Dr. Smith has over 15 years of experience in data science and
            machine learning. She has worked with leading tech companies and has
            a PhD from MIT. Dr. Smith is dedicated to making complex concepts
            accessible and engaging for all students.
          </InstructorCard>
          <InstructorCard
            image="/images/john_doe.jpg"
            category="Photography"
            name="John Doe"
          >
            John Doe is an accomplished photographer with a portfolio that spans
            across various genres, including portrait, landscape, and commercial
            photography. With over 10 years of experience, John’s classes blend
            technical skills with creative insights, inspiring students to see
            the world through a new lens.
          </InstructorCard>
          <InstructorCard
            image="/images/theprimeagen.jpg"
            category="Web Development"
            name="ThePrimeAgen"
          >
            ThePrimeAgen is a seasoned web developer with extensive knowledge in
            both front-end and back-end technologies. With a decade of industry
            experience, they have a knack for breaking down complex coding
            concepts into digestible lessons, empowering students to build their
            own dynamic websites and applications.
          </InstructorCard>
        </div>
      </section>
      <section
        id="#joinus"
        className={`p-28 ${styles.joinusBg} ${poppins.className} flex flex-col items-center space-y-8 object-contain  text-center text-white`}
      >
        <h1 className="text-4xl font-extrabold tracking-wide">
          Join our community
        </h1>
        <p className="w-1/2 text-xl font-light leading-8">
          Become a part of our vibrant learning community and start your journey
          towards academic success. With access to top-notch instructors,
          high-quality lessons, and personalized AI assistance, you&apos;re set
          for an enriching educational experience.
        </p>
      </section>
    </main>
  );
}
