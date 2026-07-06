"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md bg-white">
            <div className="w-[30%] z-[-10] h-full absolute top-0 left-0 bg-gradient-to-r from-cyan-400 to-transparent"></div>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}

                <Link href="/" className="flex items-center gap-3">
                    {/* <img
                        src={"/logo.png"}
                        alt="SpendLens Logo"
                        width={44}
                        height={44}
                        className="rounded-lg"
                    /> */}

                    <span className="text-2xl font-bold tracking-tight">
                        <span className="text-primary">Spend</span>Lens
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    {/* <Link
                        href="/dashboard"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link> */}

                    <Link
                        href="/"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Home
                    </Link>

                    <Link
                        href="/subscriptions"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Subscriptions
                    </Link>

                    <Link
                        href="/addSubscription"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Add Subscription
                    </Link>
                </nav>

                {/* Right Section */}
                {session ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden text-right md:block">
                            <p className="text-sm font-semibold">
                                {session.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {session.user.email}
                            </p>
                        </div>

                        <Link href={"updateProfile"}>
                            <Avatar>
                                <AvatarImage
                                    src={
                                        session.user.image ??
                                        "/default-avatar.png"
                                    }
                                />
                                <AvatarFallback>
                                    {session.user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </Link>

                        <Button
                            variant="outline"
                            onClick={() =>
                                signOut({
                                    callbackUrl: "/login",
                                })
                            }
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button>
                        <Link href="/login">Login</Link>
                    </Button>
                )}
            </div>
        </header>
    );
}
