import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen overflow-x-auto bg-[#131313]">
      {children}

      <Footer />
    </main>
  );
}
