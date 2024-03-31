import NavBar from "@/components/navbar";

import styles from "@/styles/main.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={`${styles.background}  pt-5`}>
      <NavBar />
      {children}
    </main>
  );
}
