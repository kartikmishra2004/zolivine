'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProductMarquee() {

    const marqueeRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (marqueeRef.current) {
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                duration: 28,
                ease: 'none',
                repeat: -1,
            });
        }
    }, []);

    const text = '\u00A0\u00A0★\u00A0\u00A0PURE BRILLIANCE\u00A0\u00A0★\u00A0\u00A0GILDED ESSENCE\u00A0\u00A0★\u00A0\u00A0BOTANICAL NOIR\u00A0\u00A0★\u00A0\u00A0ARTISAN CRAFTED\u00A0\u00A0★\u00A0\u00A0HANDCRAFTED IN SMALL BATCHES\u00A0\u00A0';

    return (
        <section className="w-full h-14 bg-zinc-700 overflow-hidden flex items-center select-none">
            <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-zinc-300/70 text-[11px] tracking-[0.3em] font-semibold">
                        {text}
                    </span>
                ))}
            </div>
        </section>
    )
}
