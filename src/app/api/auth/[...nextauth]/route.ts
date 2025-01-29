import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Ensure this points to your Prisma instance

const handler = NextAuth({
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
      // Optional logic to determine whether to allow sign-in
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // Ensures user ID is attached safely
      }
      return session;
    },
  },

  session: {
    strategy: "jwt", // Use JWT-based sessions
  },
  jwt: {},
  pages: {
    signIn: "/auth/signin", // Redirect users to custom sign-in page
  },
});

export { handler as GET, handler as POST };
