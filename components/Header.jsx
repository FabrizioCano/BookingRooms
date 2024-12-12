import Image from "next/image";
import Link from "next/link";
import bookinglogo from '@/assets/images/bookinglogo.svg';
import {FaUser,FaSignInAlt,FaSignOutAlt,FaBuilding} from 'react-icons/fa';
const Header = () => {
    return (
        <header className='flex shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
            <div className='flex flex-wrap items-center justify-between gap-4 w-full'>
                <Link href="javascript:void(0)"
                    className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2">
                    <Image className='h-12 w-12' src={bookinglogo} alt='Bookingrooms' priority={true}></Image>
                </Link>

                <div className='hidden md:block sm:block'>
                    <div className="ml-10 flex items-baseline space-x-4">
                        <ul
                            className='ml-10 flex items-baseline space-x-4'>
                            <li className='max-lg:border-b max-lg:py-3 px-3'>
                                <Link href='javascript:void(0)'
                                    className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Rooms</Link>
                            </li>
                            <li className='max-lg:border-b max-lg:py-3 px-3'><Link href='javascript:void(0)'
                                className='hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Bookings</Link>
                            </li>
                            <li className='max-lg:border-b max-lg:py-3 px-3'><Link href='javascript:void(0)'
                                className='hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Add Room</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='flex items-center ml-auto'>
                    <div className="ml-4 flex items-center justify-center md:ml-6">
                        <Link href='javascript:void(0)'
                            className='text-[#007bff] hover:underline my-5 pr-5'>
                                <FaBuilding className="inline mr-2"></FaBuilding>My Rooms
                                </Link>
                        <Link href='javascript:void(0)'
                            className='text-[#007bff] hover:underline my-5 pr-5'>
                                <FaSignInAlt className="inline mr-2"></FaSignInAlt>Login
                                </Link>
                        <Link href='javascript:void(0)'
                            className='text-[#007bff] hover:underline my-5 pr-5'>
                                <FaUser className="inline mr-2"></FaUser>Sign Up
                                </Link>
                        <Link href='javascript:void(0)'
                            className='text-[#007bff] hover:underline my-5 pr-5'>
                                <FaSignOutAlt className="inline mr-2"></FaSignOutAlt>Log Out
                                </Link>
                        

                    </div>
                </div>


                {/* menu para mobile */}

                {/* <div className='flex flex-wrap items-center justify-between gap-4 w-full'>
                    <Link href="javascript:void(0)"
                        className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2">
                        <Image className='h-12 w-12' src={bookinglogo} alt='Bookingrooms' priority='true'></Image>
                    </Link>

                    <div className='md:hidden'>
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">

                            <ul
                                className='lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                                <li className='max-lg:border-b max-lg:py-3 px-3'>
                                    <Link href='javascript:void(0)'
                                        className='hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Rooms</Link>
                                </li>
                                <li className='max-lg:border-b max-lg:py-3 px-3'><Link href='javascript:void(0)'
                                    className='hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Bookings</Link>
                                </li>
                                <li className='max-lg:border-b max-lg:py-3 px-3'><Link href='javascript:void(0)'
                                    className='hover:text-[#007bff] text-[#333] block font-semibold text-[15px]'>Add Room</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </header>
    );
}

export default Header;