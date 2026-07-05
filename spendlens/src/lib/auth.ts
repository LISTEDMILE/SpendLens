import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import dbConnect from "./DbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),

        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!,
        }),

        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: {
                    label: "Username",
                    type: "email",
                },

                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                try {
                    if (!credentials?.username || !credentials?.password) {
                        return null;
                    }

                    await dbConnect();

                    const user = await UserModel.findOne({
                        username: credentials.username,
                    });

                    if (!user) {
                        return null;
                    }

                    if (!user.password) {
                        return null;
                    }

                    const isMatch = await bcrypt.compare(
                        credentials.password,
                        user.password,
                    );

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.username,
                        image: user.avatar,
                    };
                } catch (error) {
                    console.error("Authorize Error:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            try {
                // Credentials users are already authenticated in authorize()
                if (account?.provider === "credentials") {
                    return true;
                }

                if (!account || !user.email) {
                    return false;
                }

                await dbConnect();

                const existingUser = await UserModel.findOne({
                    username: user.email,
                });

                // User already exists
                if (existingUser) {
                    return true;
                }

                // First Google/GitHub login
                const newUser = new UserModel({
                    username: user.email,
                    name: user.name,
                    provider: account.provider,
                });

                await newUser.save();

                return true;
            } catch (error) {
                console.error("SignIn Error:", error);
                return false;
            }
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }

            return session;
        },
    },
};
