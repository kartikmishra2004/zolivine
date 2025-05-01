"use client"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {

    const [loading, setLoading] = useState(true);
    const leftBgRef = useRef(null);
    const rightBgRef = useRef(null);
    const lineRef = useRef(null);
    const logo1Ref = useRef(null);
    const logo2Ref = useRef(null);

    useEffect(() => {

        if (loading) {
            document.body.style.position = "fixed";
        }

        setTimeout(() => {
            setLoading(false);
            document.body.style.position = "static";
        }, 2700);

    }, [loading]);

    useGSAP(() => {
        const tl = gsap.timeline();

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

    return (
        <>
            <section ref={leftBgRef} className="fixed top-0 left-0 overflow-hidden z-50 h-screen w-1/2 bg-zinc-800"> </section>
            <div className="w-full h-screen flex justify-center items-center fixed z-[9999]">
                <span className="overflow-hidden">
                    <h1 ref={logo1Ref} className="font-playball -translate-y-[100%] text-5xl text-zinc-50 px-0.5">Zoli</h1>
                </span>
                <span className="overflow-hidden">
                    <h1 ref={logo2Ref} className="font-playball translate-y-[100%] text-5xl text-zinc-50">vine</h1>
                </span>
            </div>
            <span ref={lineRef} className="h-screen w-[1px] bg-zinc-400 z-[9999] top-[-100%] fixed left-1/2"></span>
            <section ref={rightBgRef} className="fixed top-0 right-0 overflow-hidden z-50 h-screen w-1/2 bg-zinc-800"></section>
        </>
    )
}