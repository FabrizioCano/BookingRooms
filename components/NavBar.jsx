"use client";
import Image from "next/image";
import Link from "next/link";
import logo from '@/assets/images/bookinglogo.svg';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding, FaBimobject,FaBorderAll,FaWarehouse} from 'react-icons/fa';
import destroySession from "@/app/actions/destroySession";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/authContext";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    const { success, error } = await destroySession();
    if (success) {
      setIsAuthenticated(false);
      router.push("/login");
    } else {
      toast.error(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-90 shadow-lg backdrop-blur-lg backdrop-saturate-150 z-50 py-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
      <Link href='/'>
                            <Image
                                className='h-12 w-12 ml-4'
                                src={logo}
                                alt='Bookit'
                                priority={true}
                            />
                        </Link>

        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="h-6 w-6 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 min-h-screen w-64 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden z-50`}>
          <div className="flex flex-row items-center border-b pb-4">
            <Link href="/" className="text-red-600 font-bold text-xl pt-4 ps-4">BOOKINGS</Link>
            <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-slate-600 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col h-full gap-4 p-4">
            {!isAuthenticated ? (
              <>
                <li><Link href="/" className="text-lg text-slate-600 hover:text-red-500"><FaBorderAll className='inline mr-1' />Rooms</Link></li>
                <li><Link href="/register" className="text-lg text-slate-600 hover:text-red-500"><FaUser className='inline mr-1' />Register</Link></li>
                <li><Link href="/login" className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500"><FaSignInAlt className='inline mr-1' />Login</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/bookings" className="text-lg text-slate-600 hover:text-red-500"><FaBimobject className='inline mr-1' />Bookings</Link></li>
                <li><Link href="/rooms/add" className="text-lg text-slate-600 hover:text-red-500"><FaWarehouse className='inline mr-1' />Add Room</Link></li>
                <li><Link href="/rooms/my" className="text-lg text-slate-600 hover:text-red-500"><FaBuilding className='inline mr-1' />My Rooms</Link></li>
                <li><button onClick={handleLogout} className="bg-red-600 text-white px-8 py-2 rounded-md mr-4 hover:bg-red-500"><FaSignOutAlt className='inline mr-1' />Sign Out</button></li>
              </>
            )}
          </ul>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {!isAuthenticated ? (
              <>
                <li><Link href="/" className="text-lg text-slate-600 hover:text-red-500"><FaBorderAll className='inline mr-1' />Rooms</Link></li>
                <li><Link href="/register" className="text-lg text-slate-600 hover:text-red-500"><FaUser className='inline mr-1' />Register</Link></li>
                <li><Link href="/login" className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 rounded-md"><FaSignInAlt className='inline mr-1' />Login</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/bookings" className="text-lg text-slate-600 hover:text-red-500"><FaBimobject className='inline mr-1' />Bookings</Link></li>
                <li><Link href="/rooms/add" className="text-lg text-slate-600 hover:text-red-500"><FaWarehouse className='inline mr-1' />Add Room</Link></li>
                <li><Link href="/rooms/my" className="text-lg text-slate-600 hover:text-red-500"><FaBuilding className='inline mr-1' />My Rooms</Link></li>
                <li><button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 rounded-md"><FaSignOutAlt className='inline mr-1' />Sign Out</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
