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
        <div className="mx-auto max-w-3xl p-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-3xl">
                            {subscription.name}
                        </CardTitle>

                        <Badge
                            variant={
                                subscription.status === "active"
                                    ? "default"
                                    : "secondary"
                            }
                        >
                            {subscription.status}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Price
                            </p>

                            <p className="text-xl font-semibold">
                                ₹ {subscription.price}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Payment Method
                            </p>

                            <p className="text-xl font-semibold">
                                {subscription.paymentMethod}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Start Date
                            </p>

                            <p>
                                {new Date(
                                    subscription.startDate,
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Renewal Date
                            </p>

                            <p>
                                {new Date(
                                    subscription.endDate,
                                ).toLocaleDateString()}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Reminder Before
                            </p>

                            <p>{subscription.reminderDays} day(s)</p>
                        </div>
                    </div>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Price
                                </p>

                                <p className="text-xl font-semibold">
                                    ₹ {subscription.price}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Payment Method
                                </p>

                                <p className="text-xl font-semibold">
                                    {subscription.paymentMethod}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Start Date
                                </p>

                                <p>
                                    {new Date(
                                        subscription.startDate,
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Renewal Date
                                </p>

                                <p>
                                    {new Date(
                                        subscription.endDate,
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Reminder Before
                                </p>

                                <p>{subscription.reminderDays} day(s)</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t pt-6">
                            <Button>
                                <Link
                                    href={`/addSubscription?mode=edit&id=${subscription._id}`}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={deleteSubscription}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </CardContent>
            </Card>
        </div>
    );
}
