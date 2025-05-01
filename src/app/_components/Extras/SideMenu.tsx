import { X } from "lucide-react";

type Props = {
    setMenuOpen: (params: boolean) => void;
    menuOpen: boolean;
}

export default function SideMenu({ setMenuOpen, menuOpen }: Props) {

    const products = [];

    return (
        <>
            <section className={`w-full h-screen bg-black/40 z-[9999] ${menuOpen ? "fixed" : "hidden"} transition-all duration-700 ease-in-out ${menuOpen ? "opacity-100" : "opacity-0"}`}></section>
            <div className={`fixed z-[99999] w-1/3 h-screen bg-zinc-50 transition-all duration-700 ease-in-out ${menuOpen ? "right-0" : "right-[-100%]"}`}>
                <div className="w-full h-20 flex justify-between items-center px-14">
                    <h1 className="text-4xl text-zinc-700">Cart<sup className="text-xl">({products.length})</sup></h1>
                    <X onClick={() => setMenuOpen(false)} className="w-9 h-9 cursor-pointer transition-transform duration-400 hover:rotate-180 text-zinc-700" strokeWidth={1.5} />
                </div>
            </div>
        </>
    )
}