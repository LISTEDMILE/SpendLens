"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/dashboard"
                    className="text-2xl font-bold tracking-tight"
                >
                    <span className="text-primary">Spend</span>Lens
                </Link>

                {/* Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/subscriptions"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Subscriptions
                    </Link>

                    <Link
                        href="/analytics"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Analytics
                    </Link>

                    <Link
                        href="/profile"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Profile
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

                        <Avatar>
                            <AvatarImage src={session.user.image ?? ""} />
                            <AvatarFallback>
                                {session.user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

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
