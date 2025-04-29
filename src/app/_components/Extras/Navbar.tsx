"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const lastScrollY = useRef(0);

    useGSAP(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY.current;

            setScrolled(currentScrollY > 80);

            if (scrollingDown && currentScrollY > 0) {
                gsap.to(navRef.current, {
                    y: "-100%",
                    duration: 0.8,
                    ease: "power2.out"
                });
            } else {
                gsap.to(navRef.current, {
                    y: "0%",
                    duration: 0.8,
                    ease: "power2.out"
                });
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            ref={navRef}
            className={`fixed z-50 px-20 flex justify-between items-center w-full h-[4.5rem] transition-colors duration-300 ${scrolled ? "bg-zinc-50 text-zinc-700" : "text-zinc-50"}`}
        >
            <Link href="/" className="w-32">
                <h1 className="font-playball text-[1.7rem]">Zolivine</h1>
            </Link>
            <ul className="flex text-xs gap-8 tracking-wider">
                <li><Link href="/">SHOP</Link></li>
                <li><Link href="/">PHILOSOPHY</Link></li>
                <li><Link href="/">GALLERY</Link></li>
                <li><Link href="/">JOURNAL</Link></li>
            </ul>
            <div className={`w-32 rounded-4xl h-12 px-5 items-center ${scrolled ? "bg-zinc-700" : "bg-zinc-50"} transition-colors duration-300 flex justify-around`}>
                <button className="cursor-pointer">
                    <ShoppingCart strokeWidth={1} className={`w-5 ${scrolled ? "text-zinc-50" : "text-zinc-700"} transition-colors duration-300`} />
                </button>
                <div className="h-5 border-l border-zinc-400"></div>
                <Link href="/">
                    <User strokeWidth={1} className={`w-5 ${scrolled ? "text-zinc-50" : "text-zinc-700"} transition-colors duration-300`} />
                </Link>
            </div>
        </nav>
    );
}