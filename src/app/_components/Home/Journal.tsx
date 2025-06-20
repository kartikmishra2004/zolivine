'use client'
import Image from "next/image";
import Link from "next/link";
import { EditorialNew } from "@/utils/fonts";
import ArrowButton from "../Extras/ArrowButton";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAnimation } from "@/app/_context/AnimationContext";

gsap.registerPlugin(ScrollTrigger);

export default function Journal() {

    const [arrowHovered, setArrowHovered] = useState(false);
    const animated = useAnimation((s) => s.hasAnimated('home-journal'));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const screenRef = useRef(null);
    const title1Ref = useRef(null);
    const title2Ref = useRef(null);

    useGSAP(() => {
        if (!animated) {
            gsap.from(title1Ref.current, {
                scrollTrigger: {
                    trigger: screenRef.current,
                    start: '-60%',
                },
                y: 60,
            });

            gsap.from(title2Ref.current, {
                scrollTrigger: {
                    trigger: screenRef.current,
                    start: '-60%',
                },
                y: 60,
                delay: 0.2,
                onComplete: () => setAnimated('home-journal', true)
            });
        }
    });

    return (
        <section ref={screenRef} className="w-full flex sm:flex-row sm:pt-0 pt-[630px] flex-col p-7 sm:h-[120vh] bg-zinc-700">
            <div className="flex-col sm:hidden flex items-center w-full h-[200px]">
                <div className="overflow-hidden">
                    <h1 ref={title1Ref} className={`sm:text-7xl text-5xl sm:h-15 text-zinc-50 font-normal ${EditorialNew.className}`}>clean</h1>
                </div>
                <div className="overflow-hidden">
                    <h1 ref={title2Ref} className="sm:text-6xl text-4xl font-semibold text-zinc-50">JOURNAL</h1>
                </div>
                <p className="mt-4 sm:text-sm text-xs text-zinc-300 sm:leading-4 leading-3.5 sm:w-1/2 text-center">Fragrance tips, scent layering rituals, and conscious aroma choices for a more elevated, mindful lifestyle.</p>
            </div>
            <div className="sm:w-1/2 flex justify-center items-center h-full">
                <div className="lg:h-[700px] lg:w-[680px]">
                    <div className="w-full relative overflow-hidden">
                        <Link href={'/journal'}>
                            <Image className="cursor-pointer hover:scale-100 scale-105 transition-all ease-out duration-500" src={'/images/blowup.jpg'} alt="image" height={442} width={680} />
                        </Link>
                        <span className="absolute top-0 text-xs sm:mt-6 sm:ml-8 mt-4 ml-5 bg-zinc-50 px-6 rounded-full py-0.5 tracking-wider font-semibold text-zinc-700">FEATURED</span>
                    </div>
                    <div className="w-full bg-zinc-50 p-5">
                        <h1 className="text-2xl text-zinc-700 tracking-tight w-[90%]">Fragrance Traditions from Around the World: Notes and Rituals Worth Exploring</h1>
                        <p className="mt-4 text-sm text-zinc-400 leading-4 w-[90%]">Rooted in centuries of olfactory heritage and refined through modern aroma science, Zolivine perfumes blend time-honored rituals with safe, skin-loving ingredients — offering scents that are both luxurious and conscious of the planet.</p>
                        <div className="mt-4 pt-7 flex justify-between">
                            <h4 className="text-xs text-zinc-700">2 June 2025</h4>
                            <Link className="text-xs text-zinc-700 underline" href={'/journal'}>Read more</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:w-1/2 h-full">
                <div className="flex flex-col justify-center sm:pt-0 pt-20 items-center h-full">
                    <div className="flex-col sm:flex hidden justify-center items-center w-full h-[200px]">
                        <div className="overflow-hidden">
                            <h1 ref={title1Ref} className={`sm:text-7xl text-5xl sm:h-15 text-zinc-50 font-normal ${EditorialNew.className}`}>clean</h1>
                        </div>
                        <div className="overflow-hidden">
                            <h1 ref={title2Ref} className="sm:text-6xl text-4xl font-semibold text-zinc-50">JOURNAL</h1>
                        </div>
                        <p className="mt-4 sm:text-sm text-xs text-zinc-300 sm:leading-4 leading-3.5 sm:w-1/2 text-center">Fragrance tips, scent layering rituals, and conscious aroma choices for a more elevated, mindful lifestyle.</p>
                    </div>
                    <div className="w-full sm:h-[400px] sm:p-7">
                        <div className="flex sm:flex-row flex-col gap-4">
                            <div className="sm:w-1/2 overflow-hidden">
                                <div className="w-full overflow-hidden">
                                    <Link href={'/journal'}>
                                        <Image className="cursor-pointer hover:scale-100 scale-105 transition-all ease-out duration-500" src={'/images/man.jpg'} alt="image" height={442} width={680} />
                                    </Link>
                                </div>
                                <div className="w-full bg-zinc-50 p-5">
                                    <h1 className=" text-zinc-700 tracking-tight w-[90%]">How Your Fragrance Routine Impacts Mood & Well-Being</h1>
                                    <div className="mt-4 flex justify-between">
                                        <h4 className="text-xs text-zinc-700">2 June 2025</h4>
                                        <Link className="text-xs text-zinc-700 underline" href={'/journal'}>Read more</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:w-1/2 overflow-hidden">
                                <div className="w-full overflow-hidden">
                                    <Link href={'/journal'}>
                                        <Image className="cursor-pointer hover:scale-100 scale-105 transition-all ease-out duration-500" src={'/images/moa1.jpg'} alt="image" height={442} width={680} />
                                    </Link>
                                </div>
                                <div className="w-full bg-zinc-50 p-5">
                                    <h1 className=" text-zinc-700 tracking-tight w-[90%]">Ways to Make Your Perfume Habit More Eco-Friendly</h1>
                                    <div className="mt-4 flex justify-between">
                                        <h4 className="text-xs text-zinc-700">2 June 2025</h4>
                                        <Link className="text-xs text-zinc-700 underline" href={'/journal'}>Read more</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-[125px] flex justify-center pt-7">
                            <Link href='/journal'>
                                <div onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} className="relative cursor-pointer -rotate-45">
                                    <ArrowButton color="bg-zinc-50" hover={arrowHovered} varient="lg" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}