'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { EditorialNew } from "@/utils/fonts";
import { useAnimation } from '@/app/_context/AnimationContext';
import { useAppSelector } from '@/store/hooks';
import { selectRelatedProducts } from '@/store/productsSlice';

gsap.registerPlugin(ScrollTrigger);

interface Props { currentSlug: string }

export default function DetailRelated({ currentSlug }: Props) {

    const selectRelated = useAppSelector(selectRelatedProducts);
    const related = selectRelated(currentSlug, 4);
    const animated = useAnimation((s) => s.hasAnimated(`detail-related-${currentSlug}`));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useGSAP(() => {
        if (!animated) {
            gsap.from(headingRef.current, {
                y: 40, opacity: 0, duration: 0.9, ease: 'power4.out',
                scrollTrigger: { trigger: sectionRef.current, start: '-30%' },
            });

            cardRefs.current.forEach((card, i) => {
                if (card) {
                    gsap.from(card, {
                        y: 50, opacity: 0, rotate: i % 2 === 0 ? -2 : 2, duration: 0.8,
                        delay: 0.15 + i * 0.1, ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: '-15%' },
                        onComplete: i === cardRefs.current.length - 1
                            ? () => setAnimated(`detail-related-${currentSlug}`, true)
                            : undefined,
                    });
                }
            });
        }
    });

    return (
        <section ref={sectionRef} className="w-full bg-zinc-50 sm:py-24 py-16">
            <div className="w-full sm:px-20 px-7">
                <h2 ref={headingRef} className="xl:text-5xl lg:text-4xl text-3xl text-zinc-700 font-semibold tracking-tight text-center mb-14">
                    You may <span className={`font-normal ${EditorialNew.className}`}>also like</span>
                </h2>

                <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-2 sm:gap-5 gap-3">
                    {related.map((p, i) => (
                        <Link
                            key={p.slug}
                            href={`/products/${p.slug}`}
                            ref={el => { cardRefs.current[i] = el; }}
                            className="group cursor-pointer"
                        >
                            <div className="bg-[#eeeeee] sm:rounded-xl rounded-lg overflow-hidden relative sm:h-[22rem] h-[14rem]">
                                <Image
                                    height={352} width={300} alt={p.name} src={p.image}
                                    className="w-full h-full object-cover select-none group-hover:scale-[1.04] transition-transform ease-out duration-700"
                                />
                            </div>
                            <div className="sm:pt-4 pt-2.5">
                                <p className="text-zinc-400 text-[9px] tracking-[0.2em] font-semibold">{p.collection}</p>
                                <p className="sm:text-sm text-xs text-zinc-700 leading-4 mt-1">{p.name}</p>
                                <p className="sm:text-sm text-xs font-semibold text-zinc-700 mt-1">{p.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
