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
        <section ref={sectionRef} className="w-full xl:h-[160vh] lg:h-[140vh] h-[110vh] lg:pt-32 bg-[#eeeeee] overflow-hidden">
            <div className="w-full flex flex-col justify-center items-center lg:h-3/5 sm:h-[55%] h-[30%]">
                <div className="flex overflow-hidden relative sm:justify-center justify-start items-center w-full">
                    <h1 ref={title1} className="xl:text-[10rem] lg:text-[8rem] md:  -[6rem] text-[4rem] leading-none text-zinc-700 font-semibold sm:flex hidden flex-col items-center tracking-tight">RADICAL</h1>
                    <span className="sm:absolute xl:left-48 lg:left-32 left-7 md:left-14 bottom-6 select-none text-zinc-400 xl:text-xs text-[10px] font-semibold text-center tracking-wide py-0.5 xl:px-12 px-8 sm:mx-0 mx-7 sm:my-0 my-3 rounded-full border">ETHOS</span>
                </div>
                <div className="flex overflow-hidden justify-center items-center">
                    <h1 ref={title2} className="xl:text-[10rem] lg:text-[8rem] md:text-[6rem] text-[4rem] lg:leading-28 md:leading-20 leading-12 lg:pb-8 pb-5 text-zinc-700 font-semibold sm:flex hidden flex-col items-center tracking-tight">TRANSPARENCY.</h1>
                </div>
                <div className="flex w-full items-center">
                    <div className="w-[45%] sm:flex hidden justify-center lg:pr-42">
                        <Link href='/philosophy'>
                            <div onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} className="relative cursor-pointer w-max h-max -rotate-45">
                                <ArrowButton hover={arrowHovered} varient="lg" />
                            </div>
                        </Link>
                        <Link href='/philosophy'>
                            <p onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} className="text-zinc-500 text-xs px-8 pt-6 tracking-wide font-semibold underline">OUR <br />PHILOSOPHY</p>
                        </Link>
                    </div>
                    <div className="sm:w-[55%] overflow-hidden">
                        <h1 ref={title3} className={`${EditorialNew.className} xl:text-[10rem] lg:text-[8rem] md:text-[6rem] text-[3.5rem] lg:leading-28 md:leading-20 leading-12 lg:pt-8 pt-2 sm:px-4.5 px-7 text-zinc-700 font-normal tracking-tight`}>HIDE</h1>
                    </div>
                </div>
                <div className="flex sm:justify-end justify-start w-full items-center">
                    <div className="sm:w-[55%] overflow-hidden">
                        <h1 ref={title4} className="xl:text-[10rem] lg:text-[8rem] md:text-[6rem] text-[3.5rem] lg:leading-28 md:leading-20 leading-12 pb-4 text-zinc-700 font-semibold sm:px:0 px-7 tracking-tight">NOTHING.</h1>
                    </div>
                </div>
            </div>
            <div className="w-full lg:pt-20 pt-9 flex justify-end lg:h-2/5 relative">
                <Image ref={flowerRef} className="absolute sm:block hidden select-none left-1/6 sm:-top-20 -top-0 xl:w-[500px] lg:w-[400px] xl:h-[500px] lg:h-[400px] md:w-[300px] md:h-[300px] w-[230px] h-[230px]" src={'/images/pink-flower.png'} alt="flower" height={500} width={500} />
                <Image className="absolute select-none sm:hidden block left-1/6 -top-14 xl:w-[500px] lg:w-[400px] xl:h-[500px] lg:h-[400px] md:w-[300px] md:h-[300px] w-[230px] h-[230px]" src={'/images/pink-flower.png'} alt="flower" height={500} width={500} />
                <div className="xl:w-[45%] lg:w-[55%] sm:w-[60%] sm:px-0 px-7 sm:pt-0 pt-40 sm:space-y-5 space-y-15 h-full">
                    <div className="flex sm:flex-row flex-col w-full justify-between">
                        <div className="flex gap-3 sm:w-1/2">
                            <Image width={40} height={40} className="w-10 select-none h-10" src="/images/icon-highest-standards.svg" alt="icons" />
                            <h4 className={`text-zinc-600 ${EditorialNew.className} sm:text-sm text-2xl`}>
                                100% Transparent <br />
                                Formulas
                            </h4>
                        </div>
                        <div className="flex flex-col sm:w-1/2 sm:pl-0 pl-13">
                            <h1 className="text-xs text-zinc-700 font-semibold">Highest standards</h1>
                            <p className="text-xs text-zinc-400 leading-3.5 sm:pr-16 pt-1">At Zolivine, we craft every fragrance with a focus on safety, purity, and quality. Our formulas use only skin-friendly ingredients — free from 1800+ harmful substances — for a luxurious, clean experience.</p>
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col w-full justify-between">
                        <div className="flex gap-3 sm:w-1/2">
                            <Image width={40} height={40} className="w-10 select-none h-10" src="/images/icon-real-results.svg" alt="icons" />
                            <h4 className={`text-zinc-600 ${EditorialNew.className} sm:text-sm text-2xl`}>
                                Only Verified <br />
                                Ingredients
                            </h4>
                        </div>
                        <div className="flex flex-col sm:w-1/2 sm:pl-0 pl-13">
                            <h1 className="text-xs text-zinc-700 font-semibold"> Real Scents. Real Results.</h1>
                            <p className="text-xs text-zinc-400 leading-3.5 sm:pr-16 pt-1">Our perfumes feature long-lasting, balanced notes that blend with your body chemistry. No harsh trails — just refined, soul-stirring aromas that evolve beautifully.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}