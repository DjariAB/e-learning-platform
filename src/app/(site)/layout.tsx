export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="h-screen bg-black">{children}</main>;
}
