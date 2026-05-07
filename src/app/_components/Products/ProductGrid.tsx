'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { EditorialNew } from "@/utils/fonts";
import { useAnimation } from '@/app/_context/AnimationContext';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectFilteredProducts, selectActiveFilter, setFilter } from '@/store/productsSlice';

gsap.registerPlugin(ScrollTrigger);

const filters = ['All', 'Pure Brilliance', 'Gilded Essence'];

export default function ProductGrid() {

    const dispatch = useAppDispatch();
    const filteredProducts = useAppSelector(selectFilteredProducts);
    const activeFilter = useAppSelector(selectActiveFilter);
    const animated = useAnimation((s) => s.hasAnimated('products-grid'));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const screenRef = useRef(null);
    const headingRef = useRef(null);
    const countRef = useRef(null);

    useGSAP(() => {
        if (!animated) {
            gsap.from(headingRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: screenRef.current, start: '-25%' }
            });

            gsap.from(countRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.6,
                delay: 0.15,
                ease: 'power3.out',
                scrollTrigger: { trigger: screenRef.current, start: '-25%' }
            });

            // Diagonal cascade stagger for grid cards
            gsap.utils.toArray<HTMLElement>(".pgrid-card").forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: { trigger: screenRef.current, start: '-10%' },
                    y: 50,
                    opacity: 0,
                    scale: 0.96,
                    duration: 0.7,
                    delay: i * 0.07,
                    ease: 'power3.out',
                    onComplete: i === filteredProducts.length - 1
                        ? () => setAnimated('products-grid', true)
                        : undefined,
                });
            });
        }
    });

    return (
        <section ref={screenRef} className="w-full bg-[#eeeeee] sm:py-24 py-14">
            <div className="w-full sm:px-20 px-7">

                {/* Header with underline-style filter tabs */}
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-end gap-6 mb-12">
                    <div ref={headingRef} className="flex items-end gap-3">
                        <h1 className="xl:text-5xl lg:text-4xl text-3xl text-zinc-700 font-semibold tracking-tight">
                            All <span className={`font-normal ${EditorialNew.className}`}>Products</span>
                        </h1>
                    </div>
                    <div className="flex gap-1">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => dispatch(setFilter(filter))}
                                className={`text-[10px] tracking-widest font-semibold px-5 py-2 cursor-pointer relative transition-colors duration-300 ${activeFilter === filter
                                    ? 'text-zinc-700'
                                    : 'text-zinc-400 hover:text-zinc-600'
                                    }`}
                            >
                                {filter.toUpperCase()}
                                {/* Active underline indicator */}
                                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-zinc-700 transition-all duration-300 ${activeFilter === filter ? 'w-4/5' : 'w-0'
                                    }`}></span>
                            </button>
                        ))}
                    </div>
                </div>

                <p ref={countRef} className="text-zinc-400 text-xs tracking-wider mb-6">{filteredProducts.length} PRODUCTS</p>

                {/* Product grid with unique card design: separated image & details */}
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 sm:gap-x-5 sm:gap-y-10 gap-x-3 gap-y-6">
                    {filteredProducts.map((product, id) => (
                        <Link href={`/products/${product.slug}`} key={`${product.slug}-${id}`} className="pgrid-card group cursor-pointer">
                            <div className="bg-zinc-50 sm:rounded-xl rounded-lg overflow-hidden relative sm:h-[24rem] h-[15rem]">
                                <Image
                                    height={384}
                                    width={300}
                                    alt={product.name}
                                    className="w-full h-full object-cover select-none group-hover:scale-[1.04] transition-transform ease-out duration-700"
                                    src={product.image}
                                />
                                {/* Hover overlay with "View" text — unique interaction */}
                                <div className="absolute inset-0 bg-zinc-900/0 group-hover:bg-zinc-900/20 transition-all duration-500 flex justify-center items-center">
                                    <span className="text-zinc-50 text-[10px] tracking-[0.4em] font-semibold opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                                        VIEW DETAILS
                                    </span>
                                </div>
                                <span className="absolute top-3 right-3 bg-zinc-50 flex justify-center items-center sm:w-8 sm:h-8 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ShoppingBag size={14} strokeWidth={1} className="text-zinc-700" />
                                </span>
                            </div>
                            {/* Details below image — clean separation, not overlaid */}
                            <div className="sm:pt-4 pt-2.5">
                                <p className="text-zinc-400 text-[9px] tracking-[0.2em] font-semibold">{product.collection}</p>
                                <p className="sm:text-sm text-xs text-zinc-700 leading-4 mt-1">{product.name}</p>
                                <p className="sm:text-sm text-xs font-semibold text-zinc-700 mt-1">{product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
