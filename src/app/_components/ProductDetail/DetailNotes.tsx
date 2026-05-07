'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Droplets, Heart, Layers } from "lucide-react";
import { EditorialNew } from "@/utils/fonts";
import { Product } from "@/utils/products";
import { useAnimation } from '@/app/_context/AnimationContext';

gsap.registerPlugin(ScrollTrigger);

interface Props { product: Product }

const noteConfig = [
    { key: 'topNotes' as const, label: 'Top Notes', sublabel: 'First impression', icon: Droplets, accent: 'bg-zinc-300' },
    { key: 'heartNotes' as const, label: 'Heart Notes', sublabel: 'The character', icon: Heart, accent: 'bg-zinc-400' },
    { key: 'baseNotes' as const, label: 'Base Notes', sublabel: 'The foundation', icon: Layers, accent: 'bg-zinc-500' },
];

export default function DetailNotes({ product }: Props) {

    const animated = useAnimation((s) => s.hasAnimated(`detail-notes-${product.slug}`));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const subRef = useRef(null);
    const colRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        if (!animated) {
            gsap.from(headingRef.current, {
                y: 40, opacity: 0, duration: 0.9, ease: 'power4.out',
                scrollTrigger: { trigger: sectionRef.current, start: '-30%' },
            });

            gsap.from(subRef.current, {
                y: 20, opacity: 0, duration: 0.7, delay: 0.15, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: '-30%' },
            });

            // Columns slide in from bottom with horizontal stagger
            colRefs.current.forEach((col, i) => {
                if (col) {
                    gsap.from(col, {
                        y: 60, opacity: 0, duration: 0.9, delay: 0.2 + i * 0.18, ease: 'power4.out',
                        scrollTrigger: { trigger: sectionRef.current, start: '-20%' },
                    });
                }
            });

            // Vertical divider lines scale up
            lineRefs.current.forEach((line, i) => {
                if (line) {
                    gsap.from(line, {
                        scaleY: 0, duration: 0.8, delay: 0.5 + i * 0.15, ease: 'power4.out',
                        scrollTrigger: { trigger: sectionRef.current, start: '-20%' },
                        onComplete: i === lineRefs.current.length - 1
                            ? () => setAnimated(`detail-notes-${product.slug}`, true)
                            : undefined,
                    });
                }
            });
        }
    });

    return (
        <section ref={sectionRef} className="w-full bg-[#eeeeee] sm:py-24 py-16">
            <div className="w-full sm:px-20 px-7">
                <div className="text-center mb-14">
                    <h2 ref={headingRef} className="xl:text-5xl lg:text-4xl text-3xl text-zinc-700 font-semibold tracking-tight">
                        Fragrance <span className={`font-normal ${EditorialNew.className}`}>Pyramid</span>
                    </h2>
                    <p ref={subRef} className="text-zinc-400 text-xs tracking-[0.3em] mt-3">THE SCENT JOURNEY</p>
                </div>

                <div className="flex lg:flex-row flex-col items-stretch relative">
                    {noteConfig.map((note, i) => (
                        <div key={note.key} className="flex lg:flex-row flex-col items-stretch flex-1">
                            <div
                                ref={el => { colRefs.current[i] = el; }}
                                className="flex-1 text-center px-6 sm:px-10 py-10"
                            >
                                <div className="flex justify-center mb-5">
                                    <div className={`w-14 h-14 ${note.accent} rounded-full flex justify-center items-center`}>
                                        <note.icon size={20} className="text-zinc-50" strokeWidth={1.5} />
                                    </div>
                                </div>
                                <h3 className="text-lg text-zinc-700 font-semibold tracking-wide">{note.label}</h3>
                                <p className="text-zinc-400 text-[10px] tracking-[0.25em] mt-1 mb-6">{note.sublabel}</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {product[note.key].map((n, j) => (
                                        <span key={j} className="text-[11px] tracking-wider text-zinc-600 bg-zinc-50 px-5 py-2 rounded-full">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Vertical divider line between columns */}
                            {i < noteConfig.length - 1 && (
                                <div
                                    ref={el => { lineRefs.current[i] = el; }}
                                    className="lg:w-[1px] lg:h-auto h-[1px] w-full bg-zinc-300 origin-top lg:my-8 mx-auto"
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
