'use client'
import { EditorialNew } from "@/utils/fonts";
import ArrowButton from "../Extras/ArrowButton";
import Link from "next/link";
import { useState } from "react";

export default function Information() {
    const [arrowHovered, setArrowHovered] = useState(false)
    return (
        <section className="w-full h-[180vh] bg-[#eeeeee]">
            <div className="w-full flex flex-col justify-center items-center h-3/5">
                <div className="flex relative justify-center items-center w-full">
                    <h1 className="text-[10rem] leading-none text-zinc-700 font-semibold flex flex-col items-center tracking-tight">RADICAL</h1>
                    <span className="absolute left-56 bottom-6 text-zinc-400 text-xs font-semibold text-center tracking-wide py-0.5 px-12 rounded-full border">ETHOS</span>
                </div>
                <div className="flex justify-center items-center">
                    <h1 className="text-[10rem] leading-28 pb-8 text-zinc-700 font-semibold flex flex-col items-center tracking-tight">TRANSPARENCY.</h1>
                </div>
                <div className="flex w-full items-center">
                    <div className="w-[45%] flex justify-center pr-42">
                        <Link href='/philosophy'>
                            <div onMouseEnter={() => setArrowHovered(true)} onMouseLeave={() => setArrowHovered(false)} className="relative cursor-pointer w-max h-max -rotate-45">
                                <ArrowButton hover={arrowHovered} varient="lg" />
                            </div>
                        </Link>
                        <p className="text-zinc-500 text-xs px-8 pt-6 tracking-wide font-semibold underline">OUR <br />PHILOSOPHY</p>
                    </div>
                    <div className="w-[55%]">
                        <h1 className={`${EditorialNew.className} text-[10rem] leading-28 pt-8 px-4.5 text-zinc-700 font-normal tracking-tight`}>HIDE</h1>
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    <div className="w-[60%]">
                        <h1 className="text-[10rem] leading-28 pb-4 text-zinc-700 font-semibold tracking-tight">NOTHING.</h1>
                    </div>
                </div>
            </div>
            <div className="w-full h-2/5">

            </div>
        </section>
    )
}