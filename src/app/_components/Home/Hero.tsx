"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLoading } from '@/app/_context/LoadingContext';
import ArrowButton from "../Extras/ArrowButton";
import { EditorialNew } from "@/utils/fonts";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const { loading } = useLoading();
    const heroTitle1Ref = useRef<HTMLDivElement | null>(null);
    const heroTitle2Ref = useRef<HTMLDivElement | null>(null);
    const heroPara1Ref = useRef<HTMLParagraphElement | null>(null);
    const heroPara2Ref = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLAnchorElement | null>(null);
    const ScreenRef = useRef<HTMLElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [arrowHovered, setArrowHovered] = useState<boolean>(false);
    const hasAnimated = useRef(false);

    useGSAP(() => {
        if (!loading) {
            if (!hasAnimated.current) {
                hasAnimated.current = true;

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

                gsap.to(heroTitle1Ref.current, {
                    y: 0,
                    duration: 1,
                });

                gsap.to(heroTitle2Ref.current, {
                    y: 0,
                    duration: 0.9,
                    delay: 0.2,
                });

                gsap.to(heroPara1Ref.current, {
                    y: 0,
                    duration: 0.9,
                    delay: 0.2,
                });

                gsap.to(heroPara2Ref.current, {
                    y: 0,
                    duration: 0.9,
                    delay: 0.2,
                });

                gsap.to(buttonRef.current, {
                    scale: 1,
                    delay: 0.3,
                    duration: 1.5,
                    ease: 'power4.out',
                });

            } else {
                gsap.set(heroTitle1Ref.current, { y: 0 });
                gsap.set(heroTitle2Ref.current, { y: 0 });
                gsap.set(heroPara1Ref.current, { y: 0 });
                gsap.set(heroPara2Ref.current, { y: 0 });
                gsap.set(buttonRef.current, { scale: 1 });
            }
        }
    }, [loading]);


    return (
        <section ref={ScreenRef} className="relative overflow-hidden h-screen">
            <video ref={videoRef} className="w-full absolute h-screen object-cover z-0" autoPlay loop muted playsInline preload="metadata">
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="w-full relative h-screen flex justify-between flex-col items-center z-10">
                <div className="flex justify-center items-center flex-col gap-3 mt-36">
                    <h1 className="text-[5.5rem] text-zinc-50 font-semibold leading-20 flex flex-col items-center tracking-tighter">
                        <div className="overflow-hidden h-22 w-max">
                            <div ref={heroTitle1Ref} className="translate-y-24">
                                <span className={`tracking-tighter font-normal ${EditorialNew.className}`}>True</span> to Essence,
                            </div>
                        </div>
                        <div className="overflow-hidden b h-22 w-max px-2">
                            <div ref={heroTitle2Ref} className="translate-y-24">
                                kind to <span className={`tracking-tighter font-normal ${EditorialNew.className}`}>Nature</span>
                            </div>
                        </div>
                    </h1>
                    <div className="">
                        <div className="overflow-hidden">
                            <p ref={heroPara1Ref} className="text-zinc-50 translate-y-24 text-xs font-thin w-[18rem] text-center tracking">Natural perfumes crafted with rare botanicals, golden </p>
                        </div>
                        <div className="overflow-hidden">
                            <p ref={heroPara2Ref} className="text-zinc-50 translate-y-24 text-xs font-thin w-[18rem] text-center tracking"> notes, and timeless, sustainable elegance.</p>
                        </div>
                    </div>
                </div>
                <Link onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} href={'/products'} ref={buttonRef} className="w-[47vw] scale-0 h-[3.7rem] cursor-pointer rounded-4xl bg-zinc-50 relative flex justify-center items-center mb-10">
                    <h1 className="text-zinc-700 underline text-xs tracking-wider">EXPLORE ALL PRODUCTS</h1>
                    <ArrowButton hover={arrowHovered} />
                </Link>
            </div>
        </section>
    )
}