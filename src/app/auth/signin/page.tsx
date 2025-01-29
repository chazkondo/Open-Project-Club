"use client";
import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProviderStyle {
  bgClasses: string; // e.g., background color classes
  textClasses: string; // e.g., text color classes
  hoverClasses: string; // e.g., hover states
  logo: string; // path to logo
}

export default function SignIn() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // Define branding for each provider
  const providerStyles: Record<string, ProviderStyle> = {
    Google: {
      bgClasses: "bg-white border-gray-300",
      textClasses: "text-black",
      hoverClasses: "hover:bg-gray-400",
      logo: "/google_logo.svg",
    },
    GitHub: {
      bgClasses: "bg-black",
      textClasses: "text-white",
      hoverClasses: "hover:bg-gray-800",
      logo: "/github_logo.svg",
    },
    // Add more providers/styles as needed
  };

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res as Record<string, ClientSafeProvider>);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 text-white">
      {/* Logo */}
      <div className="mb-6">
        <svg
          width="200"
          height="200"
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
      </div>

      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome to Open Project Club
      </h1>
      <p className="text-gray-400 mb-8 text-center">
        Sign in (or create an account) to collaborate on amazing projects with
        our community!
      </p>
      {/* Display Error Message */}
      {error && (
        <p className="mt-4 px-4 py-2 text-red-400 bg-red-900 bg-opacity-40 rounded">
          {error === "OAuthAccountNotLinked"
            ? "This email is already associated with another sign-in provider. Try logging in with a different method."
            : "An error occurred during login. Please try again."}
        </p>
      )}

      {/* Sign-in Buttons */}
      {providers &&
        Object.values(providers).map((provider: ClientSafeProvider) => {
          const style = providerStyles[provider.name] || {
            bgClasses: "bg-blue-600",
            textClasses: "text-white",
            hoverClasses: "hover:bg-blue-400",
            logo: "",
          };

          return (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition mb-4 
                          ${style.bgClasses} ${style.textClasses} ${style.hoverClasses}`}
            >
              {style.logo && (
                <img
                  src={style.logo}
                  alt={`${provider.name} Logo`}
                  className="h-5 w-5"
                />
              )}
              <span>Sign in with {provider.name}</span>
            </button>
          );
        })}

      {/* Back to Home */}
      <a href="/" className="text-gray-400 mt-6 hover:text-gray-200 transition">
        ← Back to Home
      </a>
    </div>
  );
}
