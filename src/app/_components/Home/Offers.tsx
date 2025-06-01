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
    const animated = useAnimation((s) => s.hasAnimated('home-journal'));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const [arrowHovered, setArrowHovered] = useState(false);

    useGSAP(() => {
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
        <section ref={screenRef} className="w-full h-[125vh] flex relative overflow-hidden">
            <div className="w-[50.1%] h-full flex flex-col justify-end absolute left-0 inset-0 bg-zinc-50 z-10">
                <Image className="select-none ml-20" src={'/images/hanna-balan-d1GwyeOlZDw-unsplash.jpg'} width={230} height={230} alt="image"></Image>
                <div className="h-1/2 w-full p-20">
                    <span className="select-none text-zinc-400 text-xs font-semibold text-center tracking-wide py-0.5 px-8 rounded-full border">QUALITY</span>
                    <h1 className="text-4xl text-zinc-700 mt-4 tracking-tight w-2/3">Only proven Ingredients, quality over quantity always!</h1>
                    <p className="mt-4 text-sm text-zinc-400 leading-4 w-2/3">Its about what we don't put in. Squeaky clean formulas with over 1500 Negative Ingredients.</p>
                </div>
            </div>
            <div className="w-[49.9%] h-full bg-transparent">
                <div className="absolute z-20 left-[50.1%]">
                    <div className="h-[300px] flex justify-between w-[49.9vw] p-12">
                        <div className="">
                            <div className="overflow-hidden">
                                <h1 className="text-6xl font-semibold text-zinc-700">EXCITING</h1>
                            </div>
                            <div className="overflow-hidden">
                                <h1 className="text-6xl font-semibold text-zinc-700">OFFERS <span className={`${EditorialNew.className} font-normal`}>awaits</span></h1>
                            </div>
                            <div className="overflow-hidden">
                                <p className="mt-4 text-sm text-zinc-600 leading-4 w-2/3" data-v-7cc9f5eb="">Shop now to get a chance to win 2 extra products. Grab the offer before it ends.</p>
                            </div>
                        </div>
                        <div className="pr-10">
                            <Link href='/philosophy'>
                                <div onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} className="relative cursor-pointer -rotate-45">
                                    <ArrowButton hover={arrowHovered} varient="lg" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <Image ref={imageRef} className="absolute -top-[550px] scale-125 select-none inset-0 object-contain z-0" src={'/images/gold-perfume.jpg'} alt="perfume" height={2000} width={2000}></Image>
            </div>
        </section>
    )
}