import MentorAvatar from "@/app/dashboard/components/mentorAvatar";
import { type User } from "lucia";
import Image from "next/image";
import Link from "next/link";

export default function Header({ user }: { user: User }) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();

  return (
    <>
      <div className="fixed -top-1 z-50 w-screen bg-white p-4 shadow-sm">
        <div className="inset-0 z-40 flex items-center justify-between px-2">
          <Link href="/courses">
            <Image
              src="/SVGs/logo_text.svg"
              alt="logo"
              width={150}
              height={90}
            />
          </Link>
          <p className="text-xl font-medium">
            {weekdays[date.getDay()]}, {date.getDate()}{" "}
            {months[date.getMonth()]} {date.getFullYear()}
          </p>
          <MentorAvatar name={user.userName} email="abdelbassetd9@gmail.com" />
        </div>
      </div>
    </>
  );
}
