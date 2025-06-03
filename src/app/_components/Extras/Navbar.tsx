"use client";
import { RefObject, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import SideMenu from "./SideMenu";
import { lobster } from "@/utils/fonts";
import NavMenu from "./NavMenu";

export default function Navbar() {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const navRef = useRef<HTMLElement | null>(null);
    const shopRef = useRef<HTMLSpanElement | null>(null);
    const philosophyRef = useRef<HTMLSpanElement | null>(null);
    const galleryRef = useRef<HTMLSpanElement | null>(null);
    const journalRef = useRef<HTMLSpanElement | null>(null);
    const lastScrollY = useRef<number>(0);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false);

    const navItems = [
        {
            name: "SHOP",
            ref: shopRef,
            src: "/shop",
        },
        {
            name: "PHILOSOPHY",
            ref: philosophyRef,
            src: "/philosophy",
        },
        {
            name: "GALLERY",
            ref: galleryRef,
            src: "/gallery",
        },
        {
            name: "JOURNAL",
            ref: journalRef,
            src: "/journal",
        },
    ];

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
    const handleLineOn = (ref: RefObject<HTMLSpanElement | null>) => {
        gsap.to(ref.current, {
            left: 0,
            duration: 0.3,
        });
    }

    // Underline Off
    const handleLineOff = (ref: RefObject<HTMLSpanElement | null>) => {
        gsap.to(ref.current, {
            left: '-100%',
            duration: 0.3,
        });
    }

    return (
        <>
            <SideMenu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
            <NavMenu open={navMenuOpen} />
            <nav ref={navRef} className={`fixed z-40 lg:px-20 md:px-10 px-6 flex justify-between items-center w-full h-[4.5rem] transition-colors duration-300 ${scrolled ? "bg-zinc-50 text-zinc-700 shadow" : "text-zinc-50"}`}>
                <Menu onClick={() => setNavMenuOpen(!navMenuOpen)} strokeWidth={1} className={`w-5 ${scrolled || navMenuOpen ? "text-zinc-700" : "text-zinc-50"} sm:hidden block transition-colors duration-500`} />
                <Link href="/" className="w-32">
                    <h1 className={`${lobster.className} text-center sm:text-start text-[1.7rem] transition-colors duration-500 ease-in-out ${scrolled || navMenuOpen ? "text-zinc-700" : "text-zinc-50"}`}>Zolivine</h1>
                </Link>
                <ul className="hidden sm:flex text-[10px] font-semibold lg:gap-12 gap-6 tracking-wider">
                    {navItems.map((item, id) => (
                        <li key={id} onMouseEnter={() => handleLineOn(item.ref)} onMouseLeave={() => handleLineOff(item.ref)} className="relative overflow-hidden"><Link href={item.src}>{item.name}<span ref={item.ref} className={`w-full absolute left-[-100%] bottom-0 h-[1px] ${scrolled ? "bg-zinc-700" : "bg-zinc-50"}`}></span></Link></li>
                    ))}
                </ul>
                <div className={`w-32 hidden sm:flex rounded-4xl h-12 px-5 items-center ${scrolled ? "bg-zinc-700" : "bg-zinc-50"} transition-colors duration-300 justify-around`}>
                    <button onClick={() => setMenuOpen(true)} className="cursor-pointer">
                        <ShoppingCart strokeWidth={1} className={`w-5 ${scrolled ? "text-zinc-50" : "text-zinc-700"} transition-colors duration-300`} />
                    </button>
                    <div className="h-5 border-l border-zinc-400"></div>
                    <Link href="/auth/login">
                        <User strokeWidth={1} className={`w-5 ${scrolled ? "text-zinc-50" : "text-zinc-700"} transition-colors duration-300`} />
                    </Link>
                </div>
                <div className="sm:hidden block">
                    <button onClick={() => setMenuOpen(true)} className="cursor-pointer">
                        <ShoppingCart strokeWidth={1} className={`w-5 ${scrolled || navMenuOpen ? "text-zinc-700" : "text-zinc-50"} transition-colors duration-500`} />
                    </button>
                </div>
            </nav>
        </>
    );
}