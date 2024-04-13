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
  if (!user) return redirect("/login");
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <SideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader />
        {children}
        test
      </div>
    </div>
  );
}
