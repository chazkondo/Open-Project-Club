import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function AboutPage() {
  const session = await getServerSession(authOptions); // ✅ Fetch session on the serverxw

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gray-900 text-white">
      <div className="max-w-4xl text-center mt-24">
        <h1 className="text-7xl font-bold leading-[1.1] bg-gradient-to-r from-white to-blue-500 text-transparent bg-clip-text">
          About Open Project Club
        </h1>
        <p className="mt-4 text-lg text-gray-300 leading-relaxed">
          Open Project Club is a <strong>collaborative hub</strong> where
          individuals from all backgrounds and skill levels come together to{" "}
          <strong>create, innovate, and make an impact</strong>.
        </p>

        <div className="mt-12 text-left space-y-6">
          <h2 className="text-2xl font-semibold text-green-400">
            🚀 A Space for Collaboration
          </h2>
          <p className="text-gray-400">
            Whether you're a{" "}
            <strong>
              developer, designer, strategist, or creative thinker
            </strong>
            , Open Project Club is about{" "}
            <strong>uniting different skillsets</strong> to tackle meaningful
            projects.
          </p>

          <h2 className="text-2xl font-semibold text-blue-400">
            🌎 Impacting Communities
          </h2>
          <p className="text-gray-400">
            We believe that <strong>real change starts with individuals</strong>
            . Our platform connects people who want to
            <strong>
              {" "}
              bring fresh ideas to their neighborhoods, schools, and cities
            </strong>{" "}
            — from <strong>building community-driven apps</strong> to
            <strong>
              {" "}
              launching initiatives that solve everyday problems around the
              world
            </strong>
            .
          </p>

          <h2 className="text-2xl font-semibold text-purple-400">
            🤝 A Non-Intimidating Environment
          </h2>
          <p className="text-gray-400">
            Open Project Club is designed to be{" "}
            <strong>inclusive and welcoming</strong>—whether you're an
            <strong> experienced professional or just starting out</strong>. No
            egos, no pressure—just a<strong> supportive space</strong> where you
            can grow, contribute, and collaborate at your own pace.
          </p>

          {/* Show sign-in button only if user is NOT signed in */}
          {!session && (
            <div className="mt-12 flex flex-col items-center">
              <p className="text-lg text-gray-300">
                Ready to <strong>connect with like-minded individuals</strong>{" "}
                and start making an impact?
              </p>
              <Link
                href="/auth/signin"
                className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition"
              >
                Join Open Project Club
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
