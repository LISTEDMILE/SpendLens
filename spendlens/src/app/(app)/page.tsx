"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Bell,
    CreditCard,
    Wallet,
    Sparkles,
    BarChart3,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const card1 = useRef<HTMLDivElement>(null);
    const card2 = useRef<HTMLDivElement>(null);
    const card3 = useRef<HTMLDivElement>(null);

    const statsRef = useRef<HTMLDivElement>(null);

    const featuresRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-line", {
                y: 80,
                opacity: 0,
                stagger: 0.12,
                duration: 1,
                ease: "power4.out",
            });

            gsap.from(".hero-text", {
                opacity: 0,
                y: 20,
                delay: 0.5,
                duration: 1,
            });

            gsap.from(".hero-btn", {
                opacity: 0,
                y: 20,
                delay: 0.7,
                duration: 0.8,
            });

            gsap.to(card1.current, {
                y: -20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(card2.current, {
                y: 20,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.to(card3.current, {
                y: -30,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            gsap.from(".stat", {
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 50,
                stagger: 0.15,
            });

            gsap.from(".feature", {
                scrollTrigger: {
                    trigger: featuresRef.current,
                    start: "top 75%",
                },
                opacity: 0,
                x: -80,
                stagger: 0.25,
                duration: 1,
            });

            gsap.to(".blob1", {
                x: 150,
                y: -100,
                duration: 12,
                repeat: -1,
                yoyo: true,
                ease: "none",
            });

            gsap.to(".blob2", {
                x: -120,
                y: 120,
                duration: 15,
                repeat: -1,
                yoyo: true,
                ease: "none",
            });

            gsap.to(".blob3", {
                x: 100,
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "none",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <main className="overflow-hidden bg-black text-white">
            <div className="blob1 fixed left-[-250px] top-[-150px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" />
            <div className="blob2 fixed right-[-200px] top-[250px] h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[150px]" />
            <div className="blob3 fixed bottom-[-200px] left-1/2 h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[170px]" />
            {/* HERO */}
            <section
                ref={heroRef}
                className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8"
            >
                <div ref={headingRef} className="flex max-w-2xl flex-col">
                    <span className="hero-text mb-6 flex w-fit items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-5 py-2 text-sm">
                        <Sparkles size={16} />
                        Smart Subscription Tracking
                    </span>

                    <h1 className="flex flex-col text-7xl font-black leading-none tracking-tight">
                        <span className="hero-line">Never</span>

                        <span className="hero-line">Forget</span>

                        <span className="hero-line text-cyan-400">
                            A Renewal.
                        </span>
                    </h1>

                    <p className="hero-text mt-8 max-w-xl text-lg leading-8 text-zinc-400">
                        Track every subscription, monitor your monthly expenses,
                        receive renewal reminders, and finally stop paying for
                        services you've forgotten about.
                    </p>

                    <div className="hero-btn mt-10 flex gap-5">
                        <Button
                            size="lg"
                            className="h-14 rounded-full px-8 text-base"
                        >
                            <Link href="/login">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="relative flex w-[500px] flex-col items-center justify-center">
                    <div
                        ref={card1}
                        className="absolute left-0 top-0 flex w-72 flex-col rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <CreditCard />
                            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                                Active
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold">Netflix</h2>

                        <p className="mt-2 text-zinc-400">₹649 / month</p>

                        <div className="mt-6 flex items-center gap-2 text-sm text-cyan-400">
                            <Bell size={16} />
                            Tomorrow
                        </div>
                    </div>

                    <div
                        ref={card2}
                        className="absolute right-0 top-48 flex w-72 flex-col rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <Wallet />
                            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
                                Paid
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold">Spotify</h2>

                        <p className="mt-2 text-zinc-400">₹119 / month</p>

                        <div className="mt-6 flex items-center gap-2 text-sm text-green-400">
                            Auto Debit Enabled
                        </div>
                    </div>

                    <div
                        ref={card3}
                        className="absolute right-10 bottom-[-160px] flex w-72 flex-col rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <BarChart3 />
                            <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-400">
                                Analytics
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold">Monthly Spend</h2>

                        <p className="mt-3 text-5xl font-black text-cyan-400">
                            ₹4,259
                        </p>

                        <p className="mt-4 text-sm text-zinc-400">
                            +12% this month
                        </p>
                    </div>
                </div>
            </section>{" "}
            {/* STATS */}
            <section
                ref={statsRef}
                className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-8 py-28"
            >
                <h2 className="text-center text-4xl font-bold">
                    Thousands of renewals tracked.
                </h2>

                <div className="flex w-full items-center justify-center gap-10">
                    <div className="stat flex w-72 flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
                        <span className="text-6xl font-black text-cyan-400">
                            --
                        </span>

                        <span className="mt-4 text-zinc-400">
                            Active subscriptions managed
                        </span>
                    </div>

                    <div className="stat flex w-72 flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
                        <span className="text-6xl font-black text-violet-400">
                            --
                        </span>

                        <span className="mt-4 text-zinc-400">
                            Expenses tracked
                        </span>
                    </div>

                    <div className="stat flex w-72 flex-col rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
                        <span className="text-6xl font-black text-blue-400">
                            --
                        </span>

                        <span className="mt-4 text-zinc-400">
                            Renewal reminders delivered
                        </span>
                    </div>
                </div>
            </section>
            {/* FEATURES */}
            <section
                ref={featuresRef}
                className="mx-auto flex max-w-7xl flex-col gap-40 px-8 py-20"
            >
                {/* Feature 1 */}

                <div className="feature flex items-center justify-between gap-20">
                    <div className="flex w-[520px] flex-col">
                        <span className="mb-5 text-cyan-400">
                            SMART REMINDERS
                        </span>

                        <h2 className="text-5xl font-black leading-tight">
                            Never miss
                            <br />
                            another renewal.
                        </h2>

                        <p className="mt-8 text-lg leading-8 text-zinc-400">
                            SpendLens automatically reminds you before your
                            subscriptions renew so you always stay in control of
                            your money.
                        </p>
                    </div>

                    <div className="flex w-[500px] flex-col rounded-[35px] border border-zinc-800 bg-zinc-950 p-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                                Upcoming Renewals
                            </h3>

                            <Bell className="text-cyan-400" />
                        </div>

                        <div className="mt-10 flex flex-col gap-5">
                            <div className="flex items-center justify-between rounded-2xl bg-zinc-900 p-5">
                                <div>
                                    <p className="font-semibold">Netflix</p>

                                    <p className="text-sm text-zinc-500">
                                        Tomorrow
                                    </p>
                                </div>

                                <span className="text-cyan-400">₹649</span>
                            </div>

                            <div className="flex items-center justify-between rounded-2xl bg-zinc-900 p-5">
                                <div>
                                    <p className="font-semibold">Spotify</p>

                                    <p className="text-sm text-zinc-500">
                                        3 Days
                                    </p>
                                </div>

                                <span className="text-cyan-400">₹119</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature 2 */}

                <div className="feature flex flex-row-reverse items-center justify-between gap-20">
                    <div className="flex w-[520px] flex-col">
                        <span className="mb-5 text-violet-400">ANALYTICS</span>

                        <h2 className="text-5xl font-black leading-tight">
                            Understand
                            <br />
                            where your
                            <br />
                            money goes.
                        </h2>

                        <p className="mt-8 text-lg leading-8 text-zinc-400">
                            Visualize recurring expenses, spending trends and
                            monthly subscription costs with beautiful analytics.
                        </p>
                    </div>

                    <div className="flex w-[520px] flex-col rounded-[35px] border border-zinc-800 bg-zinc-950 p-10">
                        <div className="flex h-60 items-end justify-between">
                            <div className="h-24 w-10 rounded-full bg-cyan-500" />

                            <div className="h-40 w-10 rounded-full bg-cyan-500" />

                            <div className="h-56 w-10 rounded-full bg-cyan-500" />

                            <div className="h-44 w-10 rounded-full bg-cyan-500" />

                            <div className="h-36 w-10 rounded-full bg-cyan-500" />

                            <div className="h-52 w-10 rounded-full bg-cyan-500" />
                        </div>

                        <p className="mt-10 text-center text-zinc-500">
                            Monthly spending trend
                        </p>
                    </div>
                </div>

                {/* Feature 3 */}

                <div className="feature flex items-center justify-between gap-20">
                    <div className="flex w-[520px] flex-col">
                        <span className="mb-5 text-blue-400">
                            EVERYTHING IN ONE PLACE
                        </span>

                        <h2 className="text-5xl font-black leading-tight">
                            Every subscription.
                            <br />
                            One dashboard.
                        </h2>

                        <p className="mt-8 text-lg leading-8 text-zinc-400">
                            Netflix, Prime, Spotify, ChatGPT, Adobe, Apple,
                            Microsoft... manage everything from a single elegant
                            dashboard.
                        </p>
                    </div>

                    <div className="flex w-[520px] flex-col gap-5 rounded-[35px] border border-zinc-800 bg-zinc-950 p-8">
                        {[
                            "Netflix",
                            "Spotify",
                            "Prime Video",
                            "ChatGPT Plus",
                            "Adobe",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center justify-between rounded-2xl bg-zinc-900 p-5"
                            >
                                <span>{item}</span>

                                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                                    Active
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>{" "}
            {/* ANALYTICS SHOWCASE */}
            <section className="mx-auto flex max-w-7xl flex-col items-center px-8 py-32">
                <span className="mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-400">
                    BEAUTIFUL ANALYTICS
                </span>

                <h2 className="max-w-4xl text-center text-6xl font-black leading-tight">
                    Know exactly
                    <span className="text-cyan-400"> where every rupee </span>
                    goes every month.
                </h2>

                <p className="mt-8 max-w-3xl text-center text-xl leading-9 text-zinc-400">
                    Powerful insights that help you reduce unnecessary
                    subscriptions and understand your recurring expenses.
                </p>

                <div className="mt-20 flex w-full items-center justify-center">
                    <div className="flex w-full max-w-6xl rounded-[40px] border border-zinc-800 bg-zinc-950/80 p-10 backdrop-blur-xl">
                        <div className="flex w-full flex-col gap-10">
                            <div className="flex justify-between">
                                <div className="flex flex-col">
                                    <span className="text-zinc-500">
                                        Monthly Spend
                                    </span>

                                    <span className="mt-2 text-6xl font-black text-cyan-400">
                                        ₹4,259
                                    </span>
                                </div>

                                <div className="flex flex-col text-right">
                                    <span className="text-zinc-500">
                                        Active Plans
                                    </span>

                                    <span className="mt-2 text-6xl font-black">
                                        12
                                    </span>
                                </div>
                            </div>

                            <div className="mt-12 flex h-72 items-end justify-between rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8">
                                {[
                                    { month: "Jan", value: 35 },
                                    { month: "Feb", value: 55 },
                                    { month: "Mar", value: 80 },
                                    { month: "Apr", value: 62 },
                                    { month: "May", value: 45 },
                                    { month: "Jun", value: 70 },
                                    { month: "Jul", value: 90 },
                                ].map((item) => (
                                    <div
                                        key={item.month}
                                        className="flex flex-col items-center gap-3"
                                    >
                                        <span className="text-sm font-medium text-cyan-400">
                                            ₹{item.value * 50}
                                        </span>

                                        <div className="flex h-52 items-end">
                                            <div
                                                style={{
                                                    height: `${item.value}%`,
                                                }}
                                                className="analytics-bar w-10 rounded-full bg-gradient-to-t from-cyan-500 via-blue-500 to-violet-500 shadow-[0_0_25px_rgba(34,211,238,.35)] transition-all duration-300 hover:scale-110"
                                            />
                                        </div>

                                        <span className="text-xs text-zinc-500">
                                            {item.month}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* TIMELINE */}
            <section className="mx-auto flex max-w-6xl flex-col items-center px-8 py-32">
                <h2 className="text-center text-6xl font-black">
                    Your subscription
                    <span className="text-violet-400"> journey.</span>
                </h2>

                <div className="mt-24 flex w-full flex-col gap-12">
                    {[
                        {
                            title: "Add Subscription",
                            text: "Track every service in less than a minute.",
                        },
                        {
                            title: "Receive Reminders",
                            text: "Get notified before auto-renewals happen.",
                        },
                        {
                            title: "Monitor Spending",
                            text: "Understand where your money is going.",
                        },
                        {
                            title: "Save More",
                            text: "Cancel subscriptions you don't need.",
                        },
                    ].map((step, index) => (
                        <div
                            key={step.title}
                            className="flex items-center gap-10"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-2xl font-bold text-black">
                                {index + 1}
                            </div>

                            <div className="flex flex-col">
                                <h3 className="text-3xl font-bold">
                                    {step.title}
                                </h3>

                                <p className="mt-2 text-zinc-400">
                                    {step.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* CTA */}
            <section className="mx-auto flex max-w-7xl flex-col items-center px-8 py-40">
                <div className="relative flex w-full flex-col items-center overflow-hidden rounded-[50px] border border-zinc-800 bg-zinc-950 p-24">
                    <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

                    <h2 className="relative max-w-4xl text-center text-7xl font-black leading-tight">
                        Stop wasting money
                        <br />
                        on forgotten
                        <span className="text-cyan-400"> subscriptions.</span>
                    </h2>

                    <p className="relative mt-8 max-w-2xl text-center text-xl leading-9 text-zinc-400">
                        Join thousands of users taking control of recurring
                        payments with SpendLens.
                    </p>

                    <div className="relative mt-12 flex gap-6">
                        <Button
                            size="lg"
                            className="h-16 rounded-full px-10 text-lg"
                        >
                            <Link href="/login">
                                Start For Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
