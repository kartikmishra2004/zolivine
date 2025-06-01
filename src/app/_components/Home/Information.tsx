'use client'
import { EditorialNew } from "@/utils/fonts";
import ArrowButton from "../Extras/ArrowButton";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useAnimation } from '@/app/_context/AnimationContext';
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);


export default function Information() {

    const animated = useAnimation((s) => s.hasAnimated('home-information'));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const [arrowHovered, setArrowHovered] = useState(false);
    const sectionRef = useRef(null);
    const title1 = useRef(null);
    const title2 = useRef(null);
    const title3 = useRef(null);
    const title4 = useRef(null);
    const flowerRef = useRef(null);

    useGSAP(() => {

        gsap.to(flowerRef.current, {
            scrollTrigger: {
                trigger: sectionRef.current,
                scrub: true,
                start: '-5%',
            },
            y: -300,
        })

        if (!animated) {

            gsap.from(title1.current, {
                y: 130,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: '-20%',
                }
            });
            gsap.from(title2.current, {
                y: 140,
                duration: 1.2,
                delay: 0.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: '-20%',
                }
            });
            gsap.from(title3.current, {
                y: 140,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.4,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: '-20%',
                }
            });
            gsap.from(title4.current, {
                y: 130,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.6,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: '-20%',
                },
                onComplete: () => setAnimated('home-information', true),
            });
        };

    });

    return (
        <section ref={sectionRef} className="w-full h-[160vh] pt-32 bg-[#eeeeee]">
            <div className="w-full flex flex-col justify-center items-center h-3/5">
                <div className="flex overflow-hidden relative justify-center items-center w-full">
                    <h1 ref={title1} className="text-[10rem] leading-none text-zinc-700 font-semibold flex flex-col items-center tracking-tight">RADICAL</h1>
                    <span className="absolute left-56 bottom-6 select-none text-zinc-400 text-xs font-semibold text-center tracking-wide py-0.5 px-12 rounded-full border">ETHOS</span>
                </div>
                <div className="flex overflow-hidden justify-center items-center">
                    <h1 ref={title2} className="text-[10rem] leading-28 pb-8 text-zinc-700 font-semibold flex flex-col items-center tracking-tight">TRANSPARENCY.</h1>
                </div>
                <div className="flex w-full items-center">
                    <div className="w-[45%] flex justify-center pr-42">
                        <Link href='/philosophy'>
                            <div onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} className="relative cursor-pointer w-max h-max -rotate-45">
                                <ArrowButton hover={arrowHovered} varient="lg" />
                            </div>
                        </Link>
                        <Link href='/philosophy'>
                            <p onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} className="text-zinc-500 text-xs px-8 pt-6 tracking-wide font-semibold underline">OUR <br />PHILOSOPHY</p>
                        </Link>
                    </div>
                    <div className="w-[55%] overflow-hidden">
                        <h1 ref={title3} className={`${EditorialNew.className} text-[10rem] leading-28 pt-8 px-4.5 text-zinc-700 font-normal tracking-tight`}>HIDE</h1>
                    </div>
                </div>
                <div className="flex justify-end w-full items-center">
                    <div className="w-[55%] overflow-hidden">
                        <h1 ref={title4} className="text-[10rem] leading-28 pb-4 text-zinc-700 font-semibold tracking-tight">NOTHING.</h1>
                    </div>
                </div>
            </div>
            <div className="w-full pt-20 flex justify-end h-2/5 relative">
                <Image ref={flowerRef} className="absolute select-none left-1/6 -top-20" src={'/images/pink-flower.png'} alt="flower" height={500} width={500} />
                <div className="w-[45%] space-y-5 h-full">
                    <div className="flex w-full justify-between">
                        <div className="flex gap-3 w-1/2">
                            <Image width={40} height={40} className="w-10 select-none h-10" src="/images/icon-highest-standards.svg" alt="icons" />
                            <h4 className={`text-zinc-600 ${EditorialNew.className} text-sm`}>
                                100% Transparent <br />
                                Formulas
                            </h4>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <h1 className="text-xs text-zinc-700 font-semibold">Highest standards</h1>
                            <p className="text-xs text-zinc-400 leading-3.5 pr-16 pt-1">At Zolivine, we craft every fragrance with a focus on safety, purity, and quality. Our formulas use only skin-friendly ingredients — free from 1800+ harmful substances — for a luxurious, clean experience.</p>
                        </div>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="flex gap-3 w-1/2">
                            <Image width={40} height={40} className="w-10 select-none h-10" src="/images/icon-real-results.svg" alt="icons" />
                            <h4 className={`text-zinc-600 ${EditorialNew.className} text-sm`}>
                                Only Verified <br />
                                Ingredients
                            </h4>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <h1 className="text-xs text-zinc-700 font-semibold"> Real Scents. Real Results.</h1>
                            <p className="text-xs text-zinc-400 leading-3.5 pr-16 pt-1">Our perfumes feature long-lasting, balanced notes that blend with your body chemistry. No harsh trails — just refined, soul-stirring aromas that evolve beautifully.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}