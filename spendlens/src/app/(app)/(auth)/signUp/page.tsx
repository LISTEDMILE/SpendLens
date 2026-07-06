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
      otp: "",
    },
  });

  // ---------------- SEND OTP ----------------

  async function sendOtp(username:String,) {
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
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            SpendLens
          </h1>

          <p className="mt-2 text-slate-400">
            Create your account
          </p>
        </div>

        <Form {...form}>
          <form className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Full Name
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
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
                  <FormLabel className="text-white">
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
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
                  <FormLabel className="text-white">
                    Password
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
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
                  <FormLabel className="text-white">
                    Confirm Password
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    OTP
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter OTP"
                      maxLength={6}
                      disabled={!otpSent}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="text-center text-sm text-red-500">
                {error}
              </p>
            )}

            {success && (
              <p className="text-center text-sm text-green-500">
                {success}
              </p>
            )}

            <div className="space-y-3">
              <Button
                type="button"
                className="w-full"
                disabled={loadingOtp}
                onClick={()=>sendOtp(form.watch("username"))}
              >
                {loadingOtp ? "Sending OTP..." : "Send OTP"}
              </Button>

              <Button
                type="button"
                className="w-full"
                disabled={!otpSent || loadingSignup}
                onClick={form.handleSubmit(signup)}
              >
                {loadingSignup ? "Creating Account..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="mx-4 text-sm text-slate-400">
            OR
          </span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => signIn("github")}
          >
            Continue with GitHub
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}