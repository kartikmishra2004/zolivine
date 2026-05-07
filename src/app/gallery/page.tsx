'use client';
import Image from "next/image";
import { EditorialNew } from "@/utils/fonts";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";

const imagesCol1 = [
    '/images/1.png',
    '/images/gold-perfume.jpg',
    '/images/moa1.jpg',
    '/images/man-flower.jpg',
    '/images/5.png',
];

const imagesCol2 = [
    '/images/2.png',
    '/images/women-spray.jpg',
    '/images/6.png',
    '/images/man-spray-min.jpg',
    '/images/blowup.jpg',
];

const imagesCol3 = [
    '/images/3.png',
    '/images/signup.jpg',
    '/images/4.png',
    '/images/login.jpg',
    '/images/man.jpg',
];

export default function Gallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorTextRef = useRef<HTMLSpanElement>(null);
    
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Drag & Scroll Refs
    const colRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
    const dragVelocity = useRef(0);
    const isDragging = useRef(false);
    const lastY = useRef(0);
    const totalDragDistance = useRef(0);

    useGSAP(() => {
        const xToContainer = gsap.quickTo(containerRef.current, "x", { duration: 1.2, ease: "power3.out" });
        const yToContainer = gsap.quickTo(containerRef.current, "y", { duration: 1.2, ease: "power3.out" });
        
        const xToText = gsap.quickTo(textRef.current, "x", { duration: 1.8, ease: "power3.out" });
        const yToText = gsap.quickTo(textRef.current, "y", { duration: 1.8, ease: "power3.out" });
        
        const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3.out" });
        const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3.out" });

        const handlePointerMove = (e: PointerEvent) => {
            // Parallax movement
            const x = (e.clientX / window.innerWidth - 0.5) * 80;
            const y = (e.clientY / window.innerHeight - 0.5) * 80;
            
            xToContainer(-x);
            yToContainer(-y);
            
            xToText(x * 1.5);
            yToText(y * 1.5);

            // Cursor follower
            xToCursor(e.clientX);
            yToCursor(e.clientY);

            // Drag physics
            if (isDragging.current) {
                const deltaY = e.clientY - lastY.current;
                dragVelocity.current = deltaY * 1.8;
                totalDragDistance.current += Math.abs(deltaY);
                lastY.current = e.clientY;
            }
        };

        const handlePointerUp = () => {
            isDragging.current = false;
            if (cursorTextRef.current) cursorTextRef.current.innerText = "VIEW";
            if (cursorRef.current) gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: "back.out(1.5)" });
        };

        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
        window.addEventListener("pointercancel", handlePointerUp);

        // Infinite Scroll & Drag render loop
        const speeds = [-0.8, 1.2, -0.6]; 
        const offsets = [0, 0, 0];
        let initialized = false;

        const renderScroll = () => {
            if (!colRefs[0].current || !colRefs[1].current || !colRefs[2].current) return;
            
            const heights = [
                colRefs[0].current.children[0].getBoundingClientRect().height,
                colRefs[1].current.children[0].getBoundingClientRect().height,
                colRefs[2].current.children[0].getBoundingClientRect().height,
            ];

            if (!heights[0]) return; // Wait until layout is calculated

            if (!initialized) {
                offsets[0] = 0;
                offsets[1] = -heights[1]; // Middle column starts shifted to scroll down smoothly
                offsets[2] = 0;
                initialized = true;
            }

            if (!isDragging.current) {
                dragVelocity.current *= 0.92; // Friction slows drag down naturally
            }

            colRefs.forEach((ref, i) => {
                // Apply base scroll + the drag velocity
                const speed = speeds[i] + dragVelocity.current * (i === 1 ? 0.8 : 1.2); 
                offsets[i] += speed;

                let y = offsets[i];
                // Wrap around seamlessly
                while (y > 0) {
                    y -= heights[i];
                    offsets[i] -= heights[i];
                }
                while (y <= -heights[i]) {
                    y += heights[i];
                    offsets[i] += heights[i];
                }

                gsap.set(ref.current, { y });
            });
        };

        gsap.ticker.add(renderScroll);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
            window.removeEventListener("pointercancel", handlePointerUp);
            gsap.ticker.remove(renderScroll);
        };
    }, []);

    // Column Subcomponent
    const Column = ({ images, colIndex, hiddenOnMobile = false }: { images: string[], colIndex: number, hiddenOnMobile?: boolean }) => {
        return (
            <div className={`w-1/2 md:w-1/3 h-full overflow-hidden relative ${hiddenOnMobile ? 'hidden md:block' : ''}`}>
                <div ref={colRefs[colIndex]} className="absolute w-full flex flex-col" style={{ willChange: 'transform' }}>
                    <div className="flex flex-col gap-4 md:gap-8 pb-4 md:pb-8 w-full">
                        {images.map((src, idx) => (
                            <div 
                                key={`set1-${idx}`} 
                                className="gallery-item relative w-full aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl cursor-none transition-all duration-700"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                onClick={() => {
                                    if (totalDragDistance.current > 10) return; // Ignore click if dragging
                                    setSelectedImg(src);
                                    setIsHovering(false);
                                }}
                            >
                                <Image src={src} alt="gallery image" fill className="object-cover transition-transform duration-1000 ease-out" draggable={false} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-4 md:gap-8 pb-4 md:pb-8 w-full">
                        {images.map((src, idx) => (
                            <div 
                                key={`set2-${idx}`} 
                                className="gallery-item relative w-full aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl cursor-none transition-all duration-700"
                                onMouseEnter={() => setIsHovering(true)}
                                onMouseLeave={() => setIsHovering(false)}
                                onClick={() => {
                                    if (totalDragDistance.current > 10) return;
                                    setSelectedImg(src);
                                    setIsHovering(false);
                                }}
                            >
                                <Image src={src} alt="gallery image" fill className="object-cover transition-transform duration-1000 ease-out" draggable={false} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section 
            className="relative w-full h-screen bg-[#09090b] overflow-hidden flex items-center justify-center cursor-default pt-[4.5rem] select-none"
            onPointerDown={(e) => {
                isDragging.current = true;
                lastY.current = e.clientY;
                dragVelocity.current = 0;
                totalDragDistance.current = 0;
                if (cursorTextRef.current) cursorTextRef.current.innerText = "DRAG";
                if (cursorRef.current) gsap.to(cursorRef.current, { scale: 0.8, duration: 0.2 });
            }}
        >
            
            {/* Custom Cursor */}
            <div 
                ref={cursorRef} 
                className={`fixed top-[-40px] left-[-40px] w-[80px] h-[80px] rounded-full bg-zinc-50 pointer-events-none z-50 flex items-center justify-center transition-opacity duration-300 ease-out ${isHovering && !selectedImg ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: isHovering && !selectedImg ? 'scale(1)' : 'scale(0)' }}
            >
                <span ref={cursorTextRef} className="text-[#09090b] text-[10px] font-bold tracking-widest transition-all">VIEW</span>
            </div>

            {/* Soft Edge Overlays */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#09090b] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#09090b] to-transparent z-10 pointer-events-none"></div>

            {/* Title Overlay */}
            <div ref={textRef} className="absolute z-20 pointer-events-none flex flex-col items-center justify-center w-full">
                <h1 className={`${EditorialNew.className} text-[5rem] md:text-[10rem] lg:text-[14rem] text-zinc-50 uppercase tracking-tighter leading-none mix-blend-difference drop-shadow-2xl text-center`}>
                    Gallery
                </h1>
                <p className="text-zinc-300 tracking-[0.3em] md:tracking-[0.6em] text-[10px] md:text-sm uppercase mt-4 mix-blend-difference font-light">
                    The Art of Fragrance
                </p>
            </div>

            {/* Infinite Scroll Container */}
            <div className="w-[120%] h-[150vh] px-4 md:px-8 opacity-50 hover:opacity-100 transition-opacity duration-1000 gallery-container rotate-[-6deg] scale-[1.15]">
                <div ref={containerRef} className="w-full h-full flex gap-4 md:gap-8">
                    <Column images={imagesCol1} colIndex={0} />
                    <Column images={imagesCol2} colIndex={1} />
                    <Column images={imagesCol3} colIndex={2} hiddenOnMobile={true} />
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImg && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl cursor-pointer"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => setSelectedImg(null)}
                >
                    <button 
                        className="absolute top-8 right-8 text-white hover:rotate-90 transition-transform duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImg(null);
                        }}
                    >
                        <X size={36} strokeWidth={1} />
                    </button>
                    <div 
                        className="relative w-[90%] md:w-[70%] h-[85%] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up cursor-default" 
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image src={selectedImg} alt="Expanded" fill className="object-contain" draggable={false} />
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{__html: `
                /* Hover Interactions */
                .gallery-container:hover .gallery-item {
                    opacity: 0.3;
                    filter: grayscale(100%);
                }
                .gallery-container .gallery-item:hover {
                    opacity: 1 !important;
                    filter: grayscale(0%) !important;
                    z-index: 10;
                }
                .gallery-container .gallery-item:hover img {
                    transform: scale(1.08);
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
        </section>
    )
}