"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    const profile = {
        name: "Kunal Sharma",
        designation: "Full Stack Developer",
        image: "/profile.jpeg", 
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            {/* Background */}
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute right-0 top-60 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />

            {/* Hero */}
            <section className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-24 lg:flex-row lg:justify-between">
                <div className="max-w-2xl">
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                        <Sparkles size={16} />
                        Meet the Developer
                    </span>

                    <h1 className="text-5xl font-black leading-tight sm:text-6xl">
                        {profile.name}
                    </h1>

                    <p className="mt-4 text-xl font-medium text-cyan-400">
                        {profile.designation}
                    </p>

                    <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
                        Passionate about building modern web applications that
                        solve real-world problems through clean design,
                        scalability, and intuitive user experiences.
                    </p>

                    <div className="mt-10">
                        <Button size="lg" className="rounded-full">
                            <Link href="/contact">
                                Contact Me
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 rounded-3xl bg-cyan-500/20 blur-3xl" />

                    <Image
                        src={profile.image}
                        alt={profile.name}
                        width={380}
                        height={480}
                        className="relative rounded-3xl border border-zinc-800 object-cover shadow-2xl"
                        priority
                    />
                </div>
            </section>

            {/* About SpendLens */}
            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
                    <h2 className="text-4xl font-bold">About SpendLens</h2>

                    <p className="mt-8 text-lg leading-8 text-zinc-400">
                        SpendLens is a subscription management platform designed
                        to help users organize, monitor, and optimize their
                        recurring expenses. Instead of losing track of multiple
                        subscriptions, SpendLens keeps everything in one
                        centralized dashboard.
                    </p>

                    <p className="mt-6 text-lg leading-8 text-zinc-400">
                        Whether it's streaming services, productivity tools,
                        cloud platforms, or memberships, the platform helps you
                        stay informed with renewal reminders, spending insights,
                        and an organized overview of all your active
                        subscriptions.
                    </p>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                            <h3 className="text-xl font-semibold text-cyan-400">
                                Subscription Tracking
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                Store and manage all your subscriptions in one
                                place.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                            <h3 className="text-xl font-semibold text-cyan-400">
                                Renewal Reminders
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                Never miss an upcoming payment with timely
                                reminders.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                            <h3 className="text-xl font-semibold text-cyan-400">
                                Spending Insights
                            </h3>

                            <p className="mt-3 text-zinc-400">
                                Understand your recurring expenses through a
                                clean dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="mx-auto max-w-5xl px-6 pb-24">
                <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 p-10 text-center">
                    <Mail className="mx-auto h-12 w-12 text-cyan-400" />

                    <h2 className="mt-6 text-4xl font-bold">Have Questions?</h2>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                        We'd love to hear from you. Whether you have feedback,
                        suggestions, or need assistance, our Contact page is the
                        best place to reach us.
                    </p>

                    <Button size="lg" className="mt-8 rounded-full">
                        <Link href="/contact">
                            Visit Contact Page
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}
