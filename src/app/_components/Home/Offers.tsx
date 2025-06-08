'use client'
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { EditorialNew } from "@/utils/fonts";
import Link from "next/link";
import ArrowButton from "../Extras/ArrowButton";
import { useAnimation } from "@/app/_context/AnimationContext";

gsap.registerPlugin(ScrollTrigger);

export default function Offers() {

    const screenRef = useRef(null);
    const imageRef = useRef(null);
    const title1Ref = useRef(null);
    const title2Ref = useRef(null);
    const animated = useAnimation((s) => s.hasAnimated('home-offers'));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const [arrowHovered, setArrowHovered] = useState(false);

    useGSAP(() => {

        if (!animated) {
            gsap.from(title1Ref.current, {
                scrollTrigger: {
                    trigger: screenRef.current,
                    start: '-65%',
                },
                y: 60,
            });

            gsap.from(title2Ref.current, {
                scrollTrigger: {
                    trigger: screenRef.current,
                    start: '-65%',
                },
                y: 60,
                delay: 0.2,
                onComplete: () => setAnimated('home-offers', true)
            });
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: screenRef.current,
                start: '-80%',
                scrub: true,
            }
        });

        tl.to(imageRef.current, {
            y: 450,
            ease: 'none',
        }, 'image');
    });

    return (
        <section ref={screenRef} className="w-full sm:h-[120vh] h-[95vh] sm:flex relative sm:overflow-hidden">
            <div className="sm:w-[50.1%] w-full h-full flex flex-col justify-end sm:absolute left-0 inset-0 bg-zinc-50 z-10 sm:pt-0 pt-20">
                <Image className="select-none lg:ml-20 ml-7 " src={'/images/hanna-balan-d1GwyeOlZDw-unsplash.jpg'} width={230} height={230} alt="image"></Image>
                <div className="h-1/2 w-full lg:p-20 p-7">
                    <span className="select-none text-zinc-400 text-xs font-semibold text-center tracking-wide py-0.5 px-8 rounded-full border">QUALITY</span>
                    <h1 className="xl:text-4xl lg:text-3xl text-2xl text-zinc-700 mt-4 tracking-tight xl:w-2/3 w-4/5">Only proven Ingredients, quality over quantity always!</h1>
                    <p className="mt-4 text-sm text-zinc-400 leading-4 xl:w-2/3 w-4/5">Its about what we don&apos;t put in. Squeaky clean formulas with over 1500 Negative Ingredients.</p>
                </div>
            </div>
            <div className="w-[49.9%] sm:block hidden h-full bg-transparent">
                <div className="absolute z-20 left-[50.1%]">
                    <div className="h-[300px] flex justify-between w-[49.9vw] lg:p-12 p-7">
                        <div className="">
                            <div className="overflow-hidden">
                                <h1 ref={title1Ref} className="xl:text-6xl lg:text-5xl text-4xl font-semibold text-zinc-700">EXCITING</h1>
                            </div>
                            <div className="overflow-hidden">
                                <h1 ref={title2Ref} className="xl:text-6xl lg:text-5xl text-4xl font-semibold text-zinc-700">OFFERS <span className={`${EditorialNew.className} font-normal`}>awaits</span></h1>
                            </div>
                            <div className="overflow-hidden">
                                <p className="mt-4 text-sm text-zinc-600 leading-4 w-2/3" data-v-7cc9f5eb="">Shop now to get a chance to win 2 extra products. Grab the offer before it ends.</p>
                            </div>
                        </div>
                        <div className="pr-10">
                            <Link href='/products'>
                                <div onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} className="relative cursor-pointer -rotate-45">
                                    <ArrowButton hover={arrowHovered} varient="lg" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <Image ref={imageRef} className="absolute xl:-top-[550px] lg:-top-[350px] -top-[200px] scale-125 select-none inset-0 object-contain z-0" src={'/images/gold-perfume.jpg'} alt="perfume" height={2000} width={2000}></Image>
            </div>
            <div className="sm:hidden block w-full bg-zinc-50 relative mt-24">
                <Image className="select-none object-contain absolute left-[-50%] scale-200 z-0" src={'/images/gold-perfume.jpg'} alt="perfume" height={2000} width={2000}></Image>
                <div className="absolute -top-32 flex justify-between w-full p-7">
                    <div className="">
                        <div className="">
                            <h1 className="text-3xl font-semibold text-zinc-700">EXCITING</h1>
                        </div>
                        <div className="">
                            <h1 className="text-3xl font-semibold text-zinc-700">OFFERS <span className={`${EditorialNew.className} font-normal`}>awaits</span></h1>
                        </div>
                        <div className="">
                            <p className="mt-2 text-sm text-zinc-600 leading-4 w-2/3" data-v-7cc9f5eb="">Shop now to get a chance to win 2 extra products. Grab the offer before it ends.</p>
                        </div>
                    </div>
                    <div className="">
                        <Link href='/products'>
                            <div onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} className="relative cursor-pointer -rotate-45">
                                <ArrowButton hover={arrowHovered} varient="lg" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}