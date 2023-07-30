import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user?.password) {
          throw new Error("Invalid Credentials");
        }
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect Password");
        }
        // const cubeSession = await prisma.cubeSession.findFirst({
        //   where: {
        //     userId: user.id,
        //   },
        // });
        // if (cubeSession) {
        //   const newUser = await prisma.user.update({
        //     where: { id: user.id },
        //     data: {
        //       setting: {
        //         create: {
        //           cubeType: "333",
        //           cubeSessionId: "1",
        //         },
        //       },
        //     },
        //     include: {
        //       setting: true,
        //       cubeSessions: true,
        //     },
        //   });
        // }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user }) => {
      console.log("On Sign in Callback");
      const cubeSession = await prisma.cubeSession.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (cubeSession) return true;
      console.log("Creating Cube Session and Settings");
      const randomKey = nanoid();
      const u = await prisma.user.update({
        where: { id: user.id },
        data: {
          cubeSessions: {
            create: {
              id: randomKey,
              name: "Default",
              cubeType: "333",
            },
          },
          setting: {
            create: {
              cubeType: "333",
              barView: "bottom",
              cubeSessionId: randomKey,
            },
          },
        },
        include: {
          setting: true,
          cubeSessions: true,
        },
      });
      console.log({ u });
      return true;
    },
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user, profile }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
  // debug: process.env.NODE_ENV === "development",
  debug: true,
};

export default NextAuth(authOptions);
