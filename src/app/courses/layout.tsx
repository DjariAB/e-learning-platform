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
    <main className="max-w-screen flex h-fit flex-col  justify-between gap-6">
      <div>{children}</div>
      <Footer href="/courses" className="mt-20" />
    </main>
  );
}
