import { Inter } from "next/font/google";
import "./globals.css";

import NextThemeProvider from "@/providers/NextThemeProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', 
});

export const metadata = {
  title: "MediQueue – Tutor Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased bg-background text-foreground`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <NextThemeProvider>
          <Navbar></Navbar>
        <main>{children}</main>
        </NextThemeProvider>
        </body>
    </html>
  );
}
