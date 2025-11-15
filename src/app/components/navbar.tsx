// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname?.() ?? "/";

  // Optional: show nothing until session status is known (prevents flicker)
  const isLoading = status === "loading";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo + Site Name */}
        <div className="flex items-center space-x-3">
          <Link href="/" aria-label="Arogya Connect home">
            <Image
              src="/images/logo.jpeg"
              alt="Arogya Connect Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>

          <Link href="/" className="no-underline">
            <span className="text-2xl font-bold text-gray-900">Arogya Connect</span>
          </Link>
        </div>

        {/* Right side: show normal links when NOT signed in; when signed in show only Logout (red) */}
        <div className="flex items-center space-x-4">
          {isLoading ? (
            // keep layout consistent while auth status resolves
            <div className="w-24 h-6 bg-gray-100 rounded animate-pulse" />
          ) : session ? (
            // User is signed in -> show only logout button (red)
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/", // optional: where to redirect after logout
                })
              }
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full transition-transform duration-150 hover:scale-105"
            >
              Logout
            </button>
          ) : (
            // Not signed in -> show regular nav links
            <>
              <Link
                href="/#impact"
                className={`text-gray-600 hover:text-emerald-600 transition duration-300 ${pathname === "/#impact" ? "font-medium" : ""}`}
              >
                Impact
              </Link>

              <Link
                href="/#features"
                className="text-gray-600 hover:text-emerald-600 transition duration-300"
              >
                Features
              </Link>

              <Link
                href="/login"
                className="text-gray-600 hover:text-emerald-600 transition duration-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-full transition-transform duration-200 hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
