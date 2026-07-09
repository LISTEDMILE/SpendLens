"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import {
    CheckCircle2,
    Clock3,
    CreditCard,
    PauseCircle,
    Ban,
    IndianRupee,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { toast } from "sonner";

interface DashboardStats {
    total: number;
    active: number;
    paused: number;
    cancelled: number;
    monthlySpend: number;
}

interface ReminderSubscription {
    id: string;
    name: string;
    price: number;
    endDate: string;
    daysLeft: number;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState<DashboardStats>({
        total: 0,
        active: 0,
        paused: 0,
        cancelled: 0,
        monthlySpend: 0,
    });

    const [count, setCount] = useState(0);

    const [subscriptions, setSubscriptions] = useState<ReminderSubscription[]>(
        [],
    );

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/dashboard");

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setStats(data.data.stats);

            setCount(data.data.reminders.count);

            setSubscriptions(data.data.reminders.subscriptions);
        } catch (error: any) {
            toast.error(error.message || "Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchDashboard();
        }
    }, [status]);

    if (status === "loading") {
        return <div className="min-h-screen bg-black" />;
    }

    if (!session) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Please login to continue.
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white">
            {/* HERO */}

            <section className="mx-auto max-w-7xl px-6 pt-12">
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
                    Dashboard
                </span>

                <h1 className="mt-5 text-5xl font-black tracking-tight">
                    Welcome back,
                    <span className="text-cyan-400">
                        {" "}
                        {session.user.name?.split(" ")[0]}
                    </span>
                </h1>

                <p className="mt-4 max-w-2xl text-lg text-zinc-400">
                    Here's a quick overview of your subscriptions and upcoming
                    renewals.
                </p>
            </section>

            {/* STATS */}

            <section className="mx-auto mt-10 grid max-w-7xl gap-6 px-6 sm:grid-cols-2 xl:grid-cols-5">
                {loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                          <Card
                              key={index}
                              className="border-zinc-800 bg-zinc-950 p-6"
                          >
                              <Skeleton className="h-6 w-6" />

                              <Skeleton className="mt-5 h-10 w-16" />

                              <Skeleton className="mt-3 h-4 w-24" />
                          </Card>
                      ))
                    : [
                          {
                              title: "Active",
                              value: stats.active,
                              icon: CreditCard,
                              color: "text-green-400",
                          },
                          {
                              title: "Total",
                              value: stats.total,
                              icon: Clock3,
                              color: "text-cyan-400",
                          },
                          {
                              title: "Paused",
                              value: stats.paused,
                              icon: PauseCircle,
                              color: "text-yellow-400",
                          },
                          {
                              title: "Cancelled",
                              value: stats.cancelled,
                              icon: Ban,
                              color: "text-red-400",
                          },
                          {
                              title: "Monthly Spend",
                              value: `₹${stats.monthlySpend}`,
                              icon: IndianRupee,
                              color: "text-violet-400",
                          },
                      ].map((item) => (
                          <Card
                              key={item.title}
                              className="group border-zinc-800 bg-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30"
                          >
                              <div className="flex items-center justify-between">
                                  <item.icon
                                      className={`h-6 w-6 ${item.color}`}
                                  />

                                  <span className="text-xs uppercase tracking-wider text-zinc-500">
                                      {item.title}
                                  </span>
                              </div>

                              <h2 className="mt-8 text-4xl font-black">
                                  {item.value}
                              </h2>

                              <p className="mt-3 text-sm text-zinc-500">
                                  {item.title === "Monthly Spend"
                                      ? "Recurring monthly payments"
                                      : `${item.title} subscriptions`}
                              </p>
                          </Card>
                      ))}
            </section>

            {/* UPCOMING RENEWALS */}

            {loading && (
                <section className="mx-auto mt-16 w-full max-w-7xl px-6">
                    <div className="overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-black">
                        <div className="flex flex-col gap-10 p-8 lg:flex-row lg:justify-between">
                            <div className="max-w-2xl space-y-5">
                                <Skeleton className="h-8 w-44 rounded-full" />
                                <Skeleton className="h-12 w-96 max-w-full" />
                                <Skeleton className="h-5 w-full max-w-lg" />
                                <Skeleton className="h-5 w-80" />
                                <Skeleton className="h-11 w-48 rounded-xl" />
                            </div>

                            <div className="w-full max-w-md space-y-4">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5"
                                    >
                                        <Skeleton className="h-5 w-28" />
                                        <Skeleton className="mt-3 h-4 w-20" />
                                        <Skeleton className="mt-5 h-9 w-full rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {!loading && count === 0 && (
                <section className="mx-auto mt-16 w-full max-w-7xl px-6">
                    <div className="overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-black">
                        <div className="flex flex-col items-center p-10 text-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
                                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                            </div>

                            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
                                Everything Looks Good
                            </span>

                            <h2 className="mt-5 text-4xl font-bold">
                                You're all caught up 🎉
                            </h2>

                            <p className="mt-4 max-w-2xl text-zinc-400">
                                None of your subscriptions are due for renewal.
                                We'll remind you automatically when it's time.
                            </p>

                            <Link
                                href="/subscriptions"
                                className="mt-12  inline-block rounded-lg bg-amber-500 px-6 py-3 text-black hover:bg-amber-400"
                            >
                                View Subscriptions
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {!loading && count > 0 && (
                <section className="mx-auto mt-16 w-full max-w-7xl px-6">
                    <div className="overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-zinc-900 to-black">
                        <div className="flex flex-col gap-10 p-8 lg:flex-row lg:items-start lg:justify-between">
                            <div className="max-w-2xl mt-">
                                <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-300">
                                    ⚠ Upcoming Renewals
                                </span>

                                <h2 className="mt-5 text-4xl font-bold">
                                    {count === 1
                                        ? `${subscriptions[0].name} renews ${
                                              subscriptions[0].daysLeft === 0
                                                  ? "today"
                                                  : subscriptions[0]
                                                          .daysLeft === 1
                                                    ? "tomorrow"
                                                    : `in ${subscriptions[0].daysLeft} days`
                                          }`
                                        : `${count} subscriptions need your attention`}
                                </h2>

                                <p className="mt-4 max-w-xl text-zinc-400">
                                    Review your upcoming renewals before they're
                                    automatically charged.
                                </p>

                                <Link
                                    href="/subscriptions"
                                    className="mt-12  inline-block rounded-lg bg-amber-500 px-6 py-3 text-black hover:bg-amber-400"
                                >
                                    View Subscriptions
                                </Link>
                            </div>

                            <div className="w-full max-w-md space-y-4">
                                {subscriptions.map((subscription) => (
                                    <Link
                                        key={subscription.id}
                                        href={`/subscriptions/subscription/${subscription.id}`}
                                        className="block rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-amber-400/40"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {subscription.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-zinc-500">
                                                    Renews{" "}
                                                    {new Date(
                                                        subscription.endDate,
                                                    ).toLocaleDateString()}
                                                </p>

                                                <p className="mt-5 text-yellow-600 hover:underline w-full">
                                                    Review Subscription
                                                </p>
                                            </div>

                                            <div className="text-right">
                                                <p className="font-semibold text-white">
                                                    ₹{subscription.price}
                                                </p>

                                                <p className="rounded-full mt-3 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300">
                                                    {subscription.daysLeft === 0
                                                        ? "Today"
                                                        : subscription.daysLeft ===
                                                            1
                                                          ? "Tomorrow"
                                                          : `${subscription.daysLeft} Days`}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* QUICK ACTIONS */}

            <section className="mx-auto mt-16 max-w-7xl px-6 pb-20">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
                    <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                        <div>
                            <h2 className="text-3xl font-bold">
                                Quick Actions
                            </h2>

                            <p className="mt-3 max-w-2xl text-zinc-400">
                                Manage your subscriptions, add new services, or
                                review upcoming renewals from one place.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                            <Button size="lg" className="sm:min-w-[220px]">
                                <Link href="/subscriptions">
                                    View Subscriptions
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="border-zinc-700 sm:min-w-[220px]"
                            >
                                <Link href="/addSubscription">
                                    Add Subscription
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
