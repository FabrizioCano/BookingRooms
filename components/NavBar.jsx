"use client";
import Image from "next/image";
import Link from "next/link";
import logo from '@/assets/images/bookinglogo.svg';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding, FaBimobject, FaBorderAll, FaWarehouse, FaAngleDown, FaChalkboardTeacher, FaHome, FaUserEdit } from 'react-icons/fa';
import destroySession from "@/app/actions/destroySession";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/authContext";
import { useState, useEffect } from "react";
import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const [open, setOpen] = useState(0);

  const router = useRouter();
  const { loading, isAuthenticated, setIsAuthenticated, roles } = useAuth();

  const isAdmin = roles.includes('admin');
  const isUser = roles.includes('user');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleLogout = async () => {
    setIsMobileMenuOpen(false);
    const { success, error } = await destroySession();
    if (success) {
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      router.push("/login");
    } else {
      toast.error(error);
    }
  };

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 w-full bg-navbar shadow-lg backdrop-blur-lg backdrop-saturate-150 z-50 py-4">
        <div className="container mx-auto flex justify-center items-center h-16 text-main">
          <span className="animate-pulse text-sm text-link"></span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-navbar shadow-lg backdrop-blur-lg backdrop-saturate-150 z-50 py-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-main">
        <div className="flex items-center gap-10 ml-4">
          <Image
            className='h-12 w-12'
            src={logo}
            alt='Bookit'
            priority={true}
          />
          <Link href='/' className="hidden lg:flex items-center text-lg text-link text-link-hover">
            <FaHome className="inline mr-2"> </FaHome>Home
          </Link>
          {isAuthenticated && isUser && (
            <Link href="/profile" className="hidden lg:flex items-center text-lg text-link text-link-hover">
              <FaChalkboardTeacher className="inline mr-2" />
              Profile
            </Link>
          )}
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMobileMenu} className="h-6 w-6 mr-5 text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 min-h-screen w-64 bg-navbar shadow-lg transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden z-50`}>
          <div className="flex flex-row items-center border-b pb-4 bg-navbar">
            <Link href="/" className="text-link font-bold text-xl pt-4 ps-5">BOOKA</Link>
            <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-link text-link-hover">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col h-full gap-4">
            {!isAuthenticated ? (
              <>
                <List>
                  <ListItem><Link onClick={handleMobileLinkClick} href="/" className="text-lg text-link text-link-hover"><Typography color="text-main" className="mr-auto font-normal"><FaBorderAll className='inline mr-1' />Rooms</Typography></Link></ListItem>
                  <ListItem><Link onClick={handleMobileLinkClick} href="/register" className="text-lg text-link text-link-hover"><Typography color="text-main" className="mr-auto font-normal"><FaUser className='inline mr-1' />Register</Typography></Link></ListItem>
                  <ListItem><Link onClick={handleMobileLinkClick} href="/login" className="text-lg text-link text-link-hover rounded-md"><Typography color="text-main" className="mr-auto font-normal"><FaSignInAlt className='inline mr-1' />Login</Typography></Link></ListItem>
                </List>
              </>
            ) : (
              <>
                <List>
                  <ListItem><Link onClick={handleMobileLinkClick} href="/" className="text-lg text-link text-link-hover"><Typography color="text-main" className="mr-auto font-normal text-lg"><FaHome className='inline mr-3' />Home</Typography></Link></ListItem>
                  <Accordion open={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 flex gap-2">
                      <FaAngleDown className="h-5 w-5" />
                      <Typography color="text-main" className="mr-auto font-normal text-lg">
                        Bookings
                      </Typography>
                    </AccordionHeader>
                    {open === 1 && (
                      <AccordionBody className="py-1">
                        <List className="pt-0 pl-8">
                          <ListItem>
                            <Link onClick={handleMobileLinkClick} href="/bookings" className="text-lg text-link text-link-hover">
                              <Typography color="text-main" className="mr-auto font-normal"><FaBimobject className='inline mr-1' />My Bookings</Typography>
                            </Link>
                          </ListItem>
                          {isAdmin && (
                            <ListItem>
                              <Link onClick={handleMobileLinkClick} href="/rooms/add" className="text-lg text-link text-link-hover">
                                <Typography color="text-main" className="mr-auto font-normal"><FaWarehouse className='inline mr-1' />Add Room</Typography>
                              </Link>
                            </ListItem>
                          )}
                          <ListItem>
                            <Link onClick={handleMobileLinkClick} href="/rooms/my" className="text-lg text-link text-link-hover">
                              <Typography color="text-main" className="mr-auto font-normal"><FaBuilding className='inline mr-1' />My Rooms</Typography>
                            </Link>
                          </ListItem>
                        </List>
                      </AccordionBody>
                    )}
                  </Accordion>
                  <ListItem><Link onClick={handleMobileLinkClick} href="/profile" className="text-lg text-link text-link-hover"><Typography color="text-main" className="mr-auto font-normal text-lg"><FaChalkboardTeacher className='inline mr-3' />Profile</Typography></Link></ListItem>
                  {isAdmin && (
                    <ListItem>
                      <Link onClick={handleMobileLinkClick} href="/users" className="text-lg text-link text-link-hover">
                      <Typography color="text-main" className="mr-auto font-normal text-lg"><FaUserEdit className='inline mr-3' />User Management</Typography>
                      </Link>
                    </ListItem>
                  )}
                  <ListItem><button onClick={handleLogout} className="bg-transparent text-sm text-link text-link-hover rounded-md"><Typography color="text-main" className="mr-auto font-normal text-lg"><FaSignOutAlt className='inline mr-3' />Sign Out</Typography></button></ListItem>
                </List>
              </>
            )}
          </ul>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {!isAuthenticated ? (
              <>
                <li><Link href="/" className="text-lg text-link text-link-hover"><FaBorderAll className='inline mr-1' />Rooms</Link></li>
                <li><Link href="/register" className="text-lg text-link text-link-hover"><FaUser className='inline mr-1' />Register</Link></li>
                <li><Link href="/login" className="text-lg text-link text-link-hover rounded-md mr-5"><FaSignInAlt className='inline mr-1' />Login</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/bookings" className="text-lg text-link text-link-hover"><FaBimobject className='inline mr-1' />Bookings</Link></li>
                {isAdmin && (
                  <>
                  <li><Link href="/rooms/add" className="text-lg text-link text-link-hover"><FaWarehouse className='inline mr-1' />Add Room</Link></li>
                  <li><Link onClick={handleMobileLinkClick} href="/users" className="text-lg text-link text-link-hover">
                      <Typography color="text-main" className="mr-auto font-normal text-lg"><FaUserEdit className='inline mr-3' />User Management</Typography>
                      </Link></li>
                  </>
              )}
                <li><Link href="/rooms/my" className="text-lg text-link text-link-hover"><FaBuilding className='inline mr-1' />My Rooms</Link></li>
                <li><Link href="/profile" className="text-lg text-link text-link-hover"><FaChalkboardTeacher className='inline mr-1' />Profile</Link></li>
                <li><button onClick={handleLogout} className="text-lg text-link text-link-hover"><FaSignOutAlt className='inline mr-1' />Sign Out</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
