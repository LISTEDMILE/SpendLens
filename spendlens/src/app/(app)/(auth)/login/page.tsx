"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
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

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {

    const searchParams = useSearchParams();

    const oauthError = searchParams.get("error");
    
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

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

            router.push("/dashboard");
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
        <div className="flex min-h-screen items-center justify-center bg-muted px-4">
            <div className="w-full max-w-md rounded-xl border bg-background p-8 shadow-lg">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Welcome Back
                </h1>

                <p className="mb-8 text-center text-sm text-muted-foreground">
                    Login to continue managing your subscriptions.
                </p>
{oauthError === "AccessDenied" && (
    <p className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-600">
        This account was created using a different sign-in method.
    </p>
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
                                    <FormLabel>Email</FormLabel>

                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
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
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.formState.errors.root && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.root.message}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </Form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-sm text-muted-foreground">OR</span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-3">
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                            signIn("google", { callbackUrl: "/dashboard" })
                        }
                    >
                        Continue with Google
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                            signIn("github", { callbackUrl: "/dashboard" })
                        }
                    >
                        Continue with GitHub
                    </Button>

                    <Button
  onClick={() =>
    signOut({
      callbackUrl: "/login",
    })
  }
>
  Logout
</Button>
                </div>
            </div>
        </div>
    );
}
