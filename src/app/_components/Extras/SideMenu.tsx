import { X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import ArrowButton from "./ArrowButton";
import { EditorialNew } from "@/utils/fonts";

type Props = {
    setMenuOpen: (params: boolean) => void;
    menuOpen: boolean;
}

export default function SideMenu({ setMenuOpen, menuOpen }: Props) {

    const products = [];
    const buttonRef = useRef<HTMLAnchorElement | null>(null);
    const [arrowHovered, setArrowHovered] = useState(false)
    return (
        <>
            <section onClick={() => setMenuOpen(false)} className={`w-full h-screen bg-black/40 z-[9999] ${menuOpen ? "fixed sm:block hidden" : "hidden"} transition-all duration-700 ease-in-out ${menuOpen ? "opacity-100" : "opacity-0"}`}></section>
            <div className={`fixed z-[99999] sm:w-[45%] md:w-1/3 w-full h-screen bg-zinc-50 transition-all duration-700 ease-in-out ${menuOpen ? "right-0" : "right-[-100%]"}`}>
                <div className="w-full h-[10%] flex justify-between items-center px-4 lg:px-14">
                    <h1 className="text-4xl text-zinc-700">Cart<sup className="text-xl">({products.length})</sup></h1>
                    <X onClick={() => setMenuOpen(false)} className="w-9 h-9 cursor-pointer transition-transform duration-400 hover:rotate-180 text-zinc-700" strokeWidth={1.5} />
                </div>
                <div className="h-[90%] w-full flex flex-col justify-center items-center gap-4">
                    <div className="text-3xl">
                        <h1 className="text-center text-4xl lg:text-[3.5rem] text-zinc-700 lg:leading-7">Your cart is</h1>
                        <h1 className={`text-center ${EditorialNew.className} text-4xl lg:text-[3.5rem] text-zinc-700 lg:leading-20 tracking-tighter`}>empty</h1>
                    </div>
                    <div className="w-full flex justify-center">
                        <Link onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} ref={buttonRef} href={'/products'} className="lg:w-[70%] w-[90%] h-[3rem] cursor-pointer rounded-4xl border border-[#c4c4c4] relative flex justify-center items-center">
                            <h1 className="text-zinc-700 underline text-[10px] lg:pr-0 pr-5 lg:text-xs tracking-wider">BROWSE PRODUCTS</h1>
                            <ArrowButton hover={arrowHovered} varient="sm" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}