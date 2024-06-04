import Footer from "@/components/Footer";
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
    <main className="max-w-screen flex flex-col  gap-6">
      {children}
      <Footer href="/courses" className="mt-20" />
    </main>
  );
}
