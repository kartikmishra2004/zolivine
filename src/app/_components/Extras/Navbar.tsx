"use client";
import { RefObject, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ShoppingCart, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideMenu from "./SideMenu";
import { lobster } from "@/utils/fonts";
import NavMenu from "./NavMenu";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartCount } from "@/store/cartSlice";
import { selectIsCartOpen, setCartOpen } from "@/store/uiSlice";
import { selectIsAuthenticated, logout } from "@/store/authSlice";

export default function Navbar() {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const cartCount = useAppSelector(selectCartCount);
    const isCartOpen = useAppSelector(selectIsCartOpen);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    // Pages with light backgrounds need dark navbar text from the start
    const isLightPage = /^\/products\/[^/]+$/.test(pathname) || /^\/auth/.test(pathname) || /^\/journal/.test(pathname) || /^\/checkout/.test(pathname) || /^\/profile/.test(pathname);
    const isDark = scrolled || isLightPage;
    const navRef = useRef<HTMLElement | null>(null);
    const shopRef = useRef<HTMLSpanElement | null>(null);
    const galleryRef = useRef<HTMLSpanElement | null>(null);
    const journalRef = useRef<HTMLSpanElement | null>(null);
    const lastScrollY = useRef<number>(0);
    const [navMenuOpen, setNavMenuOpen] = useState<boolean>(false);

    const navItems = [
        {
            name: "SHOP",
            ref: shopRef,
            src: "/products",
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
            <SideMenu />
            <NavMenu open={navMenuOpen} />
            <nav ref={navRef} className={`fixed z-40 lg:px-20 md:px-10 px-6 flex justify-between items-center w-full h-[4.5rem] transition-colors duration-300 ${scrolled && !navMenuOpen ? 'shadow' : ''} ${isDark ? "bg-zinc-50 text-zinc-700" : "text-zinc-50"}`}>
                <span onClick={() => setNavMenuOpen(!navMenuOpen)} className={`${navMenuOpen ? 'space-y-0' : 'space-y-2'} sm:hidden block cursor-pointer`}>
                    <div className={`${isDark || navMenuOpen ? "bg-zinc-700" : "bg-zinc-50"} ${navMenuOpen ? 'rotate-45' : 'rotate-0'} transition-all duration-500 w-7 h-[1px]`}></div>
                    <div className={`${isDark || navMenuOpen ? "bg-zinc-700" : "bg-zinc-50"} ${navMenuOpen ? '-rotate-45' : 'rotate-0'} transition-all duration-500 w-7 h-[1px]`}></div>
                </span>
                <Link href="/" className="w-32">
                    <h1 className={`${lobster.className} text-center sm:text-start text-[1.7rem] transition-colors duration-500 ease-in-out ${isDark || navMenuOpen ? "text-zinc-700" : "text-zinc-50"}`}>Zolivine</h1>
                </Link>
                <ul className="hidden sm:flex text-[10px] font-semibold lg:gap-12 gap-6 tracking-wider">
                    {navItems.map((item, id) => (
                        <li key={id} onMouseEnter={() => handleLineOn(item.ref)} onMouseLeave={() => handleLineOff(item.ref)} className="relative overflow-hidden"><Link href={item.src}>{item.name}<span ref={item.ref} className={`w-full absolute left-[-100%] bottom-0 h-[1px] ${isDark ? "bg-zinc-700" : "bg-zinc-50"}`}></span></Link></li>
                    ))}
                </ul>
                <div className={`w-32 hidden sm:flex rounded-4xl h-12 px-5 items-center ${isDark ? "bg-zinc-700" : "bg-zinc-50"} transition-colors duration-300 justify-around`}>
                    <button onClick={() => dispatch(setCartOpen(true))} className="cursor-pointer relative">
                        <ShoppingCart strokeWidth={1} className={`w-5 ${isDark ? "text-zinc-50" : "text-zinc-700"} transition-colors duration-300`} />
                        {cartCount > 0 && (
                            <span className={`absolute -top-2 -right-2 w-4 h-4 rounded-full flex justify-center items-center text-[8px] font-bold ${isDark ? "bg-zinc-50 text-zinc-700" : "bg-zinc-700 text-zinc-50"}`}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <div className="h-5 border-l border-zinc-400"></div>
                    <Link href={isAuthenticated ? "/profile" : "/auth/login"}>
                        <User strokeWidth={1} className={`w-5 ${isDark ? "text-zinc-50" : "text-zinc-700"} transition-colors duration-300`} />
                    </Link>
                </div>
                <div className="sm:hidden block">
                    <button onClick={() => dispatch(setCartOpen(true))} className="cursor-pointer relative">
                        <ShoppingCart strokeWidth={1} className={`w-7 ${isDark || navMenuOpen ? "text-zinc-700" : "text-zinc-50"} transition-colors duration-500`} />
                        {cartCount > 0 && (
                            <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex justify-center items-center text-[8px] font-bold ${isDark || navMenuOpen ? "bg-zinc-700 text-zinc-50" : "bg-zinc-50 text-zinc-700"}`}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </nav>
        </>
    );
}