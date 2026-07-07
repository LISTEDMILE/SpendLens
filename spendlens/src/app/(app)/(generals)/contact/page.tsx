"use client";

import Link from "next/link";
import {
    Mail,
    Phone,
    MapPin,
    
    Send,
  
} from "lucide-react";
  import { FaGithub , FaLinkedin } from "react-icons/fa";
                                        

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            {/* Background */}
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
            <div className="absolute right-0 top-60 h-80 w-80 rounded-full bg-violet-500/10 blur-[150px]" />

            <section className="relative mx-auto max-w-7xl px-6 py-20">
                {/* Heading */}

                <div className="mx-auto max-w-3xl text-center">
                    <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-400">
                        Contact Us
                    </span>

                    <h1 className="mt-6 text-5xl font-black">
                        We'd Love to Hear
                        <span className="text-cyan-400"> From You</span>
                    </h1>

                    <p className="mt-6 text-lg leading-8 text-zinc-400">
                        Have a question, suggestion, or feedback? Fill out the
                        form below or reach us directly using the contact
                        information.
                    </p>
                </div>

                {/* Content */}

                <div className="mt-16 grid gap-10 lg:grid-cols-2">
                    {/* Contact Details */}

                    <Card className="border-zinc-800 bg-zinc-900 text-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Contact Information
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-8">
                            <div className="flex items-start gap-4">
                                <Mail className="mt-1 text-cyan-400" />

                                <div>
                                    <p className="font-semibold">
                                        Email
                                    </p>

                                    <p className="text-zinc-400">
                                        spendlens@email.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="mt-1 text-cyan-400" />

                                <div>
                                    <p className="font-semibold">
                                        Phone
                                    </p>

                                    <p className="text-zinc-400">
                                        +91 9876543210
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <MapPin className="mt-1 text-cyan-400" />

                                <div>
                                    <p className="font-semibold">
                                        Location
                                    </p>

                                    <p className="text-zinc-400">
                                        India
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-zinc-800 pt-6">
                                <p className="mb-4 font-semibold">
                                    Connect with me
                                </p>

                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-zinc-700 bg-transparent"
                                    >
                                        <FaGithub />
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="border-zinc-700 bg-transparent"
                                    >
                                      

                                        <FaLinkedin />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Form */}

                    <Card className="border-zinc-800 bg-zinc-900 text-white">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Send a Message
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-5">
                                <Input
                                    placeholder="Your Name"
                                    className="border-zinc-700 bg-zinc-950"
                                />

                                <Input
                                    type="email"
                                    placeholder="Your Email"
                                    className="border-zinc-700 bg-zinc-950"
                                />

                                <Input
                                    placeholder="Subject"
                                    className="border-zinc-700 bg-zinc-950"
                                />

                                <Textarea
                                    placeholder="Write your message..."
                                    rows={6}
                                    className="border-zinc-700 bg-zinc-950"
                                />

                                <Button className="w-full">
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom CTA */}

                <div className="mt-20 rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
                    <h2 className="text-3xl font-bold">
                        Looking for more information?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                        Learn more about SpendLens, its mission, and the
                        developer behind the project.
                    </p>

                    <Button
                        variant="outline"
                        className="mt-8 border-zinc-700 bg-transparent"
                    >
                        <Link href="/about">
                            Visit About Page
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    );
}