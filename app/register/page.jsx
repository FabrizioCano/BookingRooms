'use client';
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createUser from "../actions/createUser";
import Link from "next/link";
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

        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-4">
                <div className="bg-white px-8 py-12 mt-5 rounded-lg shadow-md text-black w-full">
                    <h1 className="mb-8 text-4xl font-bold text-center">Register</h1>
                    <form action={formAction}>
                        

                        <div className='mb-4'>
                            <label
                                htmlFor='name'
                                className='block text-gray-700 font-bold mb-2'
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
                                className='block text-gray-700 font-bold mb-2'
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
                                className='block text-gray-700 font-bold mb-2'
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
                                className='block text-gray-700 font-bold mb-2'
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
                                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
                            >
                                Register
                            </button>

                            <p className="text-center text-md text-grey-dark">
                                Already have an account? {" "}
                                <Link href='/login' className='text-blue-500'>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>


                    <div className="text-center text-md text-grey-dark mt-6">
                        By signing up, you agree to the {" "}
                        <Link className="no-underline border-b border-grey-dark text-blue-500" href="#">
                            Terms of Service 
                        </Link>{" "}
                        and {" "}
                        <Link className="no-underline border-b border-grey-dark text-blue-500" href="#">
                            Privacy Policy
                        </Link>.
                    </div>
                </div>

                
            </div>
        </div>

    );
}

export default RegisterPage;