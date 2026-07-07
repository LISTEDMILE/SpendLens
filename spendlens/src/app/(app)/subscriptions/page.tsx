// "use client";

// import Link from "next/link";
// import { useEffect, useMemo, useState } from "react";
// import { Search, Plus, CalendarDays, Bell, ArrowUpRight } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Skeleton } from "@/components/ui/skeleton";

// interface SubscriptionCard {
//     _id: string;
//     name: string;
//     price: number;
//     status: "active" | "paused" | "cancelled";
//     startDate: string;
//     endDate: string;
//     reminderDays: number;
// }

// function LoadingCards() {
//     return (
//         <div className="flex flex-wrap gap-6">
//             {Array.from({ length: 6 }).map((_, i) => (
//                 <Card
//                     key={i}
//                     className="w-[360px] rounded-3xl border-zinc-800 bg-zinc-950/60 backdrop-blur-xl"
//                 >
//                     <CardContent className="p-6">
//                         <div className="flex items-center gap-4">
//                             <Skeleton className="h-14 w-14 rounded-2xl" />

//                             <div className="flex flex-col gap-2">
//                                 <Skeleton className="h-5 w-36" />

//                                 <Skeleton className="h-4 w-24" />
//                             </div>
//                         </div>

//                         <div className="mt-8 flex flex-col gap-3">
//                             <Skeleton className="h-4 w-full" />

//                             <Skeleton className="h-4 w-5/6" />

//                             <Skeleton className="h-4 w-2/3" />
//                         </div>

//                         <div className="mt-8 flex justify-between">
//                             <Skeleton className="h-10 w-24 rounded-full" />

//                             <Skeleton className="h-10 w-20 rounded-full" />
//                         </div>
//                     </CardContent>
//                 </Card>
//             ))}
//         </div>
//     );
// }

// export default function SubscriptionsPage() {
//     const [subscriptions, setSubscriptions] = useState<SubscriptionCard[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState("");

//     useEffect(() => {
//         const fetchSubscriptions = async () => {
//             try {
//                 const response = await fetch("/api/subscriptions");

//                 const data = await response.json();

//                 if (response.ok) {
//                     setSubscriptions(data.data);
//                 }
//             } catch (err) {
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSubscriptions();
//     }, []);

//     const filteredSubscriptions = useMemo(() => {
//         return subscriptions.filter((sub) =>
//             sub.name.toLowerCase().includes(search.toLowerCase()),
//         );
//     }, [subscriptions, search]);

//     if (loading) {
//         return (
//             <div className="relative min-h-screen overflow-hidden bg-black text-white">
//                 <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-[140px]" />

//                 <div className="absolute right-0 top-80 h-96 w-96 rounded-full bg-violet-500/20 blur-[170px]" />

//                 <div className="mx-auto max-w-7xl p-8">
//                     <LoadingCards />
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="relative min-h-screen overflow-hidden bg-black text-white">
//             <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-[140px]" />

//             <div className="absolute right-0 top-80 h-96 w-96 rounded-full bg-violet-500/20 blur-[170px]" />

//             <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-8 py-12">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <h1 className="text-5xl font-black">
//                             My Subscriptions
//                         </h1>

//                         <p className="mt-3 text-lg text-zinc-400">
//                             Manage all your recurring subscriptions from one
//                             place.
//                         </p>
//                     </div>

//                     <Button
//                         size="lg"
//                         className="rounded-lg bg-amber-600 p-8 border-1 border-white"
//                     >
//                         <Link href="/addSubscription">
//                             <Plus className="mr-2 h-5 w-5" />
//                             Add Subscription
//                         </Link>
//                     </Button>
//                 </div>

//                 <div className="flex items-center gap-6">
//                     <div className="relative flex-1">
//                         <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

//                         <Input
//                             placeholder="Search subscriptions..."
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                             className="h-14 rounded-full border-zinc-800 bg-zinc-950 pl-12"
//                         />
//                     </div>
//                 </div>

//                 {filteredSubscriptions.length === 0 ? (
//                     <Card className="rounded-[40px] border-zinc-800 bg-zinc-950/60 py-24">
//                         <CardContent className="flex flex-col items-center">
//                             <h2 className="text-3xl font-bold">
//                                 No subscriptions found.
//                             </h2>

//                             <p className="mt-4 text-zinc-500">
//                                 Add your first subscription to start tracking
//                                 expenses.
//                             </p>

//                             <Button className="mt-8 rounded-full px-8">
//                                 <Link href="/addSubscription">
//                                     <Plus className="mr-2 h-4 w-4" />
//                                     Add Subscription
//                                 </Link>
//                             </Button>
//                         </CardContent>
//                     </Card>
//                 ) : (
//                     <div className="flex flex-wrap gap-8">
//                         {" "}
//                         {filteredSubscriptions.map((subscription) => {
//                             const badgeColor =
//                                 subscription.status === "active"
//                                     ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
//                                     : subscription.status === "paused"
//                                       ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/30"
//                                       : "bg-red-500/15 text-red-400 border-red-500/30";

//                             return (
//                                 <Link
//                                     key={subscription._id}
//                                     href={`/subscriptions/subscription/${subscription._id}`}
//                                     className="group"
//                                 >
//                                     <Card className="relative w-[370px] overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-950/70 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-[0_0_45px_rgba(34,211,238,.15)] backdrop-blur-xl">
//                                         <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:scale-125" />

//                                         <CardContent className="relative p-7">
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center gap-4">
//                                                     <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-xl font-bold text-white shadow-lg">
//                                                         {subscription.name
//                                                             .charAt(0)
//                                                             .toUpperCase()}
//                                                     </div>

//                                                     <div>
//                                                         <h2 className="text-2xl font-bold tracking-tight">
//                                                             {subscription.name}
//                                                         </h2>

//                                                         <p className="mt-1 text-zinc-500">
//                                                             ₹
//                                                             {subscription.price}{" "}
//                                                             / month
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 <span
//                                                     className={`rounded-full border px-4 py-1 text-xs font-semibold capitalize ${badgeColor}`}
//                                                 >
//                                                     {subscription.status}
//                                                 </span>
//                                             </div>

//                                             <div className="my-8 h-px bg-zinc-800" />

//                                             <div className="flex flex-col gap-5">
//                                                 <div className="flex items-center justify-between">
//                                                     <div className="flex items-center gap-3 text-zinc-400">
//                                                         <CalendarDays className="h-5 w-5 text-cyan-400" />

//                                                         <span>
//                                                             Next Renewal
//                                                         </span>
//                                                     </div>

//                                                     <span className="font-semibold">
//                                                         {new Date(
//                                                             subscription.endDate,
//                                                         ).toLocaleDateString()}
//                                                     </span>
//                                                 </div>

//                                                 <div className="flex items-center justify-between">
//                                                     <div className="flex items-center gap-3 text-zinc-400">
//                                                         <Bell className="h-5 w-5 text-cyan-400" />

//                                                         <span>Reminder</span>
//                                                     </div>

//                                                     <span className="font-semibold">
//                                                         {
//                                                             subscription.reminderDays
//                                                         }{" "}
//                                                         days before
//                                                     </span>
//                                                 </div>
//                                             </div>

//                                             <div className="mt-10 flex items-center justify-between">
//                                                 <div className="flex flex-col">
//                                                     <span className="text-sm text-zinc-500">
//                                                         Monthly Cost
//                                                     </span>

//                                                     <span className="mt-1 text-3xl font-black text-cyan-400">
//                                                         ₹{subscription.price}
//                                                     </span>
//                                                 </div>

//                                                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:rotate-45 group-hover:bg-cyan-500 group-hover:text-black">
//                                                     <ArrowUpRight className="h-5 w-5" />
//                                                 </div>
//                                             </div>
//                                         </CardContent>
//                                     </Card>
//                                 </Link>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


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