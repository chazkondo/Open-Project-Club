import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"; // ✅ Ensure authOptions is imported

import SessionProvider from "./components/SessionProvider";
import NavMenu from "./components/NavMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open Project Club",
  description:
    "Open Project Club is a collaborative hub where individuals from all backgrounds and skill levels come together to create, innovate, and make an impact.",
  openGraph: {
    title: "Open Project Club",
    description:
      "Open Project Club is a collaborative hub where individuals from all backgrounds and skill levels come together to create, innovate, and make an impact.",
    url: "https://OpenProjectClub.com",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Open Project Club Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Project Club",
    description:
      "Open Project Club is a collaborative hub where individuals from all backgrounds and skill levels come together to create, innovate, and make an impact.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions); // ✅ Pass authOptions

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <main className="mx-auto text-2xl text-white w-full">
            {/* Navbar at the top */}
            <NavMenu />

            {/* Main content below the navbar */}
            <div className="mt-4">{children}</div>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
