"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    addSubscriptionFormSchema,
    AddSubscriptionFormData,
} from "@/Schemas/AddSubscriptionSchema";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AddSubscriptionPage() {
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();

    const mode = searchParams.get("mode");
    const id = searchParams.get("id");

    const isEdit = mode === "edit";

    const form = useForm<AddSubscriptionFormData>({
        resolver: zodResolver(addSubscriptionFormSchema),
        defaultValues: {
            name: "",
            startDate: "",
            endDate: "",
            price: "",
            reminderDays: "",
            status: "active",
            paymentMethod: "UPI",
        },
    });

    useEffect(() => {
        if (!isEdit || !id) return;

        const fetchSubscription = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/subscriptions/subscription/${id}`,
                );

                const data = await response.json();

                if (!response.ok) {
                    form.setError("root", {
                        message: data.message,
                    });
                    return;
                }

                console.log(data.data);

                form.reset({
                    name: data.data.name,
                    startDate: data.data.startDate.split("T")[0],
                    endDate: data.data.endDate.split("T")[0],
                    price: String(data.data.price),
                    reminderDays: String(data.data.reminderDays),
                    status: data.data.status,
                    paymentMethod: data.data.paymentMethod,
                });
            } catch (err) {
                console.error(err);
                form.setError("root", {
                    message: "Failed to load subscription.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSubscription();
    }, [id, isEdit, form]);

    const onSubmit = async (values: AddSubscriptionFormData) => {
        try {
            setLoading(true);

            const response = await fetch(
                isEdit
                    ? `/api/addSubscription?id=${id}`
                    : "/api/addSubscription",
                {
                    method: isEdit ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                form.setError("root", {
                    message: data.message,
                });

                return;
            }

            if (!isEdit) {
                form.reset();
            }

            toast.success("Success", {
                description: isEdit
                    ? "Subscription updated successfully!"
                    : "Subscription added successfully!",
            });
        } catch {
            form.setError("root", {
                message: "Something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-screen min-h-screen bg-lime-100">
            <div className="mx-auto max-w-4xl  p-6">
                <div className="rounded-xl border bg-background p-8 bg-white shadow-lg">
                    <h1 className="mb-8 text-3xl font-bold">
                        {isEdit ? "Edit Subscription" : "Add Subscription"}
                    </h1>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subscription Name</FormLabel>

                                        <FormControl>
                                            <Input
                                                className="
        h-11 rounded-lg border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400
        focus-visible:border-zinc-400 aria-invalid:ring-0 aria-invalid:border-red-400"
                                                placeholder="Netflix"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Date</FormLabel>

                                            <FormControl>
                                                <Input
                                                    className="
        h-11
        rounded-lg
        border-zinc-300
        focus-visible:ring-1
        focus-visible:ring-zinc-400
        focus-visible:border-zinc-400
        aria-invalid:ring-0
aria-invalid:border-red-400
    
    "
                                                    type="date"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End Date</FormLabel>

                                            <FormControl>
                                                <Input
                                                    className="
        h-11
        rounded-lg
        border-zinc-300
        focus-visible:ring-1
        focus-visible:ring-zinc-400
        focus-visible:border-zinc-400
        aria-invalid:ring-0
aria-invalid:border-red-400
    
    "
                                                    type="date"
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* Price */}
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>

                                        <FormControl>
                                            <Input
                                                className="
        h-11
        rounded-lg
        border-zinc-300
        focus-visible:ring-1
        focus-visible:ring-zinc-400
        focus-visible:border-zinc-400
        aria-invalid:ring-0
aria-invalid:border-red-400
    
    "

                                                type="number"
                                                placeholder="499"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />{" "}
                            {/* Reminder */}
                            <FormField
                                control={form.control}
                                name="reminderDays"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Reminder Days Before Renewal
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                className="
        h-11
        rounded-lg
        border-zinc-300
        focus-visible:ring-1
        focus-visible:ring-zinc-400
        focus-visible:border-zinc-400
        aria-invalid:ring-0
aria-invalid:border-red-400
    "

                                                type="number"
                                                placeholder="3"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Status */}
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>

                                        <FormControl>
                                            <select
                                                className="w-full rounded-md border bg-background px-3 py-2"
                                                {...field}
                                            >
                                                <option value="active">
                                                    Active
                                                </option>

                                                <option value="paused">
                                                    Paused
                                                </option>

                                                <option value="cancelled">
                                                    Cancelled
                                                </option>
                                            </select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Payment Method */}
                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Payment Method</FormLabel>

                                        <FormControl>
                                            <select
                                                className="w-full rounded-md border bg-background px-3 py-2"
                                                {...field}
                                            >
                                                <option value="Credit Card">
                                                    Credit Card
                                                </option>

                                                <option value="Debit Card">
                                                    Debit Card
                                                </option>

                                                <option value="UPI">UPI</option>

                                                <option value="PayPal">
                                                    PayPal
                                                </option>

                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Root Error */}
                            {form.formState.errors.root && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.root.message}
                                </p>
                            )}
                            <Button
                                type="submit"
                                className="w-fit bg-zinc-600 text-white px-8 py-6 "
                                disabled={loading}
                            >
                                {loading
                                    ? isEdit
                                        ? "Updating Subscription..."
                                        : "Adding Subscription..."
                                    : isEdit
                                      ? "Update Subscription"
                                      : "Add Subscription"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}
