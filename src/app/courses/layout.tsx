import MainNavBar from "@/components/mainNavbar";

import HeroSec from "@/components/heroSection";
import { validateRequest } from "@/server/auth";
import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");
  return (
    <main className="flex flex-col gap-6 px-4 pt-4">
      <MainNavBar />

      {children}

      <h1> hello {user.userName}</h1>
      <h3> and here is your id {user.id} </h3>
    </main>
  );
}
