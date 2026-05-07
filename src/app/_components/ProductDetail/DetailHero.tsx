'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/utils/products";
import { useAnimation } from '@/app/_context/AnimationContext';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, updateQuantity, selectCartItems } from "@/store/cartSlice";
import { setCartOpen } from "@/store/uiSlice";
import { selectIsAuthenticated } from "@/store/authSlice";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Props { product: Product }

export default function DetailHero({ product }: Props) {

    const animated = useAnimation((s) => s.hasAnimated(`detail-hero-${product.slug}`));
    const setAnimated = useAnimation((s) => s.setAnimated);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const cartItems = useAppSelector(selectCartItems);
    const isInCart = useMemo(() => cartItems.some(item => item.slug === product.slug), [cartItems, product.slug]);
    const [localQty, setLocalQty] = useState(1);

    const sectionRef = useRef(null);
    const imageWrapRef = useRef<HTMLDivElement | null>(null);
    const collectionRef = useRef<HTMLSpanElement | null>(null);
    const nameRef = useRef<HTMLHeadingElement | null>(null);
    const priceRef = useRef<HTMLDivElement | null>(null);
    const descRef = useRef<HTMLParagraphElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const qtyRef = useRef<HTMLDivElement | null>(null);
    const featureRefs = useRef<(HTMLLIElement | null)[]>([]);
    const dividerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (!animated) {
            // Circular clip-path expanding reveal on the image (unique pattern)
            gsap.to(imageWrapRef.current, {
                clipPath: 'circle(75% at 50% 50%)',
                duration: 1.4,
                delay: 0.1,
                ease: 'power3.inOut',
            });

            gsap.from(collectionRef.current, {
                opacity: 0, y: 15, duration: 0.7, delay: 0.4, ease: 'power3.out',
            });

            // Name: fade in with letter spacing tightening
            gsap.from(nameRef.current, {
                opacity: 0, letterSpacing: '0.15em', duration: 1, delay: 0.5, ease: 'power4.out',
            });

            gsap.from(priceRef.current, {
                opacity: 0, y: 20, duration: 0.7, delay: 0.7, ease: 'power3.out',
            });

            gsap.from(descRef.current, {
                opacity: 0, y: 20, duration: 0.7, delay: 0.8, ease: 'power3.out',
            });

            // Button & Qty: reveal
            gsap.from([btnRef.current, qtyRef.current], {
                scaleY: 0, 
                transformOrigin: 'bottom', 
                duration: 0.8, 
                delay: 0.9, 
                stagger: 0.1,
                ease: 'power4.out',
            });

            gsap.from(dividerRef.current, {
                scaleX: 0, duration: 0.8, delay: 1, ease: 'power4.out',
            });

            // Features: stagger in from left
            featureRefs.current.forEach((el, i) => {
                if (el) {
                    gsap.from(el, {
                        opacity: 0, x: -20, duration: 0.5, delay: 1.1 + i * 0.08, ease: 'power3.out',
                        onComplete: i === featureRefs.current.length - 1
                            ? () => setAnimated(`detail-hero-${product.slug}`, true)
                            : undefined,
                    });
                }
            });
        } else {
            gsap.set(imageWrapRef.current, { clipPath: 'circle(75% at 50% 50%)' });
        }
    }, []);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }

        if (isInCart) {
            dispatch(setCartOpen(true));
        } else {
            dispatch(addToCart(product.slug));
            dispatch(updateQuantity({ slug: product.slug, quantity: localQty }));
            // Simple feedback animation
            gsap.to(btnRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        }
    };

    const handleQtyChange = (val: number) => {
        setLocalQty(prev => Math.max(1, prev + val));
    };

    return (
        <section ref={sectionRef} className="w-full min-h-screen bg-zinc-50 pt-24 sm:pt-28 pb-16">
            <div className="w-full sm:px-20 px-7">
                <div className="flex lg:flex-row flex-col gap-10 lg:gap-16">

                    {/* Product image — circular reveal */}
                    <div className="lg:w-[50%] lg:sticky lg:top-28 lg:self-start">
                        <div
                            ref={imageWrapRef}
                            className="relative bg-[#eeeeee] rounded-2xl overflow-hidden sm:h-[520px] h-[380px]"
                            style={{ clipPath: 'circle(0% at 50% 50%)' }}
                        >
                            <Image
                                priority
                                fill
                                alt={product.name}
                                src={product.image}
                                className="object-cover select-none"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="lg:w-[50%] flex flex-col sm:py-4">
                        <span ref={collectionRef} className="text-zinc-400 text-[10px] font-semibold tracking-[0.35em]">
                            {product.collection}
                        </span>

                        <h1 ref={nameRef} className={`xl:text-3xl lg:text-2xl text-2xl text-zinc-700 font-semibold tracking-tight mt-3 leading-tight`}>
                            {product.name}
                        </h1>

                        <div ref={priceRef} className="flex items-center gap-3 mt-5">
                            <span className="text-2xl text-zinc-700 font-semibold">{product.price}</span>
                            <span className="text-zinc-400 text-xs tracking-wider">· {product.size}</span>
                        </div>

                        <p ref={descRef} className="text-sm text-zinc-500 leading-6 mt-5 lg:w-[90%]">
                            {product.description}
                        </p>

                        {/* Quantity + Add to bag */}
                        <div className="flex gap-3 mt-8">
                            <div ref={qtyRef} className="flex items-center border border-zinc-300 rounded-full px-4 gap-4">
                                <Minus
                                    size={14}
                                    className="text-zinc-500 cursor-pointer"
                                    strokeWidth={1.5}
                                    onClick={() => handleQtyChange(-1)}
                                />
                                <span className="text-sm text-zinc-700 font-semibold select-none w-4 text-center">{localQty}</span>
                                <Plus
                                    size={14}
                                    className="text-zinc-500 cursor-pointer"
                                    strokeWidth={1.5}
                                    onClick={() => handleQtyChange(1)}
                                />
                            </div>
                            <button
                                ref={btnRef}
                                onClick={handleAddToCart}
                                className="flex-1 bg-zinc-700 text-zinc-50 text-[11px] tracking-[0.3em] font-semibold py-4 rounded-full hover:bg-zinc-800 transition-colors duration-300 cursor-pointer"
                            >
                                {isInCart ? 'PROCEED TO CHECKOUT' : 'ADD TO CART'}
                            </button>
                        </div>

                        <div ref={dividerRef} className="w-full h-[1px] bg-zinc-200 mt-10 origin-left"></div>

                        {/* Features */}
                        <ul className="mt-6 space-y-2.5">
                            {product.features.map((feat, i) => (
                                <li
                                    key={i}
                                    ref={el => { featureRefs.current[i] = el; }}
                                    className="flex items-center gap-2.5"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                                    <span className="text-xs text-zinc-500 tracking-wider">{feat}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
