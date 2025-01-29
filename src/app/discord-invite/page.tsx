"use client";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const DISCORD_INVITE_URL = `https://discord.gg/${process.env.NEXT_PUBLIC_DISCORD_INVITE}`;
const DISCORD_API_URL = `https://discord.com/api/v9/invites/${process.env.NEXT_PUBLIC_DISCORD_INVITE}?with_counts=true`;

const DiscordInvite = () => {
  const { data: session, status } = useSession();
  const [qrData, setQrData] = useState("");
  const [memberCount, setMemberCount] = useState<number | null>(null);

  useEffect(() => {
    if (session) {
      setQrData(DISCORD_INVITE_URL);
    }
  }, [session]);

  // Fetch Discord Member Count
  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const response = await fetch(DISCORD_API_URL);
        if (!response.ok) throw new Error("Failed to fetch member count");

        const data = await response.json();
        setMemberCount(data.approximate_member_count);
      } catch (error) {
        console.error("Error fetching Discord member count:", error);
        setMemberCount(null);
      }
    };

    fetchMemberCount();
  }, []);

  if (status === "loading")
    return <p className="text-white text-center">Loading...</p>;

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <p className="text-2xl mb-4">
          You need to be logged in to access this page.
        </p>
        <button
          onClick={() => signIn()}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">Join Our Discord</h1>
      <p className="text-lg mb-4">
        Scan the QR code below to join the Open Project Club Discord.
      </p>

      {/* QR Code */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {qrData && <QRCode value={qrData} size={200} />}
      </div>

      {/* Member Count */}
      {memberCount !== null ? (
        <p className="mt-4 text-lg text-green-400 font-semibold">
          🚀 {memberCount} members and growing!
        </p>
      ) : (
        <p className="mt-4 text-lg text-gray-400">Loading member count...</p>
      )}

      {/* Fallback Invite Link */}
      <p className="mt-4">
        Or click here:{" "}
        <a
          href={DISCORD_INVITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition"
        >
          Join via link
        </a>
      </p>
    </div>
  );
};

export default DiscordInvite;
