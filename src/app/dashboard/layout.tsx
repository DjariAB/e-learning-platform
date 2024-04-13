import DashboardHeader from "@/components/dashboardHeader";
import SideBar from "@/components/sidebar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
