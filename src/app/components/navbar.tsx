"use client";

import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                {/* Logo + Site Name */}
                <div className="flex items-center space-x-3">
                    <Link href="/">
                    <Image
                        src="/images/logo.jpeg"
                        alt="Arogya Connect Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    </Link>
                    <Link href="/">
                        <span className="text-2xl font-bold text-gray-900">Arogya Connect</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="space-x-4 flex items-center">
                    <Link href="/#impact" className="text-gray-600 hover:text-emerald-600 transition duration-300">
                        Impact
                    </Link>
                    <Link href="/#features" className="text-gray-600 hover:text-emerald-600 transition duration-300">
                        Features
                    </Link>
                    <Link href="/login" className="text-gray-600 hover:text-emerald-600 transition duration-300">
                        Login
                    </Link>
                    <Link href="/register" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-full transition-transform duration-200 hover:scale-105">
                        Sign Up
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
