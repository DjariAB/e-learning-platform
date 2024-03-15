import NavBar from "@/components/navbar";
import "@/styles/globals.css";

import { Jost } from "next/font/google";
import { Julius_Sans_One } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
});

export const julius = Julius_Sans_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-julius",
});

export const metadata = {
  title: "SkillMaxxing",
  description: "uni project",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`pt-8 font-sans  ${jost.className}  `}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
