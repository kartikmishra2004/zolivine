"use client"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {

    const [loading, setLoading] = useState(true);
    const leftBgRef = useRef(null);
    const rightBgRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {

        if (loading) {
            document.body.style.position = "fixed";
        }

        setTimeout(() => {
            setLoading(false);
            document.body.style.position = "static";
        }, 1700);

    }, [loading]);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.to(lineRef.current, {
            top: '0%',
            duration: 0.7,
            ease: 'power4.inOut',
        }, 'line');

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
            <section ref={leftBgRef} className="fixed top-0 left-0 overflow-hidden z-50 h-screen w-1/2 bg-zinc-700"> </section>
            <span ref={lineRef} className="h-screen w-[1px] bg-zinc-400 z-[9999] top-[-100%] fixed left-1/2"></span>
            <section ref={rightBgRef} className="fixed top-0 right-0 overflow-hidden z-50 h-screen w-1/2 bg-zinc-700"></section>
        </>
    )
}