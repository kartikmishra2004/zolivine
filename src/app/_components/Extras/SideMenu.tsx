import { MoveRight, X } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type Props = {
    setMenuOpen: (params: boolean) => void;
    menuOpen: boolean;
}

export default function SideMenu({ setMenuOpen, menuOpen }: Props) {

    const products = [];
    const buttonRef = useRef<HTMLAnchorElement | null>(null);
    const rightIconRef = useRef<HTMLSpanElement | null>(null);
    const rightArrow = useRef<SVGSVGElement | null>(null);
    const leftArrow = useRef<SVGSVGElement | null>(null);

    const handleButtonEnter = () => {
        gsap.to(rightIconRef.current, {
            scale: 1.09,
            duration: 0.2,
        });

        gsap.to(rightArrow.current, {
            x: 40,
            duration: 0.7,
            ease: 'power4.out',
            opacity: 0,
        });

        gsap.to(leftArrow.current, {
            x: 40,
            duration: 0.7,
            ease: 'power4.out',
            opacity: 1,
        });
    }

    const handleButtonLeave = () => {
        gsap.to(rightIconRef.current, {
            scale: 1,
            duration: 0.2,
        });

        gsap.to(rightArrow.current, {
            x: 0,
            duration: 0.7,
            ease: 'power4.out',
            opacity: 1,
        });

        gsap.to(leftArrow.current, {
            x: 0,
            duration: 0.7,
            ease: 'power4.out',
            opacity: 0,
        });
    }

    return (
        <>
            <section onClick={() => setMenuOpen(false)} className={`w-full h-screen bg-black/40 z-[9999] ${menuOpen ? "fixed" : "hidden"} transition-all duration-700 ease-in-out ${menuOpen ? "opacity-100" : "opacity-0"}`}></section>
            <div className={`fixed z-[99999] w-1/3 h-screen bg-zinc-50 transition-all duration-700 ease-in-out ${menuOpen ? "right-0" : "right-[-100%]"}`}>
                <div className="w-full h-[10%] flex justify-between items-center px-14">
                    <h1 className="text-4xl text-zinc-700">Cart<sup className="text-xl">({products.length})</sup></h1>
                    <X onClick={() => setMenuOpen(false)} className="w-9 h-9 cursor-pointer transition-transform duration-400 hover:rotate-180 text-zinc-700" strokeWidth={1.5} />
                </div>
                <div className="h-[90%] w-full flex flex-col justify-center items-center gap-4">
                    <div className="text-3xl">
                        <h1 className="text-center text-[3.5rem] text-zinc-700 leading-7">Your cart is</h1>
                        <h1 className="text-center font-editorialNew text-[3.5rem] text-zinc-700 leading-20 tracking-tighter">empty</h1>
                    </div>
                    <div className="w-full flex justify-center">
                        <Link ref={buttonRef} onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} href={'/products'} className="w-[60%] h-[3rem] cursor-pointer rounded-4xl border border-[#c4c4c4] relative flex justify-center items-center">
                            <h1 className="text-zinc-700 underline text-xs tracking-wider">BROWSE PRODUCTS</h1>
                            <span ref={rightIconRef} className="w-9 h-9 overflow-hidden bg-zinc-700 rounded-full absolute right-2 flex justify-center items-center"><MoveRight ref={rightArrow} className="text-zinc-50 absolute w-3.5" /><MoveRight ref={leftArrow} className="text-zinc-50 right-14 w-3.5 absolute" /></span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}