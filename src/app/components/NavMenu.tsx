"use client";
import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const NavMenu = () => {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full bg-opacity-80 backdrop-blur-md shadow-md z-50 px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3 text-white">
        <svg
          width="60"
          height="60"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <rect width="100%" height="100%" fillOpacity={0} />

          <circle cx="256" cy="256" r="50" fill="#1ABC9C" />

          <line
            x1="256"
            y1="256"
            x2="256"
            y2="156"
            stroke="#1ABC9C"
            strokeWidth="6"
          />

          <line
            x1="256"
            y1="256"
            x2="356"
            y2="256"
            stroke="#1ABC9C"
            strokeWidth="6"
          />

          <line
            x1="256"
            y1="256"
            x2="256"
            y2="356"
            stroke="#1ABC9C"
            strokeWidth="6"
          />

          <line
            x1="256"
            y1="256"
            x2="156"
            y2="256"
            stroke="#1ABC9C"
            strokeWidth="6"
          />

          <circle cx="256" cy="156" r="15" fill="#1ABC9C" />

          <circle cx="356" cy="256" r="15" fill="#1ABC9C" />

          <circle cx="256" cy="356" r="15" fill="#1ABC9C" />
          <circle cx="156" cy="256" r="15" fill="#1ABC9C" />
        </svg>
        <span className="text-2xl font-bold tracking-wide">
          Open Project Club
        </span>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-white text-lg">
        <li>
          <Link href="/" className="hover:text-gray-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-gray-400 transition">
            About
          </Link>
        </li>
        <li>
          <Link href="/projects" className="hover:text-gray-400 transition">
            Projects
          </Link>
        </li>
        <li>
          <Link href="/roadmap" className="hover:text-gray-400 transition">
            Roadmap
          </Link>
        </li>
      </ul>

      {/* Authentication Buttons */}
      <div className="flex items-center space-x-4">
        {!session ? (
          <button
            onClick={() => signIn()}
            className="hidden lg:flex hover:text-gray-400 transition text-lg"
          >
            Log In
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            {/* Show profile picture if available */}
            {session?.user?.image ? (
              <Link href="/profile">
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-10 w-10 rounded-full border-2 border-white hover:opacity-80 transition"
                />
              </Link>
            ) : (
              /* Show truncated name if no profile picture */
              <Link
                href="/profile"
                className="text-white hover:text-gray-400 transition max-w-[120px] truncate text-lg"
                title={session?.user?.name || ""} // Shows full name on hover
              >
                {session?.user?.name}
              </Link>
            )}

            {/* Log Out Button */}
            <button
              onClick={() => signOut()}
              className="hidden lg:flex hover:text-gray-400 transition text-lg"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavMenu;
