


"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    Search,
    Plus,
    CalendarDays,
    Bell,
    ArrowUpRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface SubscriptionCard {
    _id: string;
    name: string;
    price: number;
    status: "active" | "paused" | "cancelled";
    startDate: string;
    endDate: string;
    reminderDays: number;
}

function LoadingCards() {
    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card
                    key={i}
                    className="rounded-xl border border-zinc-800 bg-zinc-900"
                >
                    <CardContent className="space-y-5 p-5">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-lg" />

                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <Skeleton className="h-9 w-24 rounded-md" />
                            <Skeleton className="h-9 w-9 rounded-md" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<SubscriptionCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await fetch("/api/subscriptions");
                const data = await response.json();

                if (response.ok) {
                    setSubscriptions(data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);

    const filteredSubscriptions = useMemo(() => {
        return subscriptions.filter((subscription) =>
            subscription.name
                .toLowerCase()
                .includes(search.toLowerCase()),
        );
    }, [subscriptions, search]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 text-white">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <LoadingCards />
                </div>
            </div>
        );
    }

        return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Subscriptions
                        </h1>

                        <p className="mt-2 text-sm text-zinc-400">
                            Track and manage all your recurring payments in one
                            place.
                        </p>
                    </div>

                     <Button
                        size="lg"
                        className="rounded-lg bg-amber-600 p-8 border-1 border-white"
                    >
                        <Link href="/addSubscription">
                            <Plus className="mr-2 h-5 w-5" />
                            Add Subscription
                        </Link>
                    </Button>
                </div>

                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                        <Input
                            placeholder="Search subscriptions..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-11 rounded-lg border-zinc-800 bg-zinc-900 pl-10 text-white placeholder:text-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-700"
                        />
                    </div>

                    <p className="text-sm text-zinc-500">
                        {filteredSubscriptions.length} Subscription
                        {filteredSubscriptions.length !== 1 && "s"}
                    </p>
                </div>

                {filteredSubscriptions.length === 0 ? (
                    <Card className="border border-zinc-800 bg-zinc-900">
                        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                            <h2 className="text-xl font-semibold">
                                No subscriptions found
                            </h2>

                            <p className="mt-2 max-w-md text-sm text-zinc-400">
                                You haven't added any subscriptions yet. Create
                                your first subscription to start tracking your
                                recurring expenses.
                            </p>

                            <Button className="mt-6 rounded-lg">
                                <Link href="/addSubscription">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Subscription
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            
                                                    {filteredSubscriptions.map((subscription) => {
                            const badgeStyles =
                                subscription.status === "active"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : subscription.status === "paused"
                                      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                      : "bg-red-500/10 text-red-400 border-red-500/20";

                            return (
                                <Link
                                    key={subscription._id}
                                    href={`/subscriptions/subscription/${subscription._id}`}
                                    className="group"
                                >
                                    <Card className="h-full rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80">
                                        <CardContent className="flex h-full flex-col p-5">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-800 text-sm font-semibold">
                                                        {subscription.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <h2 className="text-lg font-semibold">
                                                            {subscription.name}
                                                        </h2>

                                                        <p className="text-sm text-zinc-500">
                                                            ₹
                                                            {subscription.price.toLocaleString()}
                                                            {" / month"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span
                                                    className={`rounded-md border px-2.5 py-1 text-[11px] font-medium capitalize ${badgeStyles}`}
                                                >
                                                    {subscription.status}
                                                </span>
                                            </div>

                                            <div className="my-5 border-t border-zinc-800" />

                                            <div className="space-y-4 text-sm">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-zinc-400">
                                                        <CalendarDays className="h-4 w-4" />
                                                        <span>Renewal</span>
                                                    </div>

                                                    <span className="font-medium">
                                                        {new Date(
                                                            subscription.endDate,
                                                        ).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-zinc-400">
                                                        <Bell className="h-4 w-4" />
                                                        <span>Reminder</span>
                                                    </div>

                                                    <span className="font-medium">
                                                        {
                                                            subscription.reminderDays
                                                        }{" "}
                                                        days before
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-6">
                                                <div className="flex items-end justify-between">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-wide text-zinc-500">
                                                            Monthly Cost
                                                        </p>

                                                        <p className="mt-1 text-2xl font-semibold">
                                                            ₹
                                                            {subscription.price.toLocaleString()}
                                                        </p>
                                                    </div>

                                                    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 text-zinc-500 transition-colors duration-200 group-hover:border-zinc-700 group-hover:text-white">
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                    )}
            
                        </div>
        </div>
    );
}