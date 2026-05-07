'use client'
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { EditorialNew, lobster } from "@/utils/fonts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signupThunk, selectAuthLoading, selectAuthError, clearError, selectIsAuthenticated } from "@/store/authSlice";
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const dispatch = useAppDispatch();
    const router = useRouter();
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/products');
        }
    }, [isAuthenticated, router]);

    const imageWrapRef = useRef(null);
    const imageRef = useRef(null);
    const formContainerRef = useRef(null);
    const contentRefs = useRef<(HTMLElement | null)[]>([]);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Image reveal (from right)
        tl.from(imageWrapRef.current, {
            clipPath: 'inset(0 0 0 100%)',
            duration: 1.5,
            ease: "power4.inOut"
        })
            .from(imageRef.current, {
                scale: 1.2,
                duration: 2,
                ease: "power3.out"
            }, "-=1.2")
            // Form container slide in (from left)
            .from(formContainerRef.current, {
                x: '-100%',
                opacity: 0,
                duration: 1.2,
                ease: "power4.out"
            }, "-=1.5")
            // Stagger form content
            .from(contentRefs.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.8");
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(signupThunk(formData));
        if (signupThunk.fulfilled.match(result)) {
            router.push('/products');
        }
    };

    return (
        <main className="min-h-screen flex w-full overflow-hidden bg-zinc-50 flex-row-reverse">
            {/* Right Side: Cinematic Image */}
            <div ref={imageWrapRef} className="hidden lg:block w-[55%] h-screen relative overflow-hidden" style={{ clipPath: 'inset(0 0 0 0)' }}>
                <Image
                    ref={imageRef}
                    src="/images/signup.jpg"
                    alt="Luxury Botanical"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-zinc-900/10"></div>
                <div className="absolute inset-0 p-12 flex flex-col justify-between items-end z-10 text-right">
                    <div />
                    <div>
                        <h3 className={`${EditorialNew.className} text-6xl text-zinc-50 leading-[1.1] drop-shadow-lg`}>
                            Begin Your <br /> <span className="italic font-extralight text-zinc-300">Ritual</span>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Left Side: Minimalist Form */}
            <div ref={formContainerRef} className="w-full lg:w-[45%] h-screen flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-zinc-50 relative border-r border-zinc-200">
                {/* Mobile Header */}
                <div className="lg:hidden absolute top-8 left-8">
                    <Link href="/">
                        <h2 className={`${lobster.className} text-2xl text-zinc-800`}>Zolivine</h2>
                    </Link>
                </div>

                <div className="w-full max-w-sm mx-auto">
                    <header ref={el => { contentRefs.current[0] = el; }} className="mb-12">
                        <h1 className={`${EditorialNew.className} text-5xl text-zinc-800 mb-3 tracking-tight`}>Create Account</h1>
                        <p className="text-zinc-500 text-sm tracking-wide">Join us to explore the finest curated fragrances.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div ref={el => { contentRefs.current[1] = el; }} className="space-y-2 relative">
                            <input
                                type="text"
                                required
                                id="name"
                                className="peer w-full bg-transparent border-b border-zinc-300 py-3 text-zinc-800 text-base focus:outline-none focus:border-zinc-800 transition-colors placeholder-transparent"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <label htmlFor="name" className="absolute left-0 -top-3.5 text-zinc-400 text-[10px] tracking-[0.2em] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-3 peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-zinc-800 peer-focus:tracking-[0.2em]">
                                Full Name
                            </label>
                        </div>

                        <div ref={el => { contentRefs.current[2] = el; }} className="space-y-2 relative">
                            <input
                                type="email"
                                required
                                id="email"
                                className="peer w-full bg-transparent border-b border-zinc-300 py-3 text-zinc-800 text-base focus:outline-none focus:border-zinc-800 transition-colors placeholder-transparent"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <label htmlFor="email" className="absolute left-0 -top-3.5 text-zinc-400 text-[10px] tracking-[0.2em] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-3 peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-zinc-800 peer-focus:tracking-[0.2em]">
                                Email Address
                            </label>
                        </div>

                        <div ref={el => { contentRefs.current[3] = el; }} className="space-y-2 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                id="password"
                                className="peer w-full bg-transparent border-b border-zinc-300 py-3 text-zinc-800 text-base focus:outline-none focus:border-zinc-800 transition-colors placeholder-transparent pr-10"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <label htmlFor="password" className="absolute left-0 -top-3.5 text-zinc-400 text-[10px] tracking-[0.2em] uppercase transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-placeholder-shown:top-3 peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-[10px] peer-focus:text-zinc-800 peer-focus:tracking-[0.2em]">
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-3 text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
                            </button>
                        </div>

                        {error && (
                            <p ref={el => { contentRefs.current[4] = el; }} className="text-xs text-red-500 font-medium">
                                {error}
                            </p>
                        )}

                        <div ref={el => { contentRefs.current[5] = el; }} className="pt-8">
                            <button
                                disabled={loading || !formData.name.trim() || !formData.email.trim() || !formData.password.trim()}
                                type="submit"
                                className="w-full bg-zinc-800 text-zinc-50 py-4 font-semibold tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 uppercase cursor-pointer"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>Join Zolivine <ArrowRight size={14} /></>
                                )}
                            </button>
                        </div>
                    </form>

                    <div ref={el => { contentRefs.current[6] = el; }} className="mt-12 text-center">
                        <p className="text-xs text-zinc-500">
                            Already a member?
                            <Link href="/auth/login" onClick={() => dispatch(clearError())} className="ml-2 font-semibold text-zinc-800 hover:text-zinc-500 transition-colors uppercase tracking-wider text-[10px]">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}