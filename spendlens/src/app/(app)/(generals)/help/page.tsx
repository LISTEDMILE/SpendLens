"use client";

import Link from "next/link";
import {
    HelpCircle,
    PlusCircle,
    Bell,
    Pencil,
    Trash2,
    ArrowRight,
    Mail,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function HelpPage() {
    const faqs = [
        {
            question: "How do I add a subscription?",
            answer: "Navigate to the Add Subscription page, fill in the subscription details, choose the renewal date and reminder period, then click Add Subscription.",
        },
        {
            question: "Can I edit a subscription later?",
            answer: "Yes. Open any subscription from your dashboard and click the Edit button to update its information.",
        },
        {
            question: "How do reminders work?",
            answer: "SpendLens stores your preferred reminder period and can notify you before the renewal date based on your settings.",
        },
        {
            question: "Can I delete a subscription?",
            answer: "Yes. Open the subscription details page and click Delete to permanently remove it.",
        },
    ];

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            {/* Background */}

            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute right-0 top-60 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />

            <section className="relative mx-auto max-w-7xl px-6 py-20">
                {/* Hero */}

                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                        <HelpCircle className="h-4 w-4" />
                        Help Center
                    </span>

                    <h1 className="mt-6 text-5xl font-black">
                        How can we help?
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-zinc-400">
                        Find answers to common questions and learn how to make
                        the most of SpendLens.
                    </p>
                </div>

                {/* Quick Guides */}

                <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <Card className="border-zinc-800 bg-zinc-900 text-white">
                        <CardHeader>
                            <PlusCircle className="h-10 w-10 text-cyan-400" />
                            <CardTitle>Add Subscription</CardTitle>
                        </CardHeader>

                        <CardContent className="text-zinc-400">
                            Easily add and organize all your recurring
                            subscriptions.
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-800 bg-zinc-900 text-white">
                        <CardHeader>
                            <Bell className="h-10 w-10 text-cyan-400" />
                            <CardTitle>Renewal Alerts</CardTitle>
                        </CardHeader>

                        <CardContent className="text-zinc-400">
                            Get reminders before your subscription renews.
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-800 bg-zinc-900 text-white">
                        <CardHeader>
                            <Pencil className="h-10 w-10 text-cyan-400" />
                            <CardTitle>Edit Details</CardTitle>
                        </CardHeader>

                        <CardContent className="text-zinc-400">
                            Update pricing, payment methods and renewal dates
                            anytime.
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-800 bg-zinc-900 text-white">
                        <CardHeader>
                            <Trash2 className="h-10 w-10 text-cyan-400" />
                            <CardTitle>Delete Plans</CardTitle>
                        </CardHeader>

                        <CardContent className="text-zinc-400">
                            Remove subscriptions you no longer use.
                        </CardContent>
                    </Card>
                </div>

                {/* FAQ */}

                <div className="mt-20">
                    <h2 className="mb-8 text-3xl font-bold">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-5">
                        {faqs.map((faq) => (
                            <Card
                                key={faq.question}
                                className="border-zinc-800 bg-zinc-900 text-white"
                            >
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold">
                                        {faq.question}
                                    </h3>

                                    <p className="mt-3 leading-7 text-zinc-400">
                                        {faq.answer}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Tips */}

                <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
                    <h2 className="text-3xl font-bold">
                        Tips for Better Tracking
                    </h2>

                    <ul className="mt-6 space-y-4 text-zinc-400">
                        <li>• Add every recurring payment as soon as you subscribe.</li>
                        <li>• Set reminders at least 3–5 days before renewal.</li>
                        <li>• Review your dashboard every month to remove unused subscriptions.</li>
                        <li>• Keep payment methods updated for accurate records.</li>
                    </ul>
                </div>

                {/* Contact CTA */}

                <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <Mail className="mx-auto h-12 w-12 text-cyan-400" />

                    <h2 className="mt-6 text-3xl font-bold">
                        Still Need Help?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                        If you couldn't find the answer you're looking for,
                        we're here to help.
                    </p>

                    <Button
                        className="mt-8 rounded-full"
                    >
                        <Link href="/contact">
                            Contact Support
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}