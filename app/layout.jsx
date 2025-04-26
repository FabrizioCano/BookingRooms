import { Geist, Geist_Mono } from "next/font/google";
import '../assets/styles/globals.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Heading from "@/components/Heading";
import { ToastContainer } from "react-toastify";
import AuthWrapper from "@/components/AuthWrapper";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "@/components/NavBar";
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
    <AuthWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar></Navbar>
          <div className="flex flex-col min-h-screen">
            <main className="bg-main flex-1 max-width7xl px-4 pt-20 sm:px-6 lg:px-8 pb-5">
              {children}
            </main>
            </div>
          <Footer></Footer>
          <ToastContainer></ToastContainer>
        </body>
      </html>
    </AuthWrapper>
  );
}
