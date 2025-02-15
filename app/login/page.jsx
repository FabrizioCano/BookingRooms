'use client';
import Link from "next/link";
import createSession from "../actions/createSession";
import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LoginPage = () => {

    const [state,formAction]=useActionState(createSession,{});

    const router=useRouter();
    useEffect(()=>{
        if(state.error){
            toast.error(state.error);
        }

        if(state.success){
            toast.success('Logged in succesfully');
            router.push('/');
        }
    },[state]);
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-16 sm:px-8 lg:px-16">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="mt-8 text-center text-4xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
                <p className="mt-4 text-center text-lg text-gray-600 max-w">
                    Or{" "}
                    <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        create an account
                    </Link>
                </p>
            </div>

            <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="bg-white py-12 px-8 shadow-lg sm:rounded-xl sm:px-12">
                    <form className="space-y-8" action={formAction}>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-3 block text-lg text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-lg">
                                <Link href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-4 px-6 text-lg font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default LoginPage;