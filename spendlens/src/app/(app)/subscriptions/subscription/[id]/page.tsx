"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

interface Subscription {
    _id: string;
    name: string;
    price: number;
    startDate: string;
    endDate: string;
    reminderDays: number;
    status: "active" | "paused" | "cancelled";
    paymentMethod: "Credit Card" | "Debit Card" | "UPI" | "PayPal" | "Other";
}

export default function SubscriptionDetailsPage() {
    const { id } = useParams();

    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const [loading, setLoading] = useState(true);

    const router = useRouter();

    const deleteSubscription = async () => {
        try {
            const response = await fetch(`/api/addSubscription?id=${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);

            router.push("/subscriptions");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                const response = await fetch(
                    `/api/subscriptions/subscription/${id}`,
                );

                const data = await response.json();

                if (response.ok) {
                    setSubscription(data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, [id]);

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!subscription) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                Subscription not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 py-10">
            <div className="mx-auto max-w-4xl px-6">
                <Card className="border-zinc-800 bg-zinc-900 text-white shadow-xl">
                    <CardHeader className="border-b border-zinc-800 pb-6">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:px-8 md:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500 text-xl font-bold text-black">
                                    {subscription.name.charAt(0)}
                                </div>

                                <div>
                                    <CardTitle className="text-3xl">
                                        {subscription.name}
                                    </CardTitle>

                                    <p className="mt-2 text-zinc-400">
                                        Recurring subscription
                                    </p>
                                </div>
                            </div>

                            <Badge
                                className={`${
                                    subscription.status === "active"
                                        ? "bg-green-500/20 text-green-400"
                                        : subscription.status === "paused"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-red-500/20 text-red-400"
                                } text-2xl  py-4 px-8`}
                            >
                                {subscription.status}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-8 p-8">
                        <div>
                            <p className="text-sm text-zinc-500">
                                Monthly Cost
                            </p>

                            <h2 className="mt-2 text-5xl font-black text-cyan-400">
                                ₹{subscription.price}
                            </h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                                <p className="text-sm text-zinc-500">
                                    Payment Method
                                </p>

                                <p className="mt-2 text-lg font-semibold">
                                    {subscription.paymentMethod}
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                                <p className="text-sm text-zinc-500">
                                    Reminder
                                </p>

                                <p className="mt-2 text-lg font-semibold">
                                    {subscription.reminderDays} days before
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                                <p className="text-sm text-zinc-500">
                                    Started On
                                </p>

                                <p className="mt-2 text-lg font-semibold">
                                    {new Date(
                                        subscription.startDate,
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                                <p className="text-sm text-zinc-500">
                                    Next Renewal
                                </p>

                                <p className="mt-2 text-lg font-semibold">
                                    {new Date(
                                        subscription.endDate,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-8 sm:gap-3 border-t border-zinc-800 pt-8 sm:flex-row sm:justify-end items-center">
                            <Button className="rounded-lg w-full sm:w-fit">
                                <Link
                                    className="w-full sm:w-fit flex items-center gap-2 border-1 py-4 px-8 rounded-lg"
                                    href={`/addSubscription?mode=edit&id=${subscription._id}`}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span> Edit Subscription</span>
                                </Link>
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={deleteSubscription}
                                className="rounded-lg flex items-center px-12 py-6 bg-red-300 border-red-900 border-3 text-lg w-full sm:w-fit text-red-900"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span> Delete</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
