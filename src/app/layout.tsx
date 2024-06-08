import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Karteca Forms",
  description: "Karteca Form is a tool that allows people to create and share form link to their friendsm family and audience without authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="sm:max-w-3xl scroll-smooth max-w-sm w-full mx-auto font-poppins" >
        {children}
        </main>
        </body>
    </html>
  );
}
