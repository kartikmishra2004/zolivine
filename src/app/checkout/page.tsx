'use client';

import { useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/cartSlice";
import { selectProductBySlug } from "@/store/productsSlice";
import { EditorialNew } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";

export default function CheckoutPage() {
    const cartItems = useAppSelector(selectCartItems);
    const getProduct = useAppSelector(selectProductBySlug);
    const containerRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const subtotal = cartItems.reduce((total, item) => {
        const p = getProduct(item.slug);
        const price = parseInt(p?.price.replace('₹', '') || '0');
        return total + (price * item.quantity);
    }, 0);

    const shipping = subtotal > 5000 ? 0 : 500;
    const total = subtotal + shipping;

    useGSAP(() => {
        gsap.from(".checkout-step", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });

        gsap.from(".summary-card", {
            x: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.4
        });
    }, { scope: containerRef });

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);
        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        setFormData({ ...formData, cardNumber: formatted });
        if (errors.cardNumber) setErrors({ ...errors, cardNumber: '' });
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        setFormData({ ...formData, expiry: value });
        if (errors.expiry) setErrors({ ...errors, expiry: '' });
    };

    const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
        setFormData({ ...formData, cvv: value });
        if (errors.cvv) setErrors({ ...errors, cvv: '' });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
        if (formData.cardNumber.replace(/\s/g, '').length !== 16) newErrors.cardNumber = 'Incomplete card number';
        if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) newErrors.expiry = 'Invalid date (MM/YY)';
        if (formData.cvv.length !== 3) newErrors.cvv = 'Invalid CVV';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            alert('Order placed successfully!');
        }
    };

    return (
        <main ref={containerRef} className="min-h-screen bg-zinc-50 pt-24 pb-20 px-6 md:px-12 lg:px-24">
            <div className="max-w-[120rem] mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-800 transition-colors mb-12 group">
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-bold tracking-widest uppercase">Back to Shopping</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    <div className="lg:col-span-7 space-y-16">
                        <section className="checkout-step">
                            <h1 className={`${EditorialNew.className} text-5xl md:text-7xl text-zinc-800 mb-12`}>Checkout</h1>
                            
                            <form onSubmit={handleSubmit} className="space-y-16">
                                {/* Contact Section */}
                                <div className="space-y-10">
                                    <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-800 border-b border-zinc-200 pb-4">
                                        01. Contact Information
                                    </h2>
                                    <InputField 
                                        label="Email Address" 
                                        id="email" 
                                        type="email" 
                                        value={formData.email} 
                                        onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                                        error={errors.email}
                                    />
                                </div>

                                {/* Shipping Section */}
                                <div className="space-y-10">
                                    <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-800 border-b border-zinc-200 pb-4">
                                        02. Shipping Address
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                                        <InputField label="First Name" id="firstName" value={formData.firstName} onChange={(e: any) => setFormData({...formData, firstName: e.target.value})} />
                                        <InputField label="Last Name" id="lastName" value={formData.lastName} onChange={(e: any) => setFormData({...formData, lastName: e.target.value})} />
                                        <InputField className="md:col-span-2" label="Address" id="address" value={formData.address} onChange={(e: any) => setFormData({...formData, address: e.target.value})} />
                                        <InputField label="City" id="city" value={formData.city} onChange={(e: any) => setFormData({...formData, city: e.target.value})} />
                                        <InputField label="Postal Code" id="postalCode" value={formData.postalCode} onChange={(e: any) => setFormData({...formData, postalCode: e.target.value})} />
                                    </div>
                                </div>

                                {/* Payment Section */}
                                <div className="space-y-10">
                                    <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-800 border-b border-zinc-200 pb-4">
                                        03. Payment Method
                                    </h2>
                                    <div className="space-y-12">
                                        <div className="p-6 border border-zinc-200 rounded-xl flex items-center justify-between bg-white shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center shadow-lg">
                                                    <CreditCard className="text-zinc-50" size={18} />
                                                </div>
                                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-800">Credit or Debit Card</span>
                                            </div>
                                            <div className="w-5 h-5 rounded-full border-2 border-zinc-800 p-1 flex items-center justify-center">
                                                <div className="w-full h-full rounded-full bg-zinc-800"></div>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 px-2">
                                            <InputField 
                                                className="md:col-span-2" 
                                                label="Card Number" 
                                                id="cardNumber" 
                                                placeholder="XXXX XXXX XXXX XXXX" 
                                                value={formData.cardNumber} 
                                                onChange={handleCardNumberChange}
                                                error={errors.cardNumber}
                                            />
                                            <InputField 
                                                label="Expiry Date" 
                                                id="expiry" 
                                                placeholder="MM/YY" 
                                                value={formData.expiry} 
                                                onChange={handleExpiryChange}
                                                error={errors.expiry}
                                            />
                                            <InputField 
                                                label="CVV" 
                                                id="cvv" 
                                                placeholder="XXX" 
                                                value={formData.cvv} 
                                                onChange={handleCVVChange}
                                                error={errors.cvv}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="w-full py-5 bg-zinc-700 text-zinc-50 rounded-full font-semibold tracking-[0.3em] text-[11px] cursor-pointer hover:bg-zinc-800 transition-all uppercase shadow-lg active:scale-[0.98]">
                                    PLACE ORDER • ₹{total.toLocaleString()}
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="summary-card sticky top-32 bg-white p-8 md:p-12 border border-zinc-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-3xl">
                            <h3 className="text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-800 border-b border-zinc-100 pb-4 mb-8">Order Summary</h3>
                            
                            <div className="space-y-8 max-h-[40vh] overflow-y-auto pr-4 mb-8 custom-scrollbar">
                                {cartItems.map((item) => {
                                    const product = getProduct(item.slug);
                                    if (!product) return null;
                                    return (
                                        <div key={item.slug} className="flex gap-6 items-center">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-100 relative shrink-0">
                                                <Image fill src={product.image} alt={product.name} className="object-cover" />
                                                <div className="absolute top-1 right-1 bg-zinc-800 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-zinc-800 leading-tight">{product.name}</h4>
                                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">{product.collection}</p>
                                            </div>
                                            <span className="text-sm font-semibold text-zinc-800">{product.price}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-zinc-100">
                                <div className="flex justify-between text-zinc-500 text-xs font-semibold tracking-wider uppercase">
                                    <span>Subtotal</span>
                                    <span className="text-zinc-800">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-zinc-500 text-xs font-semibold tracking-wider uppercase">
                                    <span>Shipping</span>
                                    <span className="text-zinc-800">{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
                                </div>
                                <div className="flex justify-between text-zinc-800 pt-6 border-t border-zinc-100 mt-2">
                                    <span className="text-sm font-bold uppercase tracking-widest">Total</span>
                                    <span className="text-3xl font-bold">₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-12 space-y-5">
                                <div className="flex items-center gap-4 text-zinc-400">
                                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                                        <ShieldCheck size={16} className="text-zinc-400" />
                                    </div>
                                    <span className="text-[9px] font-bold tracking-widest uppercase leading-tight">Secure payment via SSL encrypted connection</span>
                                </div>
                                <div className="flex items-center gap-4 text-zinc-400">
                                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
                                        <Truck size={16} className="text-zinc-400" />
                                    </div>
                                    <span className="text-[9px] font-bold tracking-widest uppercase leading-tight">Free express shipping on orders over ₹5,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e4e4e7;
                    border-radius: 10px;
                }
            `}</style>
        </main>
    );
}

const InputField = ({ label, id, type = "text", value, onChange, placeholder, error, className = "" }: any) => (
    <div className={`space-y-2 relative ${className}`}>
        <input
            type={type}
            id={id}
            required
            className={`peer w-full bg-transparent border-b ${error ? 'border-red-400' : 'border-zinc-300'} py-3 text-zinc-800 text-base focus:outline-none focus:border-zinc-800 transition-colors placeholder-transparent`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        <label htmlFor={id} className="absolute left-0 -top-3.5 text-zinc-400 text-[10px] tracking-[0.2em] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-3 peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-zinc-800 peer-focus:tracking-[0.2em]">
            {label}
        </label>
        {error && <p className="text-[10px] text-red-500 mt-1 font-semibold tracking-wider uppercase">{error}</p>}
    </div>
);
