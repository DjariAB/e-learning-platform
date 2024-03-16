import NavBar from "@/components/navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-8">
        <NavBar />
        {children}
    </main>
    );
}
