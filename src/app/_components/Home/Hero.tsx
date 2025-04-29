"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MoveRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

    const heroTitle1Ref = useRef(null);
    const heroTitle2Ref = useRef(null);
    const heroPara1Ref = useRef(null);
    const heroPara2Ref = useRef(null);
    const buttonRef = useRef(null);
    const ScreenRef = useRef(null);
    const videoRef = useRef(null);
    const rightIconRef = useRef(null);
    const rightArrow = useRef(null);
    const leftArrow = useRef(null);

    useGSAP(() => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ScreenRef.current,
                start: "top 0%",
                scrub: true,
            }
        });

        tl.to(videoRef.current, {
            y: 350,
        });

        gsap.from(heroTitle1Ref.current, {
            y: 100,
            duration: 1,
        });

        gsap.from(heroTitle2Ref.current, {
            y: 100,
            duration: 0.9,
            delay: 0.2
        });

        gsap.from(heroPara1Ref.current, {
            y: 100,
            duration: 0.9,
            delay: 0.2
        });

        gsap.from(heroPara2Ref.current, {
            y: 100,
            duration: 0.9,
            delay: 0.2
        });

        gsap.from(buttonRef.current, {
            scale: 0,
            delay: 0.3,
            duration: 1.5,
            ease: 'power4.out',
        });
    });

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
        <section ref={ScreenRef} className="relative overflow-hidden h-screen">
            <video ref={videoRef} className="w-full absolute h-screen object-cover z-0" autoPlay loop muted playsInline preload="metadata">
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="w-full relative h-screen flex justify-between flex-col items-center z-10">
                <div className="flex justify-center items-center flex-col gap-3 mt-36">
                    <h1 className="text-[5.5rem] text-zinc-50 font-semibold leading-20 flex flex-col items-center tracking-tighter">
                        <div className="overflow-hidden h-22 w-max">
                            <div ref={heroTitle1Ref} className="">
                                <span className="font-editorialNew">True</span> to Essence,
                            </div>
                        </div>
                        <div className="overflow-hidden b h-22 w-max">
                            <div ref={heroTitle2Ref} className="">
                                kind to <span className="font-editorialNew">Nature</span>
                            </div>
                        </div>
                    </h1>
                    <div className="">
                        <div className="overflow-hidden">
                            <p ref={heroPara1Ref} className="text-zinc-50 text-xs font-thin w-[18rem] text-center tracking">Natural perfumes crafted with rare botanicals, golden </p>
                        </div>
                        <div className="overflow-hidden">
                            <p ref={heroPara2Ref} className="text-zinc-50 text-xs font-thin w-[18rem] text-center tracking"> notes, and timeless, sustainable elegance.</p>
                        </div>
                    </div>
                </div>
                <Link onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} href={'/products'} ref={buttonRef} className="w-[47vw] h-[3.7rem] cursor-pointer rounded-4xl bg-zinc-50 relative flex justify-center items-center mb-10">
                    <h1 className="text-zinc-700 underline text-xs tracking-wider">EXPLORE ALL PRODUCTS</h1>
                    <span ref={rightIconRef} className="w-12 h-12 overflow-hidden bg-zinc-700 rounded-full absolute right-2 flex justify-center items-center"><MoveRight ref={rightArrow} className="text-zinc-50 absolute w-3.5" /><MoveRight ref={leftArrow} className="text-zinc-50 right-14 w-3.5 absolute" /></span>
                </Link>
            </div>

        </section>
    )
}