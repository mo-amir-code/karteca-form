import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/form/ReduxProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Karteca Forms",
  description:
    "Karteca Form is a tool that allows people to create and share form link to their friendsm family and audience without authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="sm:max-w-3xl py-6 scroll-smooth px-4 max-w-sm w-full mx-auto font-poppins">
          <ReduxProvider>{children}</ReduxProvider>
          <Toaster position="top-right" />
        </main>
      </body>
    </html>
  );
}
