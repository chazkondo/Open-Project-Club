"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const NavMenu = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Reset isMobileMenuOpen when screen size expands beyond the mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-opacity-80 backdrop-blur-md shadow-md z-50 px-6 py-4 flex justify-between items-center ${
        isMobileMenuOpen ? "h-screen" : "h-auto"
      }`}
    >
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

      {/* Hamburger Menu Icon (Mobile Only) */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden text-white focus:outline-none"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Desktop Navigation Links */}
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

      {/* Mobile Navigation Menu (Full Height) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-90 backdrop-blur-md z-50 h-screen">
          <div className="flex justify-end p-6">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-center space-y-8 text-white text-2xl mt-20">
            <li>
              <Link
                href="/"
                onClick={toggleMobileMenu}
                className="hover:text-gray-400 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={toggleMobileMenu}
                className="hover:text-gray-400 transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                onClick={toggleMobileMenu}
                className="hover:text-gray-400 transition"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/roadmap"
                onClick={toggleMobileMenu}
                className="hover:text-gray-400 transition"
              >
                Roadmap
              </Link>
            </li>
            {/* Authentication Links for Mobile */}
            <li>
              {!session ? (
                <button
                  onClick={() => signIn()}
                  className="hover:text-gray-400 transition"
                >
                  Log In
                </button>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  {session?.user?.image ? (
                    <Link href="/profile" onClick={toggleMobileMenu}>
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="h-16 w-16 rounded-full border-2 border-white hover:opacity-80 transition"
                      />
                    </Link>
                  ) : (
                    <Link
                      href="/profile"
                      onClick={toggleMobileMenu}
                      className="text-white hover:text-gray-400 transition"
                    >
                      {session?.user?.name}
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="text-white hover:text-gray-400 transition"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Desktop Authentication Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        {!session ? (
          <button
            onClick={() => signIn()}
            className="hover:text-gray-400 transition text-lg"
          >
            Log In
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            {session?.user?.image ? (
              <Link href="/profile">
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-10 w-10 rounded-full border-2 border-white hover:opacity-80 transition"
                />
              </Link>
            ) : (
              <Link
                href="/profile"
                className="text-white hover:text-gray-400 transition max-w-[120px] truncate text-lg"
                title={session?.user?.name || ""}
              >
                {session?.user?.name}
              </Link>
            )}
            <button
              onClick={() => signOut()}
              className="hover:text-gray-400 transition text-lg"
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
