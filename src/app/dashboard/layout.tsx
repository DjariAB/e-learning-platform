import DashboardHeader from "@/components/dashboardHeader";
import SideBar from "@/components/sidebar";
import { validateRequest } from "@/server/auth";
import { Anek_Latin } from "next/font/google";
import { redirect } from "next/navigation";
const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user || !user.isMentor) return redirect("/login");
  return (
    <div
      className={`max-h-screen w-full ${anekLatin.className} w-full tracking-wide`}
    >
      <SideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <DashboardHeader />
        <div>{children}</div>
      </div>
    </div>
  );
}
