"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    Search,
    Plus,
    CalendarDays,
    Bell,
    ArrowUpRight,
    SlidersHorizontal,
    X,
    ArrowUpDown,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface SubscriptionCard {
    _id: string;
    name: string;
    price: number;
    status: "active" | "paused" | "cancelled";
    startDate: string;
    endDate: string;
    reminderDays: number;
    paymentMethod: "Credit Card" | "Debit Card" | "UPI" | "PayPal" | "Other";
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

    const [sortBy, setSortBy] = useState("latest");

    const [statusFilter, setStatusFilter] = useState("all");

    const [paymentFilter, setPaymentFilter] = useState("all");

    const [renewalFilter, setRenewalFilter] = useState("all");

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

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
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let data = [...subscriptions];

        // Search
        data = data.filter((subscription) =>
            subscription.name.toLowerCase().includes(search.toLowerCase()),
        );

        // Status
        if (statusFilter !== "all") {
            data = data.filter(
                (subscription) => subscription.status === statusFilter,
            );
        }

        // Payment
        if (paymentFilter !== "all") {
            data = data.filter(
                (subscription) => subscription.paymentMethod === paymentFilter,
            );
        }

        // Price
        if (minPrice !== "") {
            data = data.filter(
                (subscription) => subscription.price >= Number(minPrice),
            );
        }

        if (maxPrice !== "") {
            data = data.filter(
                (subscription) => subscription.price <= Number(maxPrice),
            );
        }

        // Renewal
        if (renewalFilter !== "all") {
            data = data.filter((subscription) => {
                const renewalDate = new Date(subscription.endDate);
                renewalDate.setHours(0, 0, 0, 0);

                const reminderDate = new Date(renewalDate);
                reminderDate.setDate(
                    reminderDate.getDate() - subscription.reminderDays,
                );

                const daysLeft = Math.ceil(
                    (renewalDate.getTime() - today.getTime()) /
                        (1000 * 60 * 60 * 24),
                );

                switch (renewalFilter) {
                    case "alert":
                        return today >= reminderDate && today <= renewalDate;

                    case "today":
                        return daysLeft === 0;

                    case "tomorrow":
                        return daysLeft === 1;

                    case "week":
                        return daysLeft >= 0 && daysLeft <= 7;

                    case "month":
                        return daysLeft >= 0 && daysLeft <= 30;

                    case "overdue":
                        return renewalDate < today;

                    default:
                        return true;
                }
            });
        }

        // Sort
        switch (sortBy) {
            case "latest":
                data.sort(
                    (a, b) =>
                        new Date(b.startDate).getTime() -
                        new Date(a.startDate).getTime(),
                );
                break;

            case "oldest":
                data.sort(
                    (a, b) =>
                        new Date(a.startDate).getTime() -
                        new Date(b.startDate).getTime(),
                );
                break;

            case "renewalAsc":
                data.sort(
                    (a, b) =>
                        new Date(a.endDate).getTime() -
                        new Date(b.endDate).getTime(),
                );
                break;

            case "renewalDesc":
                data.sort(
                    (a, b) =>
                        new Date(b.endDate).getTime() -
                        new Date(a.endDate).getTime(),
                );
                break;

            case "priceLow":
                data.sort((a, b) => a.price - b.price);
                break;

            case "priceHigh":
                data.sort((a, b) => b.price - a.price);
                break;

            case "az":
                data.sort((a, b) => a.name.localeCompare(b.name));
                break;

            case "za":
                data.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }

        return data;
    }, [
        subscriptions,
        search,
        statusFilter,
        paymentFilter,
        renewalFilter,
        minPrice,
        maxPrice,
        sortBy,
    ]);

    const resetFilters = () => {
        setStatusFilter("all");
        setPaymentFilter("all");
        setRenewalFilter("all");
        setMinPrice("");
        setMaxPrice("");
        setSortBy("latest");
    };

   const activeFilters = [
    statusFilter !== "all" && {
        label: statusFilter,
        clear: () => setStatusFilter("all"),
    },

    paymentFilter !== "all" && {
        label: paymentFilter,
        clear: () => setPaymentFilter("all"),
    },

    renewalFilter !== "all" && {
        label: renewalFilter,
        clear: () => setRenewalFilter("all"),
    },

    minPrice && {
        label: `Min ₹${minPrice}`,
        clear: () => setMinPrice(""),
    },

    maxPrice && {
        label: `Max ₹${maxPrice}`,
        clear: () => setMaxPrice(""),
    },
].filter(Boolean) as {
    label: string;
    clear: () => void;
}[];

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

                <div className="mb-8 space-y-4">
                    {/* Search + Sort + Filter */}

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-start">
                        <div className="relative w-full lg:max-w-md">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

                            <Input
                                placeholder="Search subscriptions..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-11 rounded-xl border-zinc-800 bg-zinc-900 pl-10 text-white placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            

                            <Sheet>
                                <SheetTrigger className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 px-4 text-sm font-medium hover:bg-zinc-800">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                                    Filters
                                    {activeFilters.length > 0 && (
                                        <Badge className="ml-2">
                                            {activeFilters.length}
                                        </Badge>
                                    )}
                                </SheetTrigger>

                                <SheetContent className="overflow-y-auto border-zinc-800 bg-[#00110e] text-white p-8">
                                    <SheetHeader>
                                        <SheetTitle className="text-white text-3xl underline w-full text-center">
                                            Filters
                                        </SheetTitle>
                                    </SheetHeader>

                                    <div className="mt-8 space-y-8">
                                        {/* STATUS */}

                                        <div>
                                            <h3 className="mb-3 text-sm font-semibold">
                                                Status
                                            </h3>

                                            <Select
                                                value={statusFilter}
                                                onValueChange={(value) => {
                                                    if (value)
                                                        setStatusFilter(value);
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        All
                                                    </SelectItem>

                                                    <SelectItem value="active">
                                                        Active
                                                    </SelectItem>

                                                    <SelectItem value="paused">
                                                        Paused
                                                    </SelectItem>

                                                    <SelectItem value="cancelled">
                                                        Cancelled
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* PAYMENT */}

                                        <div>
                                            <h3 className="mb-3 text-sm font-semibold">
                                                Payment Method
                                            </h3>

                                            <Select
                                                value={paymentFilter}
                                                onValueChange={(value) => {
                                                    if (value)
                                                        setPaymentFilter(value);
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        All
                                                    </SelectItem>

                                                    <SelectItem value="UPI">
                                                        UPI
                                                    </SelectItem>

                                                    <SelectItem value="Credit Card">
                                                        Credit Card
                                                    </SelectItem>

                                                    <SelectItem value="Debit Card">
                                                        Debit Card
                                                    </SelectItem>

                                                    <SelectItem value="PayPal">
                                                        PayPal
                                                    </SelectItem>

                                                    <SelectItem value="Other">
                                                        Other
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* RENEWAL */}

                                        <div>
                                            <h3 className="mb-3 text-sm font-semibold">
                                                Renewal
                                            </h3>

                                            <Select
                                                value={renewalFilter}
                                                onValueChange={(value) => {
                                                    if (value)
                                                        setRenewalFilter(value);
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    <SelectItem value="all">
                                                        All
                                                    </SelectItem>

                                                    <SelectItem value="alert">
                                                        Reminder Window
                                                    </SelectItem>

                                                    <SelectItem value="today">
                                                        Today
                                                    </SelectItem>

                                                    <SelectItem value="tomorrow">
                                                        Tomorrow
                                                    </SelectItem>

                                                    <SelectItem value="week">
                                                        This Week
                                                    </SelectItem>

                                                    <SelectItem value="month">
                                                        This Month
                                                    </SelectItem>

                                                    <SelectItem value="overdue">
                                                        Overdue
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* PRICE */}

                                        <div>
                                            <h3 className="mb-3 text-sm font-semibold">
                                                Price Range
                                            </h3>

                                            <div className="grid grid-cols-2 gap-3 border-zinc-800 bg-zinc-900">
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    placeholder="Min ₹"
                                                    value={minPrice}
                                                    onChange={(e) =>
                                                        setMinPrice(
                                                            e.target.value,
                                                        )
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    min={0}
                                                    placeholder="Max ₹"
                                                    value={maxPrice}
                                                    onChange={(e) =>
                                                        setMaxPrice(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-fit px-8 py-2 mt-6 float-end bg-cyan-950 text-white"
                                            onClick={resetFilters}
                                        >
                                            Reset Filters
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <Select
                                value={sortBy}
                                onValueChange={(value) => {
                                    if (value) setSortBy(value);
                                }}
                            >
                                <SelectTrigger className="w-56 border-zinc-800 bg-zinc-900">
                                    <ArrowUpDown className="mr-2 h-4 w-4" />

                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent >
                                    <SelectItem value="latest" >
                                        Latest Added
                                    </SelectItem>

                                    <SelectItem value="oldest">
                                        Oldest Added
                                    </SelectItem>

                                    <SelectItem value="renewalAsc">
                                        Renewal Date ↑
                                    </SelectItem>

                                    <SelectItem value="renewalDesc">
                                        Renewal Date ↓
                                    </SelectItem>

                                    <SelectItem value="priceLow">
                                        Price Low → High
                                    </SelectItem>

                                    <SelectItem value="priceHigh">
                                        Price High → Low
                                    </SelectItem>

                                    <SelectItem value="az">Name A-Z</SelectItem>

                                    <SelectItem value="za">Name Z-A</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Active Filters */}

                    <div className="flex flex-wrap items-center gap-2">
    {activeFilters.map((filter) => (
        <Badge
            key={filter.label}
            variant="secondary"
            className="flex items-center text-wrap gap-2 rounded-full px-3 py-3  border-white max-w-full "
        >
            {filter.label}

            <button
                type="button"
                onClick={filter.clear}
                className="rounded-full p-0.5 transition hover:bg-zinc-700"
            >
                <X className="h-3 w-3" />
            </button>
        </Badge>
    ))}
                          <p className="ml-auto text-sm text-zinc-500">
                            {filteredSubscriptions.length} Subscription
                            {filteredSubscriptions.length !== 1 && "s"}
                        </p>
</div>
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
