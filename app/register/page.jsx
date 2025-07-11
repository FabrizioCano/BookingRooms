'use client';
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createUser from "../actions/createUser";
import Link from "next/link";
import Heading from "@/components/Heading";
const RegisterPage = () => {

    const [state, formAction] = useActionState(createUser, {});
    const router = useRouter();

    useEffect(() => {
        if (state.error) {
            toast.error(state.error);
        }

        if (state.success) {
            toast.success("You can now log in to the page");
            router.push('/login')
        }
    }, [state])

    return (
        <div className="min-h-screen bg-main flex flex-col justify-center py-16 sm:px-8 lg:px-16">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="text-center text-4xl font-extrabold text-main pb-5">Register</h2>
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="bg-navbar py-8 px-8 border-border-primary shadow-lg sm:rounded-xl sm:px-12">
                    
                        <form action={formAction}>
                            <div className='mb-4'>
                                <label
                                    htmlFor='name'
                                    className='block text-main font-bold mb-2'
                                >
                                    Name
                                </label>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    className='border rounded w-full py-2 px-3'
                                    autoComplete='name'
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label
                                    htmlFor='email'
                                    className='block text-main font-bold mb-2'
                                >
                                    Email
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    className='border rounded w-full py-2 px-3'
                                    autoComplete='email'
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label
                                    htmlFor='password'
                                    className='block text-main font-bold mb-2'
                                >
                                    Password
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    className='border rounded w-full py-2 px-3'
                                    required
                                    autoComplete='password'
                                />
                            </div>

                            <div className='mb-6'>
                                <label
                                    htmlFor='confirm-password'
                                    className='block text-main font-bold mb-2'
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type='password'
                                    id='confirm_password'
                                    name='confirm_password'
                                    className='border rounded w-full py-2 px-3'
                                    autoComplete='confirm_password'
                                    required
                                />
                            </div>

                            <div className='flex flex-col gap-5'>
                                <button
                                    type='submit'
                                    className='bg-primary-dark text-primary text-lg font-bold px-4 py-2 rounded hover:bg-text-link-hover'
                                >
                                    Register
                                </button>

                                <p className="text-center text-md text-main">
                                    Already have an account? {" "}
                                    <Link href='/login' className='text-primary-dark'>
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>


                        <div className="text-center text-md text-grey-dark mt-6">
                            By signing up, you agree to the {" "}
                            <Link className="no-underline border-b border-primary text-primary-dark hover:text-text-link-hover" href="#">
                                Terms of Service
                            </Link>{" "}
                            and {" "}
                            <Link className="no-underline border-b border-primary text-primary-dark hover:text-text-link-hover" href="#">
                                Privacy Policy
                            </Link>.
                        </div>
                    </div>


                </div>
            </div>
        

    );
}

export default RegisterPage;