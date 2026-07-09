"use client";

import { useEffect, useRef, useState } from "react";
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
    CheckCircle2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const card1 = useRef<HTMLDivElement>(null);
    const card2 = useRef<HTMLDivElement>(null);
    const card3 = useRef<HTMLDivElement>(null);

    const statsRef = useRef<HTMLDivElement>(null);

    const featuresRef = useRef<HTMLDivElement>(null);

    const { data: session } = useSession();

    const [count, setCount] = useState(0);

const [subscriptions, setSubscriptions] = useState<
    {
        id: string;
        name: string;
        price: number;
        endDate: string;
        daysLeft: string;
    }[]
>([]);

const [loadingReminder, setLoadingReminder] = useState(true);


const fetchUpcomingRenewals = async () => {
    try {
        setLoadingReminder(true);

        const response = await fetch("/api/alerts");

        const data = await response.json();

        if (!response.ok) {
            toast.error(data.message || "Failed to load upcoming renewals.");
            return;
        }

        setCount(data.data.count);
        setSubscriptions(data.data.subscriptions);
    } catch (error) {
        console.error(error);

        toast.error("Something went wrong while loading reminders.");
    } finally {
        setLoadingReminder(false);
    }
};

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

    useEffect(() => {
    if (!session) return;

    fetchUpcomingRenewals();
}, [session]);

    return (
        <main className="overflow-hidden bg-black text-white">
            {/* Background */}
            <div className="blob1 fixed -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-[120px] lg:-left-40 lg:-top-40 lg:h-[420px] lg:w-[420px]" />

            <div className="blob2 fixed -right-24 top-1/3 h-72 w-72 rounded-full bg-violet-500/20 blur-[140px] lg:h-[450px] lg:w-[450px]" />

            <div className="blob3 fixed bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[150px] lg:h-[420px] lg:w-[420px]" />

            {/* ================= HERO ================= */}

            <section
                ref={heroRef}
                className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center gap-16 px-6 py-24 sm:py-0 lg:flex-row lg:items-center lg:justify-between lg:px-8"
            >
                {/* LEFT */}

                <div ref={headingRef} className="z-10 flex max-w-2xl flex-col">
                    <span className="hero-text mb-6 flex w-fit items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-medium text-cyan-300 sm:text-sm">
                        <Sparkles size={15} />
                        Smart Subscription Tracking
                    </span>

                    <h1 className="flex flex-col font-black leading-none tracking-tight">
                        <span className="hero-line text-5xl sm:text-6xl lg:text-7xl">
                            Never
                        </span>

                        <span className="hero-line text-5xl sm:text-6xl lg:text-7xl">
                            Forget
                        </span>

                        <span className="hero-line text-5xl text-cyan-400 sm:text-6xl lg:text-7xl">
                            A Renewal.
                        </span>
                    </h1>

                    <p className="hero-text mt-8 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
                        Track every subscription, receive renewal reminders,
                        monitor monthly expenses and stop paying for services
                        you've forgotten.
                    </p>

                    <div className="hero-btn mt-10 flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" className="h-14 rounded-full px-8">
                            <Link
                                href={`${session ? "/subscriptions" : "/login"}`}
                                className="flex items-center"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* RIGHT */}

                <div className="relative flex w-full max-w-md flex-col gap-5 lg:h-[650px] lg:max-w-xl">
                    {/* CARD 1 */}

                    <div
                        ref={card1}
                        className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl lg:absolute lg:left-0 lg:top-0 lg:w-72"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <CreditCard />

                            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                                Active
                            </span>
                        </div>

                        <h2 className="text-xl font-bold">Netflix</h2>

                        <p className="mt-2 text-zinc-400">₹649 / month</p>

                        <div className="mt-5 flex items-center gap-2 text-sm text-cyan-400">
                            <Bell size={15} />
                            Tomorrow
                        </div>
                    </div>

                    {/* CARD 2 */}

                    <div
                        ref={card2}
                        className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl lg:absolute lg:right-0 lg:top-44 lg:w-72"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <Wallet />

                            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
                                Paid
                            </span>
                        </div>

                        <h2 className="text-xl font-bold">Spotify</h2>

                        <p className="mt-2 text-zinc-400">₹119 / month</p>

                        <div className="mt-5 text-sm text-green-400">
                            Auto Debit Enabled
                        </div>
                    </div>

                    {/* CARD 3 */}

                    <div
                        ref={card3}
                        className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl lg:absolute lg:bottom-0 lg:right-8 lg:w-72"
                    >
                        <div className="mb-5 flex items-center justify-between">
                            <BarChart3 />

                            <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-400">
                                Analytics
                            </span>
                        </div>

                        <h2 className="text-xl font-bold">Monthly Spend</h2>

                        <p className="mt-3 text-4xl font-black text-cyan-400">
                            ₹4,259
                        </p>

                        <p className="mt-3 text-sm text-zinc-400">
                            +12% this month
                        </p>
                    </div>
                </div>
            </section>

            {/* =================== Alert ==================*/}

          
            
            {session && loadingReminder && (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-black">
            <div className="flex flex-col gap-10 p-8 lg:flex-row lg:items-center lg:justify-between">
                {/* Left */}
                <div className="max-w-2xl space-y-5">
                    <Skeleton className="h-8 w-44 rounded-full" />

                    <Skeleton className="h-12 w-[420px] max-w-full rounded-xl" />

                    <Skeleton className="h-5 w-full max-w-lg" />

                    <Skeleton className="h-5 w-80 max-w-full" />

                    <Skeleton className="mt-3 h-11 w-52 rounded-xl" />
                </div>

                {/* Right */}
                <div className="w-full max-w-md space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-3">
                                    <Skeleton className="h-5 w-32" />

                                    <Skeleton className="h-4 w-28" />
                                </div>

                                <div className="space-y-3">
                                    <Skeleton className="ml-auto h-5 w-16" />

                                    <Skeleton className="ml-auto h-6 w-20 rounded-full" />
                                </div>
                            </div>

                            <Skeleton className="mt-5 h-9 w-full rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
)}
            
              {session && !loadingReminder && count === 0 && (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-black">
            <div className="flex flex-col items-center text-center p-10">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </div>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
                    Everything Looks Good
                </span>

                <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                    You're all caught up 🎉
                </h2>

                <p className="mt-4 max-w-2xl text-zinc-400">
                    None of your subscriptions are due for renewal right now.
                    We'll remind you automatically when it's time.
                </p>
  <Link href="/dashboard" className="mt-12  inline-block rounded-lg bg-amber-500 px-6 py-3 text-black hover:bg-amber-400"
                >
                
                   
                        View Dashboard
                   
                               
                                 </Link>
            </div>
        </div>
    </section>
            )}
            
         { session && !loadingReminder  && count!==0 && <section className="mx-auto w-full max-w-7xl px-6 py-16">
    <div className="overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-black">
        <div className="flex flex-col gap-10 p-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div className="max-w-2xl">
                <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-300">
                    ⚠ Upcoming Renewals
                </span>

                <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {count === 1
                        ? `${subscriptions[0].name} renews soon`
                        : `${count} subscriptions require your attention`}
                </h2>

                <p className="mt-4 max-w-xl text-zinc-400">
                    {count === 1
                        ? "Review this subscription before its renewal date to avoid an unexpected charge."
                        : "Some of your subscriptions are approaching renewal. Review them now and stay in control of your recurring expenses."}
                </p>

                            <Link href="/dashboard" className="mt-12  inline-block rounded-lg bg-amber-500 px-6 py-3 text-black hover:bg-amber-400">
               
                   
                        View Dashboard
                    </Link>
                
            </div>

            {/* Right */}
            <div className="w-full max-w-md space-y-4">
                {subscriptions.map((subscription) => (
                    <Link 
                        href={`subscriptions/subscription/${subscription.id}`}
                        key={subscription.id}
                        className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur"
                    >
                        <div>
                            <h3 className="font-semibold text-white">
                                {subscription.name}
                            </h3>

                            <p className="mt-1 text-sm text-zinc-500">
                                Renews{" "}
                                {new Date(
                                    subscription.endDate,
                                ).toLocaleDateString()}
                            </p>

                            <p className="mt-4 text-sm hover:underline text-yellow-600"> View</p>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold text-white">
                                ₹{subscription.price}
                            </p>

                            <span className="mt-2 inline-block rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300">
                                {subscription.daysLeft} {" days left"}
                            </span>
                        </div>
                    </Link>
                ))}

                {count > 3 && (
                    <p className="text-center text-sm text-zinc-500">
                        +{count - 3} more subscription{count - 3 > 1 ? "s" : ""}
                    </p>
                )}
            </div>
        </div>
    </div>
</section>}

            {/* ================= STATS ================= */}

            <section
                ref={statsRef}
                className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28"
            >
                <h2 className="text-center text-3xl font-bold sm:text-4xl">
                    Thousands of renewals tracked.
                </h2>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="stat rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
                        <span className="text-5xl font-black text-cyan-400">
                            --
                        </span>

                        <p className="mt-4 text-zinc-400">
                            Active subscriptions managed
                        </p>
                    </div>

                    <div className="stat rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
                        <span className="text-5xl font-black text-violet-400">
                            --
                        </span>

                        <p className="mt-4 text-zinc-400">Expenses tracked</p>
                    </div>

                    <div className="stat rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:col-span-2 lg:col-span-1">
                        <span className="text-5xl font-black text-blue-400">
                            --
                        </span>

                        <p className="mt-4 text-zinc-400">
                            Renewal reminders delivered
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= FEATURES ================= */}

            <section
                ref={featuresRef}
                className="mx-auto flex max-w-7xl flex-col gap-24 px-6 py-20 lg:gap-32 lg:px-8"
            >
                {/* Feature 1 */}

                <div className="feature grid items-center gap-12 lg:grid-cols-2">
                    <div className="max-w-xl">
                        <span className="mb-8 sm:mb-4 inline-block text-sm font-semibold tracking-widest text-cyan-400 w-full sm:w-fit text-center sm:text-left">
                            SMART REMINDERS
                        </span>

                        <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                            Never miss
                            <br />
                            another renewal.
                        </h2>

                        <p className="mt-6 text-base leading-8 text-zinc-400 sm:text-lg">
                            SpendLens reminds you before subscriptions renew,
                            helping you avoid unwanted charges and giving you
                            complete control over recurring payments.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                                Upcoming Renewals
                            </h3>

                            <Bell className="text-cyan-400" />
                        </div>

                        <div className="mt-8 space-y-4">
                            {[
                                {
                                    name: "Netflix",
                                    date: "Tomorrow",
                                    price: "₹649",
                                },
                                {
                                    name: "Spotify",
                                    date: "3 Days",
                                    price: "₹119",
                                },
                                {
                                    name: "Prime Video",
                                    date: "Next Week",
                                    price: "₹299",
                                },
                            ].map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between rounded-2xl bg-zinc-900 p-4"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {item.name}
                                        </p>

                                        <p className="text-sm text-zinc-500">
                                            {item.date}
                                        </p>
                                    </div>

                                    <span className="font-semibold text-cyan-400">
                                        {item.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feature 2 */}

                <div className="feature grid items-center gap-12 lg:grid-cols-2">
                    <div className="flex w-full sm:w-[520px] flex-col rounded-[35px] border border-zinc-800 bg-zinc-950 p-10">
                        <div className="flex h-60 items-end justify-between w-full overflow-hidden">
                            <div className="h-24 w-3 sm:w-10 rounded-full bg-cyan-500" />
                            <div className="h-40 w-3 sm:w-10 rounded-full bg-cyan-500" />

                            <div className="h-56 w-3 sm:w-10 rounded-full bg-cyan-500" />

                            <div className="h-44 w-3 sm:w-10 rounded-full bg-cyan-500" />

                            <div className="h-36 w-3 sm:w-10 rounded-full bg-cyan-500" />

                            <div className="h-52 w-3 sm:w-10 rounded-full bg-cyan-500" />
                        </div>

                        <p className="mt-10 text-center text-zinc-500">
                            Monthly spending trend
                        </p>
                    </div>

                    <div className="order-1 max-w-xl lg:order-2">
                        <span className="mb-8 sm:mb-4 w-full sm:w-fit text-center sm:text-left inline-block text-sm font-semibold tracking-widest text-violet-400">
                            ANALYTICS
                        </span>

                        <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                            Understand
                            <br />
                            where your
                            <br />
                            money goes.
                        </h2>

                        <p className="mt-6 text-base leading-8 text-zinc-400 sm:text-lg">
                            Visualize recurring expenses, identify spending
                            patterns and understand exactly how much you're
                            paying every month.
                        </p>
                    </div>
                </div>

                {/* Feature 3 */}

                <div className="feature grid items-center gap-12 lg:grid-cols-2">
                    <div className="max-w-xl">
                        <span className="mb-8 sm:mb-4 w-full sm:w-fit text-center sm:text-left inline-block text-sm font-semibold tracking-widest text-blue-400">
                            EVERYTHING IN ONE PLACE
                        </span>

                        <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                            Every subscription.
                            <br />
                            One dashboard.
                        </h2>

                        <p className="mt-6 text-base leading-8 text-zinc-400 sm:text-lg">
                            Keep Netflix, Spotify, ChatGPT, Prime, Adobe,
                            Microsoft and every recurring subscription organized
                            in one beautiful dashboard.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
                        <div className="space-y-4">
                            {[
                                "Netflix",
                                "Spotify",
                                "Prime Video",
                                "ChatGPT Plus",
                                "Adobe Creative Cloud",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between rounded-2xl bg-zinc-900 p-4"
                                >
                                    <span className="font-medium">{item}</span>

                                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                                        Active
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= ANALYTICS ================= */}

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
                <div className="flex flex-col items-center text-center">
                    <span className="mb-5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold tracking-wider text-cyan-400">
                        BEAUTIFUL ANALYTICS
                    </span>

                    <h2 className="max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        Know exactly
                        <span className="text-cyan-400">
                            {" "}
                            where every rupee{" "}
                        </span>
                        goes every month.
                    </h2>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
                        Gain powerful insights into your recurring expenses and
                        discover opportunities to reduce unnecessary spending.
                    </p>
                </div>

                <div className="mt-16 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 lg:p-10">
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div>
                            <p className="text-sm text-zinc-500">
                                Monthly Spend
                            </p>

                            <h3 className="mt-2 text-5xl font-black text-cyan-400">
                                ₹4,259
                            </h3>
                        </div>

                        <div className="text-left lg:text-right">
                            <p className="text-sm text-zinc-500">
                                Active Plans
                            </p>

                            <h3 className="mt-2 text-5xl font-black">12</h3>
                        </div>
                    </div>

                    <div className="mt-14 flex h-64 items-end justify-between gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">
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
                                className="flex flex-1 flex-col items-center justify-end gap-3"
                            >
                                <span className="hidden text-xs text-cyan-400 sm:block">
                                    ₹{item.value * 50}
                                </span>

                                <div className="flex h-44 items-end">
                                    <div
                                        style={{
                                            height: `${item.value}%`,
                                        }}
                                        className="analytics-bar w-5 rounded-full bg-gradient-to-t from-cyan-500 via-blue-500 to-violet-500 transition-all duration-300 hover:scale-110 sm:w-8 lg:w-10"
                                    />
                                </div>

                                <span className="text-xs text-zinc-500">
                                    {item.month}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= TIMELINE ================= */}

            <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-32">
                <div className="text-center">
                    <h2 className="text-4xl font-black sm:text-5xl lg:text-6xl">
                        Your subscription
                        <span className="text-violet-400"> journey.</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                        SpendLens helps you stay on top of every recurring
                        payment in just a few simple steps.
                    </p>
                </div>

                <div className="relative mt-16">
                    <div className="absolute left-6 top-0 hidden h-full w-px bg-zinc-800 md:block" />

                    <div className="space-y-10">
                        {[
                            {
                                title: "Add Subscription",
                                text: "Add Netflix, Spotify, Prime, ChatGPT or any recurring service.",
                            },
                            {
                                title: "Receive Smart Reminders",
                                text: "Get notified before every renewal so you stay in control.",
                            },
                            {
                                title: "Track Monthly Spending",
                                text: "Visualize your recurring expenses with simple analytics.",
                            },
                            {
                                title: "Save More Money",
                                text: "Cancel subscriptions you no longer use and reduce waste.",
                            },
                        ].map((step, index) => (
                            <div
                                key={step.title}
                                className="relative flex gap-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-black lg:h-14 lg:w-14">
                                    {index + 1}
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold lg:text-2xl">
                                        {step.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-zinc-400 sm:text-base">
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CTA ================= */}

            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-32">
                <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 px-8 py-16 text-center lg:px-16 lg:py-24">
                    {/* Background Glow */}

                    <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

                    <div className="relative z-10">
                        <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold tracking-wider text-cyan-400">
                            START TODAY
                        </span>

                        <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl text-left sm:text-center">
                            Stop paying for
                            <span className="text-cyan-400">
                                {" "}
                                forgotten subscriptions
                            </span>
                        </h2>

                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                            Keep every recurring payment organized, receive
                            timely renewal reminders, and gain complete
                            visibility into your monthly spending—all from one
                            simple dashboard.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="h-14 w-full rounded-full px-8 sm:w-auto"
                            >
                                <Link
                                    href={`${session ? "/subscriptions" : "/login"}`}
                                    className="flex items-center"
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            {!session && (
                                <Link href="/signUp">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-14 w-full rounded-lg px-8 py-4 border-zinc-700 bg-transparent text-white hover:bg-zinc-900 sm:w-auto"
                                    >
                                        Create Account
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
