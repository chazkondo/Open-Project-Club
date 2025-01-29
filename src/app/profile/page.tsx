"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!session) {
    router.push("/auth/signin"); // Redirect if not logged in
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-96">
        <img
          src={session.user?.image || "/default-avatar.png"}
          alt="Profile Picture"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-700"
        />
        <h1 className="text-2xl font-semibold">
          {session.user?.name || "User"}
        </h1>
        <p className="text-gray-400">{session.user?.email}</p>

        <button
          onClick={() => signOut()}
          className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
