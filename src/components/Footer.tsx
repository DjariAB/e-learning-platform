import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Footer({
  className,
  href,
}: {
  className?: string;
  href?: string;
}) {
  return (
    <footer
      className={cn(
        "flex flex-col items-center gap-6 bg-[#131313] py-14",
        className,
      )}
    >
      <Link href={href ?? "/"}>
        <img src="/SVGs/logo-text-white.svg" className="w-52" />
      </Link>
      <div className="space-x-5 text-white">
        <Link href="#whyus" passHref>
          <u>Why choose us</u>
        </Link>
        <Link href="#instructors" passHref>
          <u>Our instructors</u>
        </Link>
        <Link href="#joinus" passHref>
          <u>join-us</u>
        </Link>
        <Link href={"/courses"}>courses</Link>
        <Link href={"/login"}>login</Link>
      </div>
      <p className="text-sm text-white">
        designed and realized by{" "}
        <Link target="_blank" href={"https://github.com/saif799"}>
          <u>Bekziz Saif</u>
        </Link>{" "}
        &{" "}
        <Link target="_blank" href={"https://github.com/DjariAB"}>
          <u>Djari Abdelbasset</u>
        </Link>
      </p>
    </footer>
  );
}
