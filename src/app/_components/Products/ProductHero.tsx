'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { EditorialNew } from "@/utils/fonts";
import { useAnimation } from '@/app/_context/AnimationContext';

gsap.registerPlugin(ScrollTrigger);

export default function ProductHero() {
    const animated = useAnimation((s) => s.hasAnimated('products-hero'));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const screenRef = useRef<HTMLElement | null>(null);
    const title1Ref = useRef<HTMLDivElement | null>(null);
    const title2Ref = useRef<HTMLDivElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    const exploreRef = useRef<HTMLDivElement | null>(null);
    const stripRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (!animated) {
            // Clip-path horizontal wipe reveal for headings (unique — not translateY)
            gsap.to(title1Ref.current, {
                clipPath: 'inset(-8px -8px -8px -8px)',
                duration: 1.3,
                delay: 0.1,
                ease: 'power4.inOut',
            });

            gsap.to(title2Ref.current, {
                clipPath: 'inset(-8px -8px -8px -8px)',
                duration: 1.3,
                delay: 0.3,
                ease: 'power4.inOut',
            });

            gsap.to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.6,
                ease: 'power3.out',
            });



            // Explore interactive element rises up
            gsap.to(exploreRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.8,
                ease: 'power3.out',
                onComplete: () => setAnimated('products-hero', true)
            });
        } else {
            gsap.set(title1Ref.current, { clipPath: 'inset(-8px -8px -8px -8px)' });
            gsap.set(title2Ref.current, { clipPath: 'inset(-8px -8px -8px -8px)' });
            gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
            gsap.set(exploreRef.current, { y: 0, opacity: 1 });
        }

        // Parallax: product strip rises on scroll
        gsap.to(stripRef.current, {
            scrollTrigger: {
                trigger: screenRef.current,
                start: 'top 0%',
                scrub: true,
            },
            y: -60,
        });
    }, []);

    return (
        <section ref={screenRef} className="relative overflow-hidden sm:h-[85vh] h-[75vh] bg-zinc-900">
            {/* Subtle radial gradient overlay */}
            <div className="absolute inset-0 z-0" style={{
                background: 'radial-gradient(ellipse at 50% 30%, rgba(113,113,122,0.15) 0%, transparent 70%)',
            }}></div>

            <div className="w-full relative sm:h-[85vh] h-[75vh] flex flex-col justify-center items-center z-10">



                <div className="flex flex-col items-center">
                    <div
                        ref={title1Ref}
                        style={{ clipPath: 'inset(-8px 100% -8px -8px)' }}
                    >
                        <h1 className="lg:text-[6rem] md:text-7xl sm:text-6xl text-[2.8rem] text-zinc-50 font-semibold tracking-tighter leading-none">
                            THE
                        </h1>
                    </div>
                    <div
                        ref={title2Ref}
                        style={{ clipPath: 'inset(-8px 100% -8px -8px)' }}
                    >
                        <h1 className={`lg:text-[7rem] md:text-[5.5rem] sm:text-[4.5rem] text-[3.2rem] text-zinc-50 font-normal tracking-tighter leading-none ${EditorialNew.className}`}>
                            Collection
                        </h1>
                    </div>
                </div>

                <p ref={subtitleRef} className="text-zinc-400 opacity-0 translate-y-5 text-xs tracking-widest mt-6 uppercase">
                    16 handcrafted fragrances
                </p>

                {/* Discover interactive element */}
                <div ref={stripRef} className="mt-16 sm:mt-20 w-full max-w-lg px-6">
                    <div 
                        ref={exploreRef}
                        className="opacity-0"
                        style={{ transform: 'translateY(40px)' }}
                    >
                        <div className="relative group cursor-pointer w-full h-[100px] sm:h-[130px] rounded-full overflow-hidden border border-zinc-700/40 hover:border-zinc-500/50 transition-colors duration-700">
                            <Image
                                src="/images/hanna-balan-d1GwyeOlZDw-unsplash.jpg"
                                alt="Explore Collection"
                                fill
                                className="object-cover object-[50%_40%] opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/80 via-transparent to-zinc-900/80"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-zinc-50 tracking-[0.3em] sm:tracking-[0.5em] text-[10px] sm:text-xs font-semibold uppercase group-hover:tracking-[0.6em] transition-all duration-700 ease-out flex items-center gap-4">
                                    <span className="w-6 h-[1px] bg-zinc-500 group-hover:bg-zinc-300 transition-colors duration-700"></span>
                                    Explore The Alchemy
                                    <span className="w-6 h-[1px] bg-zinc-500 group-hover:bg-zinc-300 transition-colors duration-700"></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
