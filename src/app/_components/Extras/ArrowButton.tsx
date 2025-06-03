import { MoveRight } from "lucide-react";
import { useRef } from "react";
import gsap from 'gsap';

export interface ArrowButtonProps {
    hover?: boolean;
    height?: number;
    varient?: 'sm' | 'lg';
    color?: string;
    className?: string;
}

export default function ArrowButton({ hover = false, varient = 'lg', color = 'bg-zinc-700', className = 'flex' }: ArrowButtonProps) {

    const IconRef = useRef<HTMLSpanElement | null>(null);
    const rightArrow = useRef<SVGSVGElement | null>(null);
    const leftArrow = useRef<SVGSVGElement | null>(null);

    if (hover) {
        gsap.to(IconRef.current, { scale: 1.09, duration: 0.2 });
        gsap.to(rightArrow.current, { x: 40, duration: 0.7, ease: "power4.out", opacity: 0 });
        gsap.to(leftArrow.current, { x: varient === 'lg' ? 39 : 45, duration: 0.7, ease: "power4.out", opacity: 1 });
    } else {
        gsap.config({
            nullTargetWarn: false,
        });
        gsap.to(IconRef.current, { scale: 1, duration: 0.2 });
        gsap.to(rightArrow.current, { x: 0, duration: 0.7, ease: "power4.out", opacity: 1 });
        gsap.to(leftArrow.current, { x: 0, duration: 0.7, ease: "power4.out", opacity: 0 });
    }

    if (varient === 'lg') {
        return (
            <span ref={IconRef} className={`${className} w-12 h-12 overflow-hidden ${color} rounded-full absolute right-2 justify-center items-center`}>
                <MoveRight ref={rightArrow} className={`${color === 'bg-zinc-50' ? 'text-zinc-700' : 'text-zinc-50'} absolute w-3.5`} />
                <MoveRight ref={leftArrow} className={`${color === 'bg-zinc-50' ? 'text-zinc-700' : 'text-zinc-50'} right-14 w-3.5 absolute`} />
            </span>
        )
    } else if (varient === 'sm') {
        return (
            <span ref={IconRef} className={`${className} w-9 h-9 overflow-hidden ${color} rounded-full absolute right-2 justify-center items-center`}>
                <MoveRight ref={rightArrow} className={`${color === 'bg-zinc-50' ? 'text-zinc-700' : 'text-zinc-50'} absolute w-3`} />
                <MoveRight ref={leftArrow} className={`${color === 'bg-zinc-50' ? 'text-zinc-700' : 'text-zinc-50'} right-14 w-3 absolute`} />
            </span>
        )
    }
}