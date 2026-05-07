'use client';

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectUser, logout } from "@/store/authSlice";
import { selectOrders } from "@/store/ordersSlice";
import { EditorialNew } from "@/utils/fonts";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Package, Truck, CheckCircle2, ChevronRight, LogOut, ShoppingBag, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
    const user = useAppSelector(selectUser);
    const orders = useAppSelector(selectOrders);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const containerRef = useRef(null);

    const [expandedOrder, setExpandedOrder] = useState<string | null>(orders[0]?.id || null);
    const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

    const ongoingOrders = orders.filter(o => ['Processing', 'Shipped'].includes(o.status));
    const completedOrders = orders.filter(o => ['Delivered', 'Cancelled'].includes(o.status));
    
    const displayOrders = activeTab === 'ongoing' ? ongoingOrders : completedOrders;

    useGSAP(() => {
        gsap.from(".profile-header", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".order-card", {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.3
        });
    }, { scope: containerRef });

    const handleLogout = () => {
        dispatch(logout());
        router.push('/');
    };

    if (!user) {
        if (typeof window !== 'undefined') router.push('/auth/login');
        return null;
    }

    return (
        <main ref={containerRef} className="min-h-screen bg-zinc-50 pt-[10rem] pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                
                {/* Profile Header */}
                <header className="profile-header flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div>
                        <h1 className={`${EditorialNew.className} text-6xl md:text-8xl text-zinc-800 mb-4`}>
                            Bonjour, <span className="italic">{user.name.split(' ')[0]}</span>
                        </h1>
                        <p className="text-zinc-500 tracking-widest uppercase text-[10px] font-semibold">Account Overview & Order History</p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-zinc-400 hover:text-zinc-800 transition-colors uppercase tracking-[0.2em] text-[10px] font-bold group"
                    >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Sign Out
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left: User Stats & Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white p-10 rounded-none border border-zinc-100 shadow-sm space-y-8">
                            <div className="space-y-1">
                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Email Address</p>
                                <p className="text-zinc-800 font-medium">{user.email}</p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Preferred Shipping</p>
                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-zinc-800 mt-0.5" />
                                    <p className="text-sm text-zinc-500 leading-relaxed">
                                        Default address not set. <br />
                                        <button className="text-zinc-800 underline font-bold mt-1 text-[10px] uppercase tracking-widest">Add Address</button>
                                    </p>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-zinc-100 flex justify-between items-center">
                                <div>
                                    <p className="text-2xl font-bold text-zinc-800">{orders.length}</p>
                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Total Orders</p>
                                </div>
                                <div className="w-12 h-12 bg-zinc-50 rounded-none flex items-center justify-center">
                                    <ShoppingBag size={20} className="text-zinc-800" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-800 p-10 rounded-none text-zinc-50 space-y-4 shadow-lg">
                            <h4 className={`${EditorialNew.className} text-2xl`}>Join the Ritual</h4>
                            <p className="text-zinc-400 text-xs leading-relaxed">Early access to limited editions and private collections.</p>
                            <button className="w-full py-3 bg-zinc-50 text-zinc-800 rounded-none text-[10px] font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors">
                                View Club Benefits
                            </button>
                        </div>
                    </div>

                    {/* Right: Order History */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="flex items-center justify-between border-b border-zinc-100 pb-4 mb-4">
                            <div className="flex gap-10">
                                <button 
                                    onClick={() => setActiveTab('ongoing')}
                                    className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all relative pb-4 -mb-[18px] ${activeTab === 'ongoing' ? 'text-zinc-800' : 'text-zinc-300 hover:text-zinc-500'}`}
                                >
                                    Ongoing ({ongoingOrders.length})
                                    {activeTab === 'ongoing' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-800"></span>}
                                </button>
                                <button 
                                    onClick={() => setActiveTab('completed')}
                                    className={`text-[10px] font-bold tracking-[0.3em] uppercase transition-all relative pb-4 -mb-[18px] ${activeTab === 'completed' ? 'text-zinc-800' : 'text-zinc-300 hover:text-zinc-500'}`}
                                >
                                    Completed ({completedOrders.length})
                                    {activeTab === 'completed' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-800"></span>}
                                </button>
                            </div>
                        </div>
                        
                        {displayOrders.length > 0 ? (
                            <div className="space-y-6">
                                {displayOrders.map((order) => (
                                    <div 
                                        key={order.id} 
                                        className={`order-card bg-white rounded-none border transition-all duration-500 overflow-hidden ${expandedOrder === order.id ? 'border-zinc-200 shadow-md' : 'border-zinc-100 shadow-sm hover:border-zinc-200'}`}
                                    >
                                        <div 
                                            className="p-8 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                        >
                                            <div className="flex gap-6 items-center">
                                                <div className="w-14 h-14 bg-zinc-50 rounded-none flex items-center justify-center shrink-0 border border-zinc-100">
                                                    <Package size={24} className="text-zinc-800" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">{order.date}</p>
                                                    <p className="text-sm font-bold text-zinc-800">{order.id}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-8 items-center w-full md:w-auto">
                                                <div>
                                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Status</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`w-2 h-2 rounded-none ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-zinc-800'}`}></span>
                                                        <p className="text-sm font-bold text-zinc-800">{order.status}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Total</p>
                                                    <p className="text-sm font-bold text-zinc-800">₹{order.total.toLocaleString()}</p>
                                                </div>
                                                <ChevronRight 
                                                    size={20} 
                                                    className={`text-zinc-300 transition-transform duration-500 ml-auto ${expandedOrder === order.id ? 'rotate-90 text-zinc-800' : ''}`} 
                                                />
                                            </div>
                                        </div>

                                        {expandedOrder === order.id && (
                                            <div className="px-8 pb-8 pt-4 border-t border-zinc-50 space-y-10 animate-fade-in">
                                                
                                                {/* Tracking Timeline */}
                                                <div className="relative pt-8 pb-4">
                                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-100 -translate-y-1/2"></div>
                                                    <div className="relative flex justify-between">
                                                        {[
                                                            { label: 'Confirmed', icon: CheckCircle2, active: true },
                                                            { label: 'Processing', icon: Package, active: order.status !== 'Cancelled' },
                                                            { label: 'Shipped', icon: Truck, active: ['Shipped', 'Delivered'].includes(order.status) },
                                                            { label: 'Delivered', icon: CheckCircle2, active: order.status === 'Delivered' }
                                                        ].map((step, i) => (
                                                            <div key={i} className="flex flex-col items-center gap-3 bg-white px-2 relative z-10">
                                                                <div className={`w-8 h-8 rounded-none flex items-center justify-center border transition-all duration-500 ${step.active ? 'bg-zinc-800 border-zinc-800 text-white' : 'bg-white border-zinc-100 text-zinc-300'}`}>
                                                                    <step.icon size={14} />
                                                                </div>
                                                                <span className={`text-[9px] font-bold tracking-widest uppercase ${step.active ? 'text-zinc-800' : 'text-zinc-200'}`}>{step.label}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Order Details */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                                                    <div className="space-y-6">
                                                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold border-b border-zinc-100 pb-2">Items</p>
                                                        <div className="space-y-4">
                                                            {order.items.map((item, i) => (
                                                                <div key={i} className="flex gap-4 items-center">
                                                                    <div className="w-12 h-12 rounded-none overflow-hidden bg-zinc-50 relative border border-zinc-100">
                                                                        <Image fill src={item.image} alt={item.name} className="object-cover" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="text-xs font-bold text-zinc-800 mb-1">{item.name}</p>
                                                                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                                                                    </div>
                                                                    <p className="text-xs font-bold text-zinc-800">{item.price}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <div>
                                                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold border-b border-zinc-100 pb-2 mb-4">Shipping to</p>
                                                            <p className="text-xs text-zinc-600 leading-relaxed">
                                                                {order.shippingAddress.firstName} {order.shippingAddress.lastName} <br />
                                                                {order.shippingAddress.address} <br />
                                                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                                            </p>
                                                        </div>
                                                        {order.trackingNumber && (
                                                            <div>
                                                                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold border-b border-zinc-100 pb-2 mb-4">Tracking Number</p>
                                                                <p className="text-xs text-zinc-800 font-bold tracking-widest">{order.trackingNumber}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-none border border-zinc-100 border-dashed">
                                <ShoppingBag className="mx-auto text-zinc-100 mb-6" size={48} strokeWidth={1} />
                                <h4 className={`${EditorialNew.className} text-2xl text-zinc-300 mb-2`}>No {activeTab} orders</h4>
                                <p className="text-xs text-zinc-400 mb-8 max-w-[200px] mx-auto leading-relaxed">Your future collection awaits its first addition.</p>
                                <Link href="/products" className="inline-block py-3 px-8 bg-zinc-800 text-white rounded-none text-[10px] font-bold tracking-widest uppercase hover:bg-zinc-900 transition-colors">
                                    Start Exploring
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </main>
    );
}
