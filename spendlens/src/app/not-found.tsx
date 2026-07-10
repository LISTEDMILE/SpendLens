// "use client";

// import Link from "next/link";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { Home, RotateCcw, Skull } from "lucide-react";

// export default function NotFound() {
//     const container = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const tl = gsap.timeline();

//         tl.from(".code", {
//             y: -80,
//             opacity: 0,
//             duration: 0.8,
//             ease: "back.out(1.7)",
//         })
//             .from(
//                 ".title",
//                 {
//                     y: 40,
//                     opacity: 0,
//                     duration: 0.6,
//                 },
//                 "-=0.3",
//             )
//             .from(
//                 ".subtitle",
//                 {
//                     opacity: 0,
//                     y: 20,
//                     stagger: 0.08,
//                 },
//                 "-=0.3",
//             )
//             .from(
//                 ".card",
//                 {
//                     scale: 0.85,
//                     opacity: 0,
//                     duration: 0.6,
//                 },
//                 "-=0.2",
//             )
//             .from(
//                 ".btn",
//                 {
//                     y: 20,
//                     opacity: 0,
//                     stagger: 0.15,
//                 },
//                 "-=0.2",
//             );

//         gsap.to(".code", {
//             y: 12,
//             repeat: -1,
//             yoyo: true,
//             ease: "sine.inOut",
//             duration: 2,
//         });
//     }, []);

//     return (
//         <main
//             ref={container}
//             className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 text-white"
//         >
//             {/* Background */}

//             <div className="absolute inset-0">
//                 <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-red-500/10 blur-[120px]" />

//                 <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
//             </div>

//             <div className="relative mx-auto max-w-4xl text-center">

//                 <h1 className="code text-[9rem] font-black leading-none text-red-500 md:text-[13rem]">
//                     404
//                 </h1>

//                 <h2 className="title text-4xl font-black md:text-6xl">
//                     Bro...
//                 </h2>

//                 <p className="subtitle mt-6 text-xl text-zinc-400">
//                     The page packed its bags and left.
//                 </p>

//                 <p className="subtitle mt-2 text-zinc-500">
//                     We checked every folder.
//                     <br />
//                     Even the one labeled
//                     <span className="font-semibold text-red-400">
//                         {" "}
//                         "Definitely Important Stuff"
//                     </span>
//                     .
//                 </p>

//                 <div className="card mx-auto mt-12 max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 backdrop-blur">
//                     <div className="flex items-center justify-center gap-3 text-red-400">
//                         <Skull size={24} />
//                         <h3 className="text-2xl font-bold">
//                             Navigation Report
//                         </h3>
//                     </div>

//                     <div className="mt-8 space-y-4 text-left text-zinc-300">

//                         <div className="flex justify-between">
//                             <span>Correct URL</span>
//                             <span className="text-red-400">❌ Missing</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span>Common Sense</span>
//                             <span className="text-yellow-400">
//                                 Questionable
//                             </span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span>Browser Confidence</span>
//                             <span className="text-red-400">2%</span>
//                         </div>

//                         <div className="flex justify-between">
//                             <span>Server's Opinion</span>
//                             <span className="text-cyan-400">
//                                 "Who sent this guy?"
//                             </span>
//                         </div>

//                         <div className="mt-6 rounded-xl bg-black/40 p-4 text-center text-lg font-semibold text-zinc-200">
//                             Final Score:
//                             <span className="ml-2 text-red-400">
//                                 0 / 100
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <p className="subtitle mt-8 text-lg text-zinc-500 italic">
//                     It's okay.
//                     <br />
//                     Even Google occasionally gets lost...
//                     <br />
//                     <span className="text-white">
//                         ...actually, no it doesn't.
//                     </span>
//                 </p>

//                 <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

//                     <Link
//                         href="/"
//                         className="btn rounded-xl bg-red-500 px-8 py-4 font-bold text-white transition hover:scale-105 hover:bg-red-400"
//                     >
//                         <span className="flex items-center gap-2">
//                             <Home size={18} />
//                             Fine... Take Me Home
//                         </span>
//                     </Link>

//                     <button
//                         onClick={() => history.back()}
//                         className="btn rounded-xl border border-zinc-700 px-8 py-4 font-bold transition hover:border-white hover:bg-zinc-900"
//                     >
//                         <span className="flex items-center gap-2">
//                             <RotateCcw size={18} />
//                             Pretend This Never Happened
//                         </span>
//                     </button>

//                 </div>
//             </div>
//         </main>
//     );
// }



"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
    Home,
    RotateCcw,
    Skull,
    SearchX,
    TriangleAlert,
} from "lucide-react";

export default function NotFound() {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            tl.from(".hero-badge", {
                opacity: 0,
                y: -25,
                duration: 0.5,
            })
                .from(
                    ".hero-404",
                    {
                        opacity: 0,
                        scale: 0.4,
                        rotate: -15,
                        duration: 0.9,
                        ease: "back.out(1.7)",
                    },
                    "-=0.1",
                )
                .from(
                    ".hero-title",
                    {
                        opacity: 0,
                        y: 40,
                        duration: 0.6,
                    },
                    "-=0.4",
                )
                .from(
                    ".hero-desc",
                    {
                        opacity: 0,
                        y: 30,
                        stagger: 0.08,
                    },
                    "-=0.4",
                )
               
                .from(
                    ".report-card",
                    {
                        opacity: 0,
                        x: 80,
                        duration: 0.8,
                    },
                    "-=0.5",
                );

            gsap.to(".hero-404", {
                y: 18,
                rotate: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                duration: 3,
            });

            gsap.to(".blob-left", {
                x: 80,
                y: -50,
                repeat: -1,
                yoyo: true,
                duration: 9,
                ease: "sine.inOut",
            });

            gsap.to(".blob-right", {
                x: -70,
                y: 60,
                repeat: -1,
                yoyo: true,
                duration: 11,
                ease: "sine.inOut",
            });

            gsap.fromTo(
                ".progress-fill",
                {
                    width: "0%",
                },
                {
                    width: "99%",
                    duration: 3,
                    ease: "power2.inOut",
                },
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main
            ref={pageRef}
            className="relative min-h-screen overflow-hidden bg-black text-white"
        >
            {/* Background */}

            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
                `,
                    backgroundSize: "42px 42px",
                }}
            />

            <div className="blob-left absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-red-500/20 blur-[140px]" />

            <div className="blob-right absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-500/20 blur-[150px]" />

            {/* Main Layout */}

            <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-2 lg:px-12">

                {/* LEFT */}

                <section className="flex flex-col justify-center">

                    <div className="hero-badge mb-8 flex w-fit items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300">
                        <TriangleAlert className="h-4 w-4" />
                        Navigation Failure Detected
                    </div>

                    <h1 className="hero-404 text-[6rem] font-black leading-none tracking-tight text-red-500 sm:text-[8rem] lg:text-[11rem]">
                        404
                    </h1>

                    <h2 className="hero-title mt-6 text-4xl font-black leading-tight sm:text-5xl">
                        Mission Successfully
                        <br />

                        <span className="text-red-400">
                            Failed.
                        </span>
                    </h2>

                    <div className="hero-desc mt-8 space-y-3 text-lg leading-8 text-zinc-400">

                        <p>
                            The page packed its bags,
                            resigned from SpendLens,
                            and disappeared without
                            leaving a forwarding address.
                        </p>

                        <p>
                            We asked our servers where
                            it went...
                        </p>

                        <p className="font-medium text-red-300">
                            They laughed.
                        </p>

                    </div>

                     {/* Floating Easter Eggs */}

            <div className="pointer-events-none  rounded-full border mt-6 border-red-500/20 bg-red-500/10 px-4 py-2 text-xs text-red-300 lg:block">
                Achievement: Explorer of Nowhere 🗺️
            </div>

            <div className="pointer-events-none  rounded-full border mt-4 border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs text-cyan-300 lg:block">
                Page Status: Missing Since Forever
            </div>

            <div className="pointer-events-none  rounded-full border mt-4 border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs text-amber-300 xl:block">
                The server would like to have a word with you.
            </div>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row ">

                        <Link
                            href="/"
                            className="hero-btn inline-flex items-center justify-center rounded-xl bg-cyan-500 px-7 py-4 font-semibold text-black transition hover:scale-105 hover:bg-cyan-400"
                        >
                            <Home className="mr-2 h-5 w-5" />

                            Fine... Take Me Home
                        </Link>

                        <button
                            onClick={() => {
                                if (history.length>2) {
                                
                                history.back();
                            }
                            else {
                                window.location.replace("/");
                            }}}
                            className="hero-btn inline-flex items-center justify-center rounded-xl border border-zinc-700 px-7 py-4 font-semibold transition hover:border-white hover:bg-zinc-900"
                        >
                            <RotateCcw className="mr-2 h-5 w-5" />

                            Pretend This Never Happened
                        </button>

                    </div>
                </section>


                                {/* RIGHT */}

                <section className="report-card relative">

                    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 shadow-2xl backdrop-blur-xl">

                        {/* Header */}

                        <div className="border-b border-zinc-800 p-8">

                            <div className="flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                                    <SearchX className="h-7 w-7 text-red-400" />
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold">
                                        Navigation Report
                                    </h3>

                                    <p className="mt-1 text-sm text-zinc-500">
                                        Generated automatically after witnessing
                                        your navigation decisions.
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Body */}

                        <div className="space-y-7 p-8">

                            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black/30 p-4">

                                <span className="text-zinc-400">
                                    Correct URL
                                </span>

                                <span className="font-semibold text-red-400">
                                    ❌ Missing
                                </span>

                            </div>

                            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black/30 p-4">

                                <span className="text-zinc-400">
                                    Browser Confidence
                                </span>

                                <span className="font-semibold text-yellow-400">
                                    2%
                                </span>

                            </div>

                            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black/30 p-4">

                                <span className="text-zinc-400">
                                    Server Reaction
                                </span>

                                <span className="font-semibold text-cyan-400">
                                    "Who invited this guy?"
                                </span>

                            </div>

                            <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-black/30 p-4">

                                <span className="text-zinc-400">
                                    Navigation Skill
                                </span>

                                <span className="font-semibold text-red-400">
                                    0 / 100
                                </span>

                            </div>

                            {/* Fake Progress */}

                            <div className="rounded-2xl border border-zinc-800 bg-black/40 p-5">

                                <div className="mb-3 flex items-center justify-between">

                                    <span className="font-medium text-zinc-300">
                                        Searching every folder...
                                    </span>

                                    <span className="text-sm text-zinc-500">
                                        99%
                                    </span>

                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

                                    <div className="progress-fill h-full rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300" />

                                </div>

                                <p className="mt-4 text-sm text-zinc-500">
                                    Still searching...
                                    <br />
                                    <span className="text-red-400 font-medium">
                                        Nope. It's definitely gone.
                                    </span>
                                </p>

                            </div>

                            {/* Achievement */}

                            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">

                                <div className="flex items-center gap-3">

                                    <Skull className="h-7 w-7 text-amber-400" />

                                    <div>

                                        <p className="font-semibold text-white">
                                            Achievement Unlocked
                                        </p>

                                        <p className="mt-1 text-amber-300">
                                            🏆 Professional URL Inventor
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Final Roast */}

                            <div className="rounded-2xl bg-red-500/10 p-5">

                                <p className="text-lg font-semibold text-red-300">
                                    Final Verdict
                                </p>

                                <p className="mt-3 leading-7 text-zinc-300">
                                    We checked the database.
                                    <br />
                                    We checked the cache.
                                    <br />
                                    We even asked the intern.
                                    <br />
                                    <br />
                                    <span className="font-semibold text-white">
                                        Everyone agreed...
                                    </span>
                                    <br />
                                    That page doesn't exist.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>




                    </div>

            {/* Bottom Quote */}

            <div className="pointer-events-none  w-full  px-6  mb-8">

                <div className="mx-auto max-w-7xl w-full ">

                    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 px-6 py-4 backdrop-blur sm:flex-row">

                        <p className="text-center text-sm text-zinc-500 sm:text-left">
                            <span className="font-semibold text-zinc-300">
                                SpendLens Navigation AI
                            </span>
                            {" · "}
                            Confidence:
                            <span className="ml-1 text-red-400">
                                0.0001%
                            </span>
                            {" · "}
                            Recommendation:
                            <span className="ml-1 text-cyan-400">
                                Stop inventing URLs.
                            </span>
                        </p>

                        <p className="text-xs italic text-zinc-600">
                            Error Code:
                            <span className="ml-1 font-semibold">
                                USER_NAVIGATION_SKILL_404
                            </span>
                        </p>

                    </div>

                </div>

            </div>

           

        </main>
    );
}