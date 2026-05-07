import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuthenticated } from "@/store/authSlice";
import { EditorialNew, lobster } from "@/utils/fonts";
import { Instagram, Twitter, Facebook } from "lucide-react";

type Props = {
    open: boolean;
    onClose: () => void;
}

export default function NavMenu({ open, onClose }: Props) {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    const navItems = [
        { name: "SHOP", href: "/products" },
        { name: "GALLERY", href: "/gallery" },
        { name: "JOURNAL", href: "/journal" },
    ];

    return (
        <section 
            className={`w-full fixed inset-0 z-30 block sm:hidden transition-all duration-700 ease-in-out bg-zinc-50 ${
                open ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
            }`}
        >
            <div className="flex flex-col h-full pt-28 pb-12 px-8">
                <div className="flex-1 flex flex-col justify-center space-y-10">
                    {navItems.map((item, index) => (
                        <Link 
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            style={{ 
                                transitionDelay: open ? `${(index + 1) * 100 + 200}ms` : '0ms',
                                transform: open ? 'translateX(0)' : 'translateX(-30px)',
                                opacity: open ? 1 : 0
                            }}
                            className={`group transition-all duration-500 ease-out`}
                        >
                            <div className="flex items-center space-x-6">
                                <span className="text-zinc-300 text-[10px] font-medium tracking-[0.2em]">0{index + 1}</span>
                                <h2 className={`text-6xl font-light tracking-tighter text-zinc-800 group-hover:italic transition-all duration-500 ${EditorialNew.className}`}>
                                    {item.name}
                                </h2>
                            </div>
                        </Link>
                    ))}

                    <div 
                        className="pt-10 border-t border-zinc-200 transition-all duration-500 ease-out"
                        style={{ 
                            transitionDelay: open ? '600ms' : '0ms',
                            transform: open ? 'translateX(0)' : 'translateX(-30px)',
                            opacity: open ? 1 : 0
                        }}
                    >
                        <Link 
                            href={isAuthenticated ? "/profile" : "/auth/login"}
                            onClick={onClose}
                            className="inline-block"
                        >
                            <div className="flex items-center space-x-6 group">
                                <span className="text-zinc-300 text-[10px] font-medium tracking-[0.2em]">04</span>
                                <h2 className={`text-4xl font-light tracking-tighter text-zinc-800 group-hover:italic transition-all duration-300 ${EditorialNew.className}`}>
                                    {isAuthenticated ? "MY ACCOUNT" : "LOGIN"}
                                </h2>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-auto space-y-8">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className={`${lobster.className} text-3xl text-zinc-800`}>Zolivine</h1>
                            <p className="text-[10px] tracking-[0.2em] text-zinc-400 mt-2 font-medium">PREMIUM SKINCARE ESSENTIALS</p>
                        </div>
                        <div className="flex space-x-6">
                            <Instagram size={22} className="text-zinc-600 hover:text-zinc-900 cursor-pointer transition-colors" />
                            <Twitter size={22} className="text-zinc-600 hover:text-zinc-900 cursor-pointer transition-colors" />
                            <Facebook size={22} className="text-zinc-600 hover:text-zinc-900 cursor-pointer transition-colors" />
                        </div>
                    </div>
                    
                    <div className="text-[10px] text-zinc-400 flex justify-between uppercase tracking-[0.2em] border-t border-zinc-100 pt-6 font-medium">
                        <span>© 2024 ZOLIVINE</span>
                        <span className="cursor-pointer hover:text-zinc-700">PRIVACY POLICY</span>
                    </div>
                </div>
            </div>
        </section>
    )
}