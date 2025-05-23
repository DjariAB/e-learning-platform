import { validateRequest } from "@/server/auth";
import { Anek_Latin } from "next/font/google";
import { redirect } from "next/navigation";
import Header from "./components/header";
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
  if (!user) return redirect("/login/");
  return (
    <div className={`p-4 pt-10 font-sans  ${anekLatin.className} space-y-4`}>
      <Header user={user} />
      <div className="py-4">

      {children}
      </div>
    </div>
  );
}
