"use client";
import Image from "next/image";
import Link from "next/link";
import bookinglogo from '@/assets/images/bookinglogo.svg';
import React, { useState } from "react";
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const [nav, setNav] = useState(false);

    return (
        <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-600 shadow">
                <div className="container flex justify-between items-center">

                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <Image className="h-12 w-12" src={bookinglogo} alt="Bookingrooms" priority={true}></Image>
                            </Link>
                        </div>

                        {/* Navegación */}
                        <div
                            className={`flex-grow md:flex md:items-center md:gap-8 ${nav ? "block" : "hidden"} pl-6`}
                        >
                            <ul className="flex flex-col md:flex-row gap-6">
                                <li>
                                    <Link
                                        href="/"
                                        className="block py-2 text-white-700 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-primary-700 dark:text-white dark:hover:text-white"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className="block py-2 text-white-700 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-primary-700 dark:text-white dark:hover:text-white"
                                    >
                                        Bookings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/"
                                        className="block py-2 text-white-700 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-primary-700 dark:text-white dark:hover:text-white"
                                    >
                                        Add Rooms
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>



                    <div className="flex ml-auto items-end">
                        <button
                            className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu"
                            aria-expanded={nav}
                            onClick={() => setNav(!nav)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {nav ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </button>

                        <div
                            className={`container flex flex-col md:flex md:flex-row md:items-end gap-4 items-center ${nav ? "block" : "hidden"} ml-auto`}
                        >
                            <Link
                                href="/"
                                className="py-3 px-5 text-sm mt-2 mb-2 text-white bg-slate-500 rounded-lg shadow-lg hover:bg-slate-700 transition-all duration-300 ease-in-out"
                            >
                                <FaUser className="inline mr-2" />
                                Sign Up
                            </Link>
                            <Link
                                href="/"
                                className="py-3 px-5 text-sm mt-2 mb-2 text-white bg-slate-500 rounded-lg shadow-lg hover:bg-slate-700 transition-all duration-300 ease-in-out"
                            >
                                <FaSignInAlt className="inline mr-2" />
                                Login
                            </Link>
                            <Link
                                href="/"
                                className="py-3 px-5 text-sm mt-2 mb-2 text-white bg-slate-500 rounded-lg shadow-lg hover:bg-slate-700 transition-all duration-300 ease-in-out"
                            >
                                <FaSignOutAlt className="inline mr-2" />
                                Logout
                            </Link>
                        </div>
                    </div>


                </div>
            </nav>
        </header>

    );
};

export default Header;
