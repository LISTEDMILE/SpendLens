"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { signUpSchema } from "@/Schemas/SignUpSchema";

type SignupFormValues = z.infer<typeof signUpSchema>;

export default function SignupPage() {
    const [otpSent, setOtpSent] = useState(false);

    const [loadingOtp, setLoadingOtp] = useState(false);
    const [loadingSignup, setLoadingSignup] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            // otp resend ...................
            // otp: "",
        },
    });

    // ---------------- SEND OTP ----------------

    async function sendOtp(username: String) {
        try {
            setLoadingOtp(true);
            setError("");
            setSuccess("");

            const response = await fetch("/api/sendOtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to send OTP");
                return;
            }

            setOtpSent(true);
            setSuccess("OTP sent successfully.");
        } catch (error) {
            console.log(error);
            setError("Something went wrong.");
        } finally {
            setLoadingOtp(false);
        }
    }

    // ---------------- SIGN UP ----------------

    async function signup(values: SignupFormValues) {
        try {
            setLoadingSignup(true);
            setError("");
            setSuccess("");

            const response = await fetch("/api/signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Signup failed");
                return;
            }

            setSuccess("Account created successfully!");

            window.location.href = "/login";
        } catch (error) {
            console.log(error);
            setError("Something went wrong.");
        } finally {
            setLoadingSignup(false);
        }
    }

    return (
        <div className="min-h-screen bg-lime-100 py-12">
            <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl items-center px-5">
                <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-zinc-900">
                            Create Account
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            Join SpendLens and start tracking your
                            subscriptions.
                        </p>
                    </div>

                    <Form {...form}>
                        <form className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="John Doe"
                                                className="
        h-11 rounded-lg border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400
        focus-visible:border-zinc-400 aria-invalid:ring-0 aria-invalid:border-red-400"
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>

                                        <FormControl>
                                            <Input
                                                type="email"
                                                {...field}
                                                placeholder="john@example.com"
                                                className="
        h-11 rounded-lg border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400
        focus-visible:border-zinc-400 aria-invalid:ring-0 aria-invalid:border-red-400"
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-5 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>

                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                    placeholder="********"
                                                    className="
        h-11 rounded-lg border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400
        focus-visible:border-zinc-400 aria-invalid:ring-0 aria-invalid:border-red-400"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm Password
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    {...field}
                                                    placeholder="********"
                                                    className="
        h-11 rounded-lg border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400
        focus-visible:border-zinc-400 aria-invalid:ring-0 aria-invalid:border-red-400"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>


{/** ================================================= */}













                            {/* otp resend ..........*/}
                            {/* otp logic due to resend subscription */}

                            {/* <Button
                                type="button"
                                className="h-11 w-fit rounded-lg px-8 py-6 bg-zinc-600 text-white"
                                disabled={loadingOtp}
                                onClick={() => sendOtp(form.watch("username"))}
                            >
                                {loadingOtp
                                    ? "Sending OTP..."
                                    : otpSent
                                      ? "Resend OTP ->"
                                      : "Send OTP ->"}
                            </Button>

                            {otpSent && (
                                <FormField
                                    control={form.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Email Verification Code
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    maxLength={6}
                                                    placeholder="123456"
                                                    disabled={!otpSent}
                                                    className="
        h-11 rounded-lg border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400
        focus-visible:border-zinc-400 aria-invalid:ring-0 aria-invalid:border-red-400"
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )} */}

















{/** ================================================= */}

                            {error && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm text-red-600">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {success && (
                                <div className="rounded-lg border border-green-200 bg-green-50 p-3">
                                    <p className="text-sm text-green-700">
                                        {success}
                                    </p>
                                </div>
                            )}

                            {/** otp resend ............... */}
                            {/** remove the compo below commented and uncomment this otp will start working.... */}

                            {/* {otpSent && (
                                <div className="space-y-3 pt-2">
                                    <Button
                                        type="button"
                                        disabled={loadingSignup}
                                        onClick={form.handleSubmit(signup)}
                                        className="h-11 w-full rounded-lg bg-zinc-800 text-white"
                                    >
                                        {loadingSignup
                                            ? "Creating Account..."
                                            : "Create Account"}
                                    </Button>
                                </div>
                            )} */}

                            <div className="space-y-3 pt-2">
                                    <Button
                                        type="button"
                                        disabled={loadingSignup}
                                        onClick={form.handleSubmit(signup)}
                                        className="h-11 w-full rounded-lg bg-zinc-800 text-white"
                                    >
                                        {loadingSignup
                                            ? "Creating Account..."
                                            : "Create Account"}
                                    </Button>
                                </div>
                        </form>
                    </Form>

                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px flex-1 bg-zinc-200" />

                        <span className="text-xs uppercase tracking-wider text-zinc-400">
                            Or continue with
                        </span>

                        <div className="h-px flex-1 bg-zinc-200" />
                    </div>

                    <div className="space-y-3">
                        <Button
                            variant="outline"
                            type="button"
                            className="h-11 w-full rounded-lg"
                            onClick={() => signIn("google")}
                        >
                            Continue with Google
                        </Button>

                        <Button
                            variant="outline"
                            type="button"
                            className="h-11 w-full rounded-lg"
                            onClick={() => signIn("github")}
                        >
                            Continue with GitHub
                        </Button>
                    </div>

                    <div className="mt-8 border-t border-zinc-200 pt-6 text-center">
                        <p className="text-sm text-zinc-500">
                            Already have an account?
                        </p>

                        <Button
                            variant="ghost"
                            className="mt-2 w-full rounded-lg"
                        >
                            <Link href="/login" className="underline">{"Sign In ->"}</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
