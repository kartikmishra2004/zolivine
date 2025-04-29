import { MoveRight } from "lucide-react"

export default function Hero() {
    return (
        <section className="relative">
            <div className="absolute w-full h-screen flex justify-between flex-col items-center z-10">
                <div className="flex justify-center items-center flex-col gap-3 mt-36">
                    <h1 className="text-[5.5rem] text-zinc-50 font-semibold leading-20 text-center tracking-tighter">
                        <div className="">
                            <span className="font-editorialNew">True</span> to Essence,
                        </div>
                        <div className="">
                            kind to <span className="font-editorialNew">Nature</span>
                        </div>
                    </h1>
                    <p className="text-zinc-50 text-xs font-thin w-[18rem] text-center tracking">Natural perfumes crafted with rare botanicals, golden notes, and timeless, sustainable elegance.</p>
                </div>
                <div className="w-[47vw] h-[3.7rem] rounded-4xl bg-zinc-50 relative flex justify-center items-center mb-10">
                    <h1 className="text-zinc-700 underline text-xs tracking-wider">EXPLORE ALL PRODUCTS</h1>
                    <span className="w-12 h-12 bg-zinc-700 rounded-full absolute right-2 flex justify-center items-center"><MoveRight className="text-zinc-50 w-3.5" /></span>
                </div>
            </div>
            <video className="w-full h-screen object-cover z-0" autoPlay loop muted playsInline preload="metadata">
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>
        </section>
    )
}