import { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing Credentials");
        }

        try {
          await connectDB();
          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("Invalid credentials");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            balance: user.balance,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.balance = user.balance;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.balance = token.balance as number;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    //TODO: Uncomment this
    // signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
