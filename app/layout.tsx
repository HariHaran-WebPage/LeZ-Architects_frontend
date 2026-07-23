import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "./components/Header/MenuBar";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ReduxProvider from "./providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeZ Architects & Interiors",
  description: "Welcome to LeZ Architects & Interiors – Architecture & Interior Design Experts",
  icons: "/logo.png", 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-zinc-50 dark:bg-black`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </ReduxProvider>
      </body>
    </html>
  );
}