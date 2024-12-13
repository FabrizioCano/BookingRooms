import Link from "next/link";
const RegisterPage = () => {
    return (

        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-4">
                <div className="bg-white px-8 py-12 rounded-lg shadow-md text-black w-full">
                    <h1 className="mb-8 text-4xl font-bold text-center">Sign up</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-4 text-lg rounded mb-6"
                        name="fullname"
                        placeholder="Full Name"
                    />

                    <input
                        type="text"
                        className="block border border-grey-light w-full p-4 text-lg rounded mb-6"
                        name="email"
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-4 text-lg rounded mb-6"
                        name="password"
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-4 text-lg rounded mb-6"
                        name="confirm_password"
                        placeholder="Confirm Password"
                    />

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-6 text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500"
                    >
                        Create Account
                    </button>

                    <div className="text-center text-md text-grey-dark mt-6">
                        By signing up, you agree to the
                        <Link className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </Link>{" "}
                        and
                        <Link className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </Link>.
                    </div>
                </div>

                <div className="text-grey-dark mt-8 text-lg">
                    Already have an account?{" "}
                    <Link className="no-underline border-b border-blue text-blue font-bold" href="/login">
                        Log in
                    </Link>
                    .
                </div>
            </div>
        </div>

    );
}

export default RegisterPage;