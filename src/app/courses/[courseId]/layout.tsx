import { validateRequest } from "@/server/auth";
import { Anek_Latin } from "next/font/google";
import { redirect } from "next/navigation";

const anekLatin = Anek_Latin({
  subsets: ["latin"],
  weight: ["300"],
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();
  if (!user) return redirect("/login");
  return (
    <main className={`flex flex-col gap-6 px-0 ${anekLatin.className}`}>
      {children}
    </main>
  );
}