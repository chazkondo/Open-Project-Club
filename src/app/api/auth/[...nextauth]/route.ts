import NextAuth, { type AuthOptions, type SessionStrategy } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Ensure this points to your Prisma instance

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // Add this line
  adapter: PrismaAdapter(prisma), // Connect NextAuth to Prisma
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "select_account", // Forces the account picker to show
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      authorization: {
        params: {
          prompt: "login", // Forces GitHub to show the login prompt
        },
      },
    }),
  ],
  callbacks: {
    // This is triggered when a new user is created (first sign-in)
    async signIn({ user, account, profile }) {
      if (!user.email || !account) return false; // Ensure account exists

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existingUser && existingUser.email !== user.email) {
        throw new Error("Email is already associated with another provider.");
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user, // ✅ Keep existing properties
          id: token.id as string, // ✅ Ensure `id` is assigned correctly
        };
      } else {
        console.error("Session user is undefined:", session);
      }
      return session;
    },
  },

  session: {
    strategy: "jwt" as SessionStrategy, // Use JWT-based sessions
  },
  jwt: {},
  pages: {
    signIn: "/auth/signin", // Redirect users to custom sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
