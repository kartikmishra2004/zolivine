'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { EditorialNew, lobster } from "@/utils/fonts";
import { ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef(null);
    const contentRefs = useRef<(HTMLElement | null)[]>([]);

    useGSAP(() => {
        gsap.from(contentRefs.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
    }, []);

    return (
        <footer ref={containerRef} className="bg-zinc-950 text-zinc-50 pt-24 pb-10 px-8 sm:px-16 lg:px-24 overflow-hidden relative">
            {/* Subtle glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
            
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-8">
                
                {/* Brand & Newsletter */}
                <div className="w-full lg:w-1/2">
                    <h2 ref={el => { contentRefs.current[0] = el; }} className={`${lobster.className} text-4xl mb-6`}>Zolivine</h2>
                    <h3 ref={el => { contentRefs.current[1] = el; }} className={`${EditorialNew.className} text-4xl sm:text-5xl text-zinc-300 mb-8 max-w-md leading-tight`}>
                        Become part of the <span className="italic">ritual.</span>
                    </h3>
                    
                    <div ref={el => { contentRefs.current[2] = el; }} className="relative max-w-sm mt-8">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full bg-transparent border-b border-zinc-700 py-3 text-sm text-zinc-50 focus:outline-none focus:border-zinc-300 transition-colors placeholder:text-zinc-600 pr-10"
                        />
                        <button className="absolute right-0 top-3 text-zinc-400 hover:text-zinc-50 transition-colors cursor-pointer">
                            <ArrowRight size={18} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                {/* Links */}
                <div className="w-full lg:w-1/2 flex flex-wrap justify-between sm:justify-end sm:gap-24 gap-10">
                    <div ref={el => { contentRefs.current[3] = el; }} className="flex flex-col gap-5">
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Explore</h4>
                        <Link href="/products" className="text-xs text-zinc-400 hover:text-zinc-50 tracking-wider transition-colors">All Products</Link>
                        <Link href="/products" className="text-xs text-zinc-400 hover:text-zinc-50 tracking-wider transition-colors">Pure Brilliance</Link>
                        <Link href="/products" className="text-xs text-zinc-400 hover:text-zinc-50 tracking-wider transition-colors">Gilded Essence</Link>
                        <Link href="#" className="text-xs text-zinc-400 hover:text-zinc-50 tracking-wider transition-colors">Journal</Link>
                    </div>

                    <div ref={el => { contentRefs.current[4] = el; }} className="flex flex-col gap-5">
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Support</h4>
                        <Link href="#" className="text-xs text-zinc-400 hover:text-zinc-50 tracking-wider transition-colors">Contact Us</Link>
                        <Link href="#" className="text-xs text-zinc-400 hover:text-zinc-50 tracking-wider transition-colors">Shipping & Returns</Link>
                        <Link href="#" className="text-xs text-zinc-400 hover:text-zinc-50 tracking-wider transition-colors">FAQ</Link>
                        <Link href="#" className="text-xs text-zinc-400 hover:text-zinc-50 tracking-wider transition-colors">Track Order</Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div ref={el => { contentRefs.current[5] = el; }} className="max-w-7xl mx-auto mt-24 pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-[10px] tracking-[0.1em] text-zinc-500 uppercase">
                    &copy; {new Date().getFullYear()} Zolivine. All rights reserved.
                </p>
                
                <div className="flex gap-6">
                    <Link href="#" className="text-zinc-500 hover:text-zinc-50 transition-colors">
                        <Instagram size={18} strokeWidth={1.5} />
                    </Link>
                    <Link href="#" className="text-zinc-500 hover:text-zinc-50 transition-colors">
                        <Twitter size={18} strokeWidth={1.5} />
                    </Link>
                    <Link href="#" className="text-zinc-500 hover:text-zinc-50 transition-colors">
                        <Facebook size={18} strokeWidth={1.5} />
                    </Link>
                </div>

                <div className="flex gap-6 text-[10px] tracking-[0.1em] text-zinc-500 uppercase">
                    <Link href="#" className="hover:text-zinc-50 transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-zinc-50 transition-colors">Terms</Link>
                </div>
            </div>
        </footer>
    );
}
