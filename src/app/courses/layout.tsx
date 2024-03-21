import MainNavBar from "@/components/mainNavbar";

import HeroSec from "@/components/heroSection";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col gap-6 px-4 pt-4">
      <MainNavBar />
      <HeroSec />
      {children}
    </main>
  );
}
