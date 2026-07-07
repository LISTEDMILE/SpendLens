import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="border-t border-zinc-800 bg-zinc-950">
    <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-white">
                    SpendLens
                </h2>

                <p className="mt-4 max-w-md leading-7 text-zinc-400">
                    SpendLens helps you organize subscriptions, track recurring
                    expenses, and receive timely renewal reminders—all from one
                    simple dashboard.
                </p>
            </div>

            {/* Navigation */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                    Navigation
                </h3>

                <div className="flex flex-col gap-3 text-zinc-400">
                    <Link href="/" className="transition hover:text-white">
                        Home
                    </Link>

                    <Link href="/about" className="transition hover:text-white">
                        About
                    </Link>

                    <Link
                        href="/subscriptions"
                        className="transition hover:text-white"
                    >
                        Dashboard
                    </Link>

                    <Link href="/help" className="transition hover:text-white">
                        Help
                    </Link>

                    <Link
                        href="/contact"
                        className="transition hover:text-white"
                    >
                        Contact
                    </Link>
                </div>
            </div>

            {/* Connect */}
            <div>
                <h3 className="mb-4 text-lg font-semibold text-white">
                    Connect
                </h3>

                <div className="flex gap-3">
                    <Link
                        href=""
                        target="_blank"
                        className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-cyan-500 hover:text-cyan-400"
                    >
                        <FaGithub className="h-5 w-5" />
                    </Link>

                    <Link
                        href=""
                        target="_blank"
                        className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-cyan-500 hover:text-cyan-400"
                    >
                        <FaLinkedin className="h-5 w-5" />
                    </Link>

                    <Link
                        href=""
                        className="rounded-lg border border-zinc-800 p-2 text-zinc-400 transition hover:border-cyan-500 hover:text-cyan-400"
                    >
                        <Mail className="h-5 w-5" />
                    </Link>
                </div>

                <p className="mt-5 text-sm text-zinc-500">
                    spendlens@email.com
                </p>
            </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-6 text-sm text-zinc-500 md:flex-row">
            <p>
                 {new Date().getFullYear()} SpendLens. 
            </p>

            <div className="flex gap-6">
                <Link
                    href=""
                    className="transition hover:text-white"
                >
                    Privacy Policy
                </Link>

                <Link
                    href=""
                    className="transition hover:text-white"
                >
                    Terms of Service
                </Link>
            </div>
        </div>
    </div>
</footer>
    )
}
