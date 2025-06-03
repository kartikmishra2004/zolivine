"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLoading } from '@/app/_context/LoadingContext';
import ArrowButton from "../Extras/ArrowButton";
import { EditorialNew } from "@/utils/fonts";
import { useAnimation } from '@/app/_context/AnimationContext';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {

    const animated = useAnimation((s) => s.hasAnimated('home-hero'));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const { loading } = useLoading();
    const heroTitle1Ref = useRef<HTMLDivElement | null>(null);
    const heroTitle2Ref = useRef<HTMLDivElement | null>(null);
    const heroPara1Ref = useRef<HTMLParagraphElement | null>(null);
    const heroPara2Ref = useRef<HTMLParagraphElement | null>(null);
    const buttonRef = useRef<HTMLAnchorElement | null>(null);
    const ScreenRef = useRef<HTMLElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [arrowHovered, setArrowHovered] = useState<boolean>(false);

    useGSAP(() => {
        if (!loading) {
            if (!animated) {

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
                    onComplete: () => setAnimated('home-hero', true)
                });

            } else {
                gsap.set(heroTitle1Ref.current, { y: 0 });
                gsap.set(heroTitle2Ref.current, { y: 0 });
                gsap.set(heroPara1Ref.current, { y: 0 });
                gsap.set(heroPara2Ref.current, { y: 0 });
                gsap.set(buttonRef.current, { scale: 1 });
            }

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
        }
    }, [loading]);


    return (
        <section ref={ScreenRef} className="relative overflow-hidden sm:h-screen h-[94vh]">
            <video ref={videoRef} className="w-full absolute sm:h-screen h-[94vh] object-cover z-0" autoPlay loop muted playsInline preload="auto" poster="/images/hero-poster.png">
                <source src="/videos/hero-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="w-full relative sm:h-screen h-[94vh] flex justify-between flex-col items-center z-10">
                <div className="flex justify-center items-center flex-col gap-3 mt-36 pt-20 lg:pt-0">
                    <h1 className="lg:text-[5.5rem] md:text-7xl sm:text-6xl text-[2.5rem] text-zinc-50 font-semibold lg:leading-20 md:leading-15 sm:leading-12 leading-9.5 flex flex-col items-center tracking-tighter">
                        <div className="overflow-hidden lg:h-22 w-max">
                            <div ref={heroTitle1Ref} className="translate-y-24">
                                <span className={`tracking-tighter font-normal ${EditorialNew.className}`}>True</span> to Essence,
                            </div>
                        </div>
                        <div className="overflow-hidden b lg:h-22 w-max px-2">
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
                <Link onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} href={'/products'} ref={buttonRef} className="sm:w-[47vw] w-4/5 scale-0 sm:h-[3.7rem] h-[3rem] cursor-pointer rounded-4xl bg-zinc-50 relative flex justify-center items-center mb-20 sm:mb-10">
                    <h1 className="text-zinc-700 underline sm:text-xs text-[10px] tracking-wider">EXPLORE ALL PRODUCTS</h1>
                    <ArrowButton className="sm:flex hidden" hover={arrowHovered} />
                    <ArrowButton varient="sm" className="sm:hidden flex" hover={arrowHovered} />
                </Link>
            </div>
        </section>
    )
}