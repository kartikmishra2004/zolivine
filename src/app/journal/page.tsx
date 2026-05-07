'use client';
import Image from "next/image";
import { EditorialNew } from "@/utils/fonts";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Footer from "../_components/Extras/Footer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchArticles, selectFeaturedArticle, selectGridArticles, selectJournalStatus } from "@/store/journalSlice";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Journal() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const dispatch = useAppDispatch();
    const featuredArticle = useAppSelector(selectFeaturedArticle);
    const gridArticles = useAppSelector(selectGridArticles);
    const status = useAppSelector(selectJournalStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchArticles());
        }
    }, [status, dispatch]);

    useGSAP(() => {
        if (status !== 'succeeded') return;

        // Custom Cursor movement
        const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
        const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });

        const handlePointerMove = (e: PointerEvent) => {
            xToCursor(e.clientX);
            yToCursor(e.clientY);
        };

        window.addEventListener("pointermove", handlePointerMove);

        // Header Reveal
        gsap.from(headerRef.current, {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: 0.2
        });

        // Staggered reveal for article cards
        const articleCards = gsap.utils.toArray('.journal-card');
        articleCards.forEach((card: any) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                },
                y: 80,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out"
            });
        });

        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, { dependencies: [status] });

    if (status !== 'succeeded' || !featuredArticle) {
        return (
            <section className="w-full h-screen bg-zinc-50 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin"></div>
            </section>
        );
    }

    return (
        <>
            <section className="w-full min-h-screen bg-zinc-50 text-zinc-800 pt-[7rem] md:pt-[10rem] pb-32 cursor-default selection:bg-zinc-800 selection:text-zinc-50 overflow-hidden">

                {/* Custom Cursor */}
                <div
                    ref={cursorRef}
                    className={`fixed top-[-40px] left-[-40px] w-[80px] h-[80px] rounded-full bg-zinc-800 pointer-events-none z-50 flex items-center justify-center transition-transform duration-300 ease-out ${isHovering ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                >
                    <span className="text-[#f7f7f5] text-[10px] font-bold tracking-widest">READ</span>
                </div>

                <div className="max-w-[90rem] mx-auto px-6 md:px-12">

                    {/* Header */}
                    <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 border-b border-zinc-300 pb-12">
                        <h1 className={`${EditorialNew.className} font-light text-[6rem] md:text-[11rem] leading-[0.8] tracking-tighter uppercase text-zinc-800`}>
                            Journal
                        </h1>
                        <p className="text-zinc-500 max-w-sm mt-8 md:mt-0 md:text-right tracking-wide leading-relaxed text-sm md:text-base font-medium">
                            Essays, musings, and intimate explorations into the art of perfumery and the memories we capture in glass.
                        </p>
                    </div>

                    {/* Featured Article */}
                    <div
                        className="journal-card featured-container relative w-full mb-24 md:mb-40 group cursor-none"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <div className="w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-sm relative">
                            <Image
                                src={featuredArticle.image}
                                alt={featuredArticle.title}
                                fill
                                className="object-cover scale-110 group-hover:scale-[1.15] transition-transform duration-[1.5s] ease-out origin-center"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700"></div>
                        </div>
                        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-end px-2 md:px-0">
                            <div className="max-w-2xl">
                                <div className="flex gap-4 items-center text-[10px] md:text-xs tracking-widest uppercase text-zinc-500 mb-4 font-semibold">
                                    <span>{featuredArticle.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                                    <span>{featuredArticle.date}</span>
                                </div>
                                <h2 className={`${EditorialNew.className} font-normal text-4xl md:text-6xl text-zinc-800 leading-tight mb-4 group-hover:text-zinc-500 transition-colors duration-500`}>
                                    {featuredArticle.title}
                                </h2>
                                <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl">
                                    {featuredArticle.excerpt}
                                </p>
                            </div>
                            <div className="mt-8 md:mt-0 shrink-0">
                                <button className="flex items-center gap-2 border-b border-zinc-800 pb-1 text-xs md:text-sm tracking-widest font-bold uppercase group-hover:text-zinc-500 group-hover:border-zinc-500 transition-colors duration-300">
                                    Read Article <ArrowUpRight size={18} strokeWidth={1.5} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Grid Articles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-20 gap-y-24 md:gap-y-32">
                        {gridArticles.map((article, idx) => (
                            <div
                                key={article.id}
                                className={`journal-card group cursor-none flex flex-col ${idx % 2 !== 0 ? 'md:mt-40' : ''}`}
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                            >
                                <div className={`w-full overflow-hidden rounded-sm relative mb-8 md:mb-10 ${idx % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}>
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                                    />
                                </div>
                                <div className="flex flex-col flex-grow justify-between px-2 md:px-0">
                                    <div>
                                        <div className="flex gap-4 items-center text-[9px] md:text-[10px] tracking-widest uppercase text-zinc-500 mb-4 font-bold">
                                            <span>{article.category}</span>
                                            <span className="w-1 h-1 rounded-full bg-zinc-400"></span>
                                            <span>{article.date}</span>
                                        </div>
                                        <h3 className={`${EditorialNew.className} font-normal text-3xl md:text-4xl text-zinc-800 leading-snug mb-4 group-hover:text-zinc-500 transition-colors duration-500 pr-4`}>
                                            {article.title}
                                        </h3>
                                        <p className="text-zinc-500 leading-relaxed text-sm md:text-base font-medium">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}