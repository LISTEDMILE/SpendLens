"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

interface SubscriptionCard {
    _id: string;
    name: string;
    price: number;
    status: "active" | "paused" | "cancelled";
    startDate: string;
    endDate: string;
    reminderDays: number;
}

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<SubscriptionCard[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSubscriptions = async () => {
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

        getSubscriptions();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                Loading subscriptions...
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">My Subscriptions</h1>

                    <p className="text-muted-foreground">
                        Manage all your active subscriptions.
                    </p>
                </div>

                <Button>
                    <Link href="/addSubscription">+ Add Subscription</Link>
                </Button>
            </div>

            {subscriptions.length === 0 ? (
                <Card>
                    <CardContent className="flex h-40 items-center justify-center">
                        <p className="text-muted-foreground">
                            No subscriptions found.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {subscriptions.map((subscription) => (
                        <Link
                            key={subscription._id}
                            href={`/subscriptions/subscription/${subscription._id}`}
                        >
                            <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]">
                                <CardHeader>
                                    <CardTitle>{subscription.name}</CardTitle>

                                    <CardDescription>
                                        ₹{subscription.price}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Status</span>

                                        <span
                                            className={`font-medium ${
                                                subscription.status === "active"
                                                    ? "text-green-600"
                                                    : subscription.status ===
                                                        "paused"
                                                      ? "text-yellow-600"
                                                      : "text-red-600"
                                            }`}
                                        >
                                            {subscription.status}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Next Renewal</span>

                                        <span>
                                            {new Date(
                                                subscription.endDate,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Reminder</span>

                                        <span>
                                            {subscription.reminderDays} day(s)
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
