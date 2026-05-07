import { EditorialNew } from "@/utils/fonts";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectCartItems, removeFromCart, updateQuantity } from "@/store/cartSlice";
import { selectProductBySlug } from "@/store/productsSlice";
import { selectIsCartOpen, setCartOpen } from "@/store/uiSlice";
import Image from "next/image";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import ArrowButton from "./ArrowButton";

export default function SideMenu() {

    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const getProduct = useAppSelector(selectProductBySlug);
    const isCartOpen = useAppSelector(selectIsCartOpen);

    const buttonRef = useRef<HTMLAnchorElement | null>(null);
    const [arrowHovered, setArrowHovered] = useState(false);
    return (
        <>
            <section onClick={() => dispatch(setCartOpen(false))} className={`w-full h-screen bg-black/40 z-[9999] ${isCartOpen ? "fixed" : "hidden"} transition-all duration-700 ease-initial ${isCartOpen ? "opacity-100" : "opacity-0"}`}></section>
            <div className={`fixed z-[99999] sm:w-[45%] md:w-1/3 w-full h-screen bg-zinc-50 transition-all duration-700 ease-in-out ${isCartOpen ? "right-0" : "right-[-100%]"}`}>
                <div className="w-full h-[10%] flex justify-between items-center px-4 lg:px-14 border-b border-zinc-200">
                    <h1 className="text-4xl text-zinc-700 font-semibold tracking-tight">Cart<sup className="text-xl">({cartItems.length})</sup></h1>
                    <X onClick={() => dispatch(setCartOpen(false))} className="w-9 h-9 cursor-pointer transition-transform duration-400 hover:rotate-180 text-zinc-700" strokeWidth={1.5} />
                </div>

                <div className="h-[90%] w-full flex flex-col">
                    {cartItems.length > 0 ? (
                        <>
                            <div className="flex-1 overflow-y-auto px-4 lg:px-14 py-8 space-y-8">
                                {cartItems.map((item) => {
                                    const product = getProduct(item.slug);
                                    if (!product) return null;
                                    return (
                                        <div key={item.slug} className="flex gap-4 items-start">
                                            <div className="w-24 h-24 bg-zinc-100 rounded-lg overflow-hidden relative flex-shrink-0">
                                                <Image fill src={product.image} alt={product.name} className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm font-semibold text-zinc-700 leading-tight">{product.name}</h3>
                                                    <X
                                                        size={14}
                                                        className="text-zinc-400 cursor-pointer hover:text-zinc-700"
                                                        onClick={() => dispatch(removeFromCart(item.slug))}
                                                    />
                                                </div>
                                                <p className="text-[10px] text-zinc-400 tracking-wider uppercase mt-1">{product.collection}</p>
                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex items-center border border-zinc-200 rounded-full px-2 gap-3">
                                                        <button
                                                            className="text-zinc-500 text-xs py-1 px-1"
                                                            onClick={() => dispatch(updateQuantity({ slug: item.slug, quantity: item.quantity - 1 }))}
                                                        >-</button>
                                                        <span className="text-[10px] font-bold text-zinc-700 w-3 text-center">{item.quantity}</span>
                                                        <button
                                                            className="text-zinc-500 text-xs py-1 px-1"
                                                            onClick={() => dispatch(updateQuantity({ slug: item.slug, quantity: item.quantity + 1 }))}
                                                        >+</button>
                                                    </div>
                                                    <span className="text-sm font-semibold text-zinc-700">{product.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-4 lg:p-14 border-t border-zinc-200 space-y-4 bg-white">
                                <div className="flex justify-between items-end">
                                    <span className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">Subtotal</span>
                                    <span className="text-2xl font-bold text-zinc-700">₹{cartItems.reduce((total, item) => {
                                        const p = getProduct(item.slug);
                                        const price = parseInt(p?.price.replace('₹', '') || '0');
                                        return total + (price * item.quantity);
                                    }, 0).toLocaleString()}</span>
                                </div>
                                <button className="w-full bg-zinc-700 text-zinc-50 text-[11px] tracking-[0.3em] font-bold py-4 rounded-full hover:bg-zinc-800 transition-colors">
                                    PROCEED TO CHECKOUT
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col justify-center items-center gap-6">
                            <div className="text-3xl">
                                <h1 className="text-center text-4xl lg:text-[3.5rem] text-zinc-700 lg:leading-7">Your cart is</h1>
                                <h1 className={`text-center ${EditorialNew.className} text-4xl lg:text-[3.5rem] text-zinc-700 lg:leading-20 tracking-tighter`}>empty</h1>
                            </div>
                            <div className="w-full flex justify-center">
                                <Link
                                    onMouseEnter={() => setArrowHovered(true)}
                                    onMouseLeave={() => setArrowHovered(false)}
                                    ref={buttonRef}
                                    href={'/products'}
                                    onClick={() => dispatch(setCartOpen(false))}
                                    className="lg:w-[70%] w-[90%] h-[3rem] cursor-pointer rounded-4xl border border-[#c4c4c4] relative flex justify-center items-center"
                                >
                                    <h1 className="text-zinc-700 underline text-[10px] lg:pr-0 pr-5 lg:text-xs tracking-wider uppercase">Browse Products</h1>
                                    <ArrowButton hover={arrowHovered} varient="sm" />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}