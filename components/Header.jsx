"use client";
import Image from "next/image";
import Link from "next/link";
import logo from '@/assets/images/bookinglogo.svg';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding } from 'react-icons/fa';
import destroySession from "@/app/actions/destroySession";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/authContext";
const Header = () => {
    const router = useRouter();
    const {isAuthenticated, setIsAuthenticated} = useAuth(null);

    const handleLogout = async () => {
        const { success, error } = await destroySession();

        if (success) {
            setIsAuthenticated(false);
            router.push('/login');
        } else {
            toast.error(error);
        }
    }
    return (
        <header className='bg-main '>
            <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    <div className='flex items-center'>
                        <Link href='/'>
                            <Image
                                className='h-12 w-12'
                                src={logo}
                                alt='Bookit'
                                priority={true}
                            />
                        </Link>
                        <div className='hidden md:block'>
                            <div className='ml-10 flex items-baseline space-x-4'>
                                <Link
                                    href='/'
                                    className='rounded-md px-3 py-2 text-sm font-medium text-main hover:bg-text-link hover:text-primary'
                                >
                                    Rooms
                                </Link>
                                {/* <!-- Logged In Only --> */}
                                {isAuthenticated && (
                                    <>
                                        <Link
                                            href='/bookings'
                                            className='rounded-md px-3 py-2 text-sm font-medium text-main hover:primary hover:text-primary'
                                        >
                                            Bookings
                                        </Link>
                                        <Link
                                            href='/rooms/add'
                                            className='rounded-md px-3 py-2 text-sm font-medium text-main hover:primary hover:text-primary'
                                        >
                                            Add Room
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className='ml-auto'>
                        <div className='ml-4 flex items-center md:ml-6'>
                            
                            {!isAuthenticated && (
                                <>
                                    <Link
                                        href='/login'
                                        className='mr-3 text-main hover:text-text-link'
                                    >
                                        <FaSignInAlt className='inline mr-1' /> Login
                                    </Link>
                                    <Link
                                        href='/register'
                                        className='mr-3 text-main hover:text-text-link'
                                    >
                                        <FaUser className='inline mr-1' /> Register
                                    </Link>
                                </>
                            )}

                            {isAuthenticated && (
                                <>
                                    <Link href='/rooms/my'>
                                        <FaBuilding className='inline mr-1' /> My Rooms
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className='mx-3 text-main hover:text-text-link'
                                    >
                                        <FaSignOutAlt className='inline mr-1' /> Sign Out
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* <!-- Mobile menu --> */}
            <div className='md:hidden'>
                <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                    <Link
                        href='/'
                        className='block rounded-md px-3 py-2 text-base font-medium text-main hover:primary hover:text-primary'
                    >
                        Rooms
                    </Link>
                    {/* <!-- Logged In Only --> */}
                    {isAuthenticated && (
                        <>
                            <Link
                                href='/bookings'
                                className='block rounded-md px-3 py-2 text-base font-medium text-main hover:primary hover:text-primary'
                            >
                                Bookings
                            </Link>
                            <Link
                                href='/rooms/add'
                                className='block rounded-md px-3 py-2 text-base font-medium text-main hover:primary hover:text-primary'
                            >
                                Add Room
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
