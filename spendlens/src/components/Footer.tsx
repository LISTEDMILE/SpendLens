"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
                {/* Logo & Description */}
                <div className="space-y-2">
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tight"
                    >
                        <span className="text-primary">Spend</span>Lens
                    </Link>

                    <p className="max-w-sm text-sm text-muted-foreground">
                        Keep track of your subscriptions, monitor recurring
                        expenses, and never miss a renewal again.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap gap-8 text-sm">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Product</h3>

                        <div className="flex flex-col gap-1 text-muted-foreground">
                            <Link
                                href="/dashboard"
                                className="hover:text-foreground"
                            >
                                Dashboard
                            </Link>

                            <Link
                                href="/subscriptions"
                                className="hover:text-foreground"
                            >
                                Subscriptions
                            </Link>

                            <Link
                                href="/analytics"
                                className="hover:text-foreground"
                            >
                                Analytics
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Company</h3>

                        <div className="flex flex-col gap-1 text-muted-foreground">
                            <Link
                                href="/about"
                                className="hover:text-foreground"
                            >
                                About
                            </Link>

                            <Link
                                href="/contact"
                                className="hover:text-foreground"
                            >
                                Contact
                            </Link>

                            <Link
                                href="/support"
                                className="hover:text-foreground"
                            >
                                Support
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Legal</h3>

                        <div className="flex flex-col gap-1 text-muted-foreground">
                            <Link
                                href="/privacy"
                                className="hover:text-foreground"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms"
                                className="hover:text-foreground"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 text-sm text-muted-foreground md:flex-row">
                    <p>
                        © {new Date().getFullYear()} SpendLens. All rights
                        reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <p>Built with ❤️ using Next.js & shadcn/ui</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
