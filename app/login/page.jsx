'use client';
import Link from "next/link";
import createSession from "../actions/createSession";
import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";


const LoginPage = () => {
    const {isAuthenticated,setIsAuthenticated}=useAuth();
    const [state,formAction]=useActionState(createSession,{});

    const router=useRouter();
    useEffect(()=>{
        if(state.error){
            toast.error(state.error);
        }

        if(state.success){
            toast.success('Logged in succesfully');
            setIsAuthenticated(true);
            router.push('/');
        }
    },[state]);
    return (
        <div className="min-h-screen bg-main flex flex-col justify-center py-16 sm:px-8 lg:px-16">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="text-center text-4xl font-extrabold text-main">
                    Sign in to your account
                </h2>
                <p className="mt-3 text-center text-lg text-main max-w">
                    Or{" "}
                    <Link href="/register" className="font-medium text-primary-dark hover:text-text-link-hover">
                        create an account
                    </Link>
                </p>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="bg-navbar py-12 px-8 border-border-primary shadow-lg sm:rounded-xl sm:px-12">
                    <form className="space-y-8" action={formAction}>
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-main">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-4 py-3 border border-primary placeholder-gray-500 text-main focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-lg font-medium text-main">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-4 py-3 border border-primary placeholder-gray-500 text-main focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-lg"
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
                                    className="h-5 w-5 text-main focus:ring-indigo-500 border-primary rounded"
                                />
                                <label htmlFor="remember_me" className="ml-3 block text-lg text-main">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-lg">
                                <Link href="#" className="font-medium text-primary-dark hover:text-text-link-hover">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-4 px-6 text-lg font-semibold rounded-lg text-primary bg-primary-dark hover:bg-text-link-hover focus:outline-none focus:ring-4 focus:ring-offset-2"
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