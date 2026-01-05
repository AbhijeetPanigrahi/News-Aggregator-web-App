
import React, { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch (err) {
            // Improve error filtering
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already in use.");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Failed to create an account. Please try again.");
            }
            console.error(err);
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen flex bg-background">
            {/* Left: Content/Form */}
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-surface z-10 w-full lg:w-[500px]">
                <div className="mx-auto w-full max-w-sm lg:w-96">

                    <div className="mb-10">
                        <Link to="/" className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 group">
                            <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="mt-6 text-4xl font-black text-text-primary tracking-tight">
                            Join Vertonews
                        </h2>
                        <p className="mt-2 text-sm text-text-secondary">
                            Start curating your personal news feed today.
                        </p>
                    </div>

                    <div className="mt-10">
                        {error && (
                            <div className="mb-6 rounded-xl bg-red-50 border border-red-100 p-4 animate-shake">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Authentication Error
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <p>{error}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                                    Email address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        ref={emailRef}
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent sm:text-sm bg-background transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        ref={passwordRef}
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent sm:text-sm bg-background transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password-confirm" className="block text-sm font-medium text-text-primary">
                                    Confirm Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                                        <FontAwesomeIcon icon={faLock} />
                                    </div>
                                    <input
                                        id="password-confirm"
                                        name="password-confirm"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        ref={passwordConfirmRef}
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-main focus:border-transparent sm:text-sm bg-background transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary-main hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main transition-all duration-200 transform hover:-translate-y-0.5"
                                >
                                    {loading ? "Creating..." : "Create Account"}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-text-secondary">
                                Already have an account?{' '}
                                <Link to="/login" className="font-bold text-primary-main hover:text-primary-dark transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Image */}
            <div className="hidden lg:block relative w-0 flex-1">
                <div className="absolute inset-0 bg-primary-main/10 mix-blend-multiply z-10" />
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/auth-bg.png"
                    alt="Abstract background"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-20 text-white bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-4xl font-bold mb-4 drop-shadow-md">Stay Informed.</h3>
                    <p className="text-xl text-gray-200 drop-shadow-md max-w-lg">
                        Discover stories that matter to you from trusted sources around the globe.
                    </p>
                </div>
            </div>
        </div>
    );
}
