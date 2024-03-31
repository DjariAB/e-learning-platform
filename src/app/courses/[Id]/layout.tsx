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
    <main className="flex flex-col gap-6 px-0 ">
      {children}

      
    </main>
  );
}
