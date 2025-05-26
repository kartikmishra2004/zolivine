"use client"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useLoading } from '@/app/_context/LoadingContext';
import { lobster } from "@/utils/fonts";

export default function Preloader() {
    const { loading } = useLoading();
    const leftBgRef = useRef(null);
    const rightBgRef = useRef(null);
    const lineRef = useRef(null);
    const logo1Ref = useRef(null);
    const logo2Ref = useRef(null);
    const leftCounterRef = useRef(null);
    const rightCounterRef = useRef(null);
    const spinnerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Left counter
        tl.to(leftCounterRef.current, {
            y: -128,
            duration: 0.5,
            ease: "power4.inOut"
        }, 'c1');
        tl.to(leftCounterRef.current, {
            y: -256,
            duration: 0.5,
            ease: "power4.inOut",
            delay: 0.3,
        }, 'c2');
        tl.to(leftCounterRef.current, {
            y: -384,
            duration: 0.5,
            ease: "power4.inOut",
            delay: 0.3,
        }, 'c3');

        // Right counter
        tl.to(rightCounterRef.current, {
            y: -128,
            duration: 0.5,
            delay: 0.03,
            ease: "power4.inOut"
        }, 'c1');
        tl.to(rightCounterRef.current, {
            y: -256,
            duration: 0.5,
            delay: 0.33,
            ease: "power4.inOut",
        }, 'c2');
        tl.to(rightCounterRef.current, {
            y: -384,
            duration: 0.5,
            delay: 0.33,
            ease: "power4.inOut",
        }, 'c3');
        tl.to(rightCounterRef.current, {
            y: -512,
            duration: 0.5,
            ease: "power4.inOut",
            delay: 0.3
        }, 'c4');

        // FINNAL  COUNTER
        tl.to(leftCounterRef.current, {
            y: -512,
            duration: 0.5,
            ease: "power4.inOut"
        }, 'logoIn');
        tl.to(rightCounterRef.current, {
            y: -660,
            duration: 0.5,
            delay: 0.03,
            ease: "power4.inOut"
        }, 'logoIn');

        tl.to(spinnerRef.current, {
            opacity: 0,
            duration: 0.5,
        }, 'logoIn');


        // LOGO
        tl.to(logo1Ref.current, {
            transform: "translateY(0)",
            duration: 1,
            ease: 'power4.inOut',
        }, 'logoIn');

        tl.to(logo2Ref.current, {
            transform: "translateY(0)",
            duration: 1,
            ease: 'power4.inOut',
        }, 'logoIn');

        tl.to(lineRef.current, {
            top: '0%',
            duration: 0.7,
            ease: 'power4.inOut',
        }, 'line');

        tl.to(logo1Ref.current, {
            transform: "translateY(100%)",
            duration: 0.5,
            ease: 'power4.inOut',
        }, 'x');

        tl.to(logo2Ref.current, {
            transform: "translateY(-100%)",
            duration: 0.5,
            ease: 'power4.inOut',
        }, 'x');

        tl.to(lineRef.current, {
            opacity: 0,
            duration: 0.4,
        }, 'x');

        tl.to(leftBgRef.current, {
            top: '-100%',
            duration: 1,
            ease: 'power4.inOut',
        }, 'x');

        tl.to(rightBgRef.current, {
            top: '-100%',
            duration: 1,
            delay: 0.1,
            ease: 'power4.inOut'
        }, 'x');
    });

    if (loading) {
        return (
            <>
                <section ref={leftBgRef} className="fixed top-0 left-0 overflow-hidden z-50 h-screen w-1/2 bg-zinc-800"> </section>
                <div className={`w-full h-screen flex justify-center items-center fixed z-[9999]`}>
                    <span className="overflow-hidden">
                        <h1 ref={logo1Ref} className={`${lobster.className} -translate-y-[100%] text-6xl text-zinc-50 px-0.5`}>Zoli</h1>
                    </span>
                    <div className="flex absolute top-[40%] h-[8rem] overflow-hidden">
                        <span ref={leftCounterRef} className="">
                            <h1 className="text-9xl font-semibold italic text-zinc-50">0</h1>
                            <h1 className="text-9xl font-semibold italic text-zinc-50">2</h1>
                            <h1 className="text-9xl font-semibold italic text-zinc-50">6</h1>
                            <h1 className="text-9xl font-semibold italic text-zinc-50">9</h1>
                        </span>
                        <span ref={rightCounterRef} className="">
                            <h1 className="text-9xl font-semibold italic text-zinc-50">0</h1>
                            <h1 className="text-9xl font-semibold italic text-zinc-50">5</h1>
                            <h1 className="text-9xl font-semibold italic text-zinc-50">7</h1>
                            <h1 className="text-9xl font-semibold italic text-zinc-50">8</h1>
                            <h1 className="text-9xl font-semibold italic text-zinc-50">9</h1>
                        </span>
                    </div>
                    <div ref={spinnerRef} className="w-8 h-8 border-zinc-50 border-t animate-spin absolute bottom-40 rounded-full"></div>
                    <span className="overflow-hidden">
                        <h1 ref={logo2Ref} className={`${lobster.className} translate-y-[100%] text-6xl text-zinc-50 px-0.5`}>vine</h1>
                    </span>
                </div>
                <span ref={lineRef} className="h-screen w-[1px] bg-zinc-400 z-[9999] top-[-100%] fixed left-1/2"></span>
                <section ref={rightBgRef} className="fixed top-0 right-0 overflow-hidden z-50 h-screen w-1/2 bg-zinc-800"></section>
            </>
        )
    } else {
        return null;
    }

}