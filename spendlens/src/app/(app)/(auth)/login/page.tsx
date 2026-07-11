"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/Schemas/LoginSchema";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [oauthError, setOauthError] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setOauthError(params.get("error"));
    }, []);

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const loginByOAuth = async (method: "google" | "github") => {
        setLoading(true);

        await signIn(method, {
            callbackUrl: "/subscriptions",
        });
    };

    const onSubmit = async (values: LoginData) => {
        setLoading(true);

        try {
            const result = await signIn("credentials", {
                username: values.username,
                password: values.password,
                redirect: false,
            });

            if (result?.error) {
                form.setError("root", {
                    message: "Invalid email or password",
                });
                return;
            }

            router.push("/subscriptions");
            router.refresh();
        } catch (error) {
            console.error(error);

            form.setError("root", {
                message: "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-lime-100 py-12">
            <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl items-center px-5">
                <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-zinc-900">
                            Login
                        </h1>

                        
                    </div>

                    {oauthError === "AccessDenied" && (
                        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                            <p className="text-sm text-red-600">
                                This account was created using a different
                                sign-in method.
                            </p>
                        </div>
                    )}

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>

                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="
        h-11 rounded-lg border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400
        focus-visible:border-zinc-400 aria-invalid:ring-0 aria-invalid:border-red-400"

                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>

                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="
        h-11 rounded-lg border-zinc-300 focus-visible:ring-1 focus-visible:ring-zinc-400
        focus-visible:border-zinc-400 aria-invalid:ring-0 aria-invalid:border-red-400"

                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {form.formState.errors.root && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                                    <p className="text-sm text-red-600">
                                        {form.formState.errors.root.message}
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-11 w-fit px-8 py-6 bg-zinc-600 text-white rounded-lg "
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </Button>
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
                            disabled={loading}
                            className="h-11 w-full rounded-lg"
                            onClick={() => loginByOAuth("google")}
                        >
                            Continue with Google
                        </Button>

                        <Button
                            variant="outline"
                            disabled={loading}
                            className="h-11 w-full rounded-lg"
                            onClick={() => loginByOAuth("github")}
                        >
                            Continue with GitHub
                        </Button>
                    </div>

                    <div className="mt-8 border-t border-zinc-200 pt-6 text-center">
                        <p className="text-sm text-zinc-500">
                            Don't have an account?
                        </p>

                        <Button
                            variant="ghost"
                            className="mt-2 w-full rounded-lg"
                        >
                            <Link href="/signUp" className="underline">
                                {"Create Account ->"}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
