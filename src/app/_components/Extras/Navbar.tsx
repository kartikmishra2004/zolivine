"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);
    const shopRef = useRef(null);
    const philosophyRef = useRef(null);
    const galleryRef = useRef(null);
    const journalRef = useRef(null);
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

    // Underline On
    const handleShopOn = () => {
        gsap.to(shopRef.current, {
            left: 0,
            duration: 0.3,
        });
    }
    const handlePhiOn = () => {
        gsap.to(philosophyRef.current, {
            left: 0,
            duration: 0.3,
        });
    }
    const handleGalleryOn = () => {
        gsap.to(galleryRef.current, {
            left: 0,
            duration: 0.3,
        });
    }
    const handleJournalOn = () => {
        gsap.to(journalRef.current, {
            left: 0,
            duration: 0.3,
        });
    }

    // Underline Off
    const handleShopOff = () => {
        gsap.to(shopRef.current, {
            left: '-100%',
            duration: 0.3,
        });
    }
    const handlePhiOff = () => {
        gsap.to(philosophyRef.current, {
            left: '-100%',
            duration: 0.3,
        });
    }
    const handleGalleryOff = () => {
        gsap.to(galleryRef.current, {
            left: '-100%',
            duration: 0.3,
        });
    }
    const handleJournalOff = () => {
        gsap.to(journalRef.current, {
            left: '-100%',
            duration: 0.3,
        });
    }

    return (
        <nav ref={navRef} className={`fixed z-50 px-20 flex justify-between items-center w-full h-[4.5rem] transition-colors duration-300 ${scrolled ? "bg-zinc-50 text-zinc-700 shadow" : "text-zinc-50"}`}>
            <Link href="/" className="w-32">
                <h1 className="font-playball text-[1.7rem]">Zolivine</h1>
            </Link>
            <ul className="flex text-[10px] font-semibold gap-12 tracking-wider">
                <li onMouseEnter={handleShopOn} onMouseLeave={handleShopOff} className="relative overflow-hidden"><Link href="/shop">SHOP<span ref={shopRef} className={`w-full absolute left-[-100%] bottom-0 h-[1px] ${scrolled ? "bg-zinc-700" : "bg-zinc-50"}`}></span></Link></li>
                <li onMouseEnter={handlePhiOn} onMouseLeave={handlePhiOff} className="relative overflow-hidden"><Link href="/philosophy">PHILOSOPHY<span ref={philosophyRef} className={`w-full absolute left-[-100%] bottom-0 h-[1px] ${scrolled ? "bg-zinc-700" : "bg-zinc-50"}`}></span></Link></li>
                <li onMouseEnter={handleGalleryOn} onMouseLeave={handleGalleryOff} className="relative overflow-hidden"><Link href="/gallery">GALLERY<span ref={galleryRef} className={`w-full absolute left-[-100%] bottom-0 h-[1px] ${scrolled ? "bg-zinc-700" : "bg-zinc-50"}`}></span></Link></li>
                <li onMouseEnter={handleJournalOn} onMouseLeave={handleJournalOff} className="relative overflow-hidden"><Link href="/journal">JOURNAL<span ref={journalRef} className={`w-full absolute left-[-100%] bottom-0 h-[1px] ${scrolled ? "bg-zinc-700" : "bg-zinc-50"}`}></span></Link></li>
            </ul>
            <div className={`w-32 rounded-4xl h-12 px-5 items-center ${scrolled ? "bg-zinc-700" : "bg-zinc-50"} transition-colors duration-300 flex justify-around`}>
                <button className="cursor-pointer">
                    <ShoppingCart strokeWidth={1} className={`w-5 ${scrolled ? "text-zinc-50" : "text-zinc-700"} transition-colors duration-300`} />
                </button>
                <div className="h-5 border-l border-zinc-400"></div>
                <Link href="/login">
                    <User strokeWidth={1} className={`w-5 ${scrolled ? "text-zinc-50" : "text-zinc-700"} transition-colors duration-300`} />
                </Link>
            </div>
        </nav>
    );
}