import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bookromms",
  description: "Rooms for booking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header></Header>
        <main className="mx-auto max-width7xl px-4 p-y6 sm:px-6 lg:px-8">
        {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
