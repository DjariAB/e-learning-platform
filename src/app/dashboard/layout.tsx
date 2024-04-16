import DashboardHeader from "@/components/dashboardHeader";
import SideBar from "@/components/sidebar";
import { validateRequest } from "@/server/auth";
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user || !user.isMentor) return redirect("/login/mentor");
  return (
    <div className="flex max-h-screen w-full flex-col">
      <SideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader />
        <div>{children}</div>
      </div>
    </div>
  );
}
