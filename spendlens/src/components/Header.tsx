"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import {  Menu, X } from "lucide-react";


export default function Header() {
    const { data: session } = useSession();

    const [showSideBar, setShowSideBar] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md bg-white">
            <div className="w-[30%] z-[-10] h-full absolute top-0 left-0 bg-gradient-to-r from-cyan-400 to-transparent"></div>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}

                <Link href="/" className="flex items-center gap-3">
                    {/* <img
                        src={"/logo.png"}
                        alt="SpendLens Logo"
                        width={44}
                        height={44}
                        className="rounded-lg"
                    /> */}

                    <span className="text-2xl font-bold tracking-tight">
                        <span className="text-primary">Spend</span>Lens
                    </span>
                </Link>

                {/* Navigation */}
                {session ? <nav className="hidden items-center gap-8 md:flex">
                    {/* <Link
                        href="/dashboard"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link> */}

                    <Link
                        href="/"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Home
                    </Link>

                    <Link
                        href="/subscriptions"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Subscriptions
                    </Link>

                    <Link
                        href="/addSubscription"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Add Subscription
                    </Link>
                </nav> : <nav className="hidden items-center gap-8 md:flex">
                         <Link
                        href="/"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Home
                    </Link>

                    <Link
                        href="/about"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        AboutUs
                        </Link>
                        
                        <Link
                        href="/help"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Help
                    </Link>

                    <Link
                        href="/contact"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        ContactUs
                    </Link>
                </nav>}

                {/* Right Section */}
                {session ? (
                     <Link href={"updateProfile"}  className="flex items-center gap-4">
                       

                        
                            <Avatar>
                                <AvatarImage
                                    src={
                                        session.user.image ??
                                        "/default-avatar.png"
                                    }
                                />
                                <AvatarFallback>
                                    {session.user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                                </Avatar>
                                
                                 <div className="">
                            <p className="text-sm font-semibold">
                                {session.user.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {session.user.email}
                            </p>
                        </div>
                        </Link>
                ) : (
                        <Link href="/login" className={"hidden sm:block rounded-lg py-3 px-6 bg-amber-600 text-white"}>
                  
                        Login / SignUp
                    </Link>
                )}

                <button
                onClick={()=> setShowSideBar(true)}>
 <Menu className="w-6 h-6"/>
                </button>
            </div>

            {showSideBar && <div><div className="fixed inset-0 w-screen h-screen bg-black/40 "
            onClick={()=>setShowSideBar(false)}/><div className="fixed top-0 right-0 w-full sm:w-fit min-h-screen flex flex-col gap-12 bg-gradient-to-t from-cyan-900 via-black to-black px-10 py-10 sm:min-w-[400px] text-white">
                    <button onClick={() => setShowSideBar(false)}
                    className={"self-end text-white"}>  <X className=" h-8 w-8"/></button>
   {session ? (
                        
                            <Link href={"updateProfile"}  onClick={() => setShowSideBar(false)}  className="flex items-center gap-4">
                       

                        
                            <Avatar>
                                <AvatarImage
                                    src={
                                        session.user.image ??
                                        "/default-avatar.png"
                                    }
                                />
                                <AvatarFallback>
                                    {session.user.name?.charAt(0).toUpperCase()}
                                </AvatarFallback>
                                </Avatar>
                                
                                 <div className="">
                            <p className="text-md font-semibold">
                                {session.user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {session.user.email}
                            </p>
                        </div>
                        </Link>

                       
                   
                ) : (
                        <Link href="/login"  onClick={() => setShowSideBar(false)} className={" block rounded-lg py-3 px-6 bg-amber-600 text-white "}>
                  
                        Login / SignUp
                    </Link>
                    )}
                    

                    {/* Navigation */}
                {session && <nav className=" items-center gap-6 flex flex-col w-full pb-8 items-start border-b-1 border-b">
                    {/* <Link
                        href="/dashboard"
                         onClick={() => setShowSideBar(false)}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link> */}

                   

                    <Link
                            href="/subscriptions"
                             onClick={() => setShowSideBar(false)}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Subscriptions
                    </Link>

                    <Link
                            href="/addSubscription"
                             onClick={() => setShowSideBar(false)}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Add Subscription
                    </Link>
                    </nav>}
                    

                     <nav className=" items-center gap-6 flex flex-col w-full items-start">
                        <Link
                            onClick={() => setShowSideBar(false)}
                        href="/"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Home
                    </Link>

                    <Link
                            href="/about"
                             onClick={() => setShowSideBar(false)}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        AboutUs
                        </Link>
                        
                         <Link
                            href="/help"
                             onClick={() => setShowSideBar(false)}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        Help
                    </Link>

                    <Link
                            href="/contact"
                             onClick={() => setShowSideBar(false)}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                    >
                        ContactUs
                    </Link>
                    </nav>
                    
                    {session &&  <Button
                        variant="outline"
                        
                        className={"w-fit py-6 px-12 text-lg self-end"}
                            onClick={() =>
                                signOut({
                                    callbackUrl: "/login",
                                })
                            }
                        >
                            Logout
                        </Button>}

                
                
            </div></div>}
        </header>
    );
}
