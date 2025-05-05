'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CornerRightDown, MoveRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Explore() {

  const screenRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const image1Ref = useRef(null);
  const rightIconRef = useRef<HTMLSpanElement | null>(null);
  const rightArrow = useRef<SVGSVGElement | null>(null);
  const leftArrow = useRef<SVGSVGElement | null>(null);
  const image2Ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: screenRef.current,
        start: "-15%",
      }
    });

    tl.from(heading1Ref.current, {
      y: 60,
      duration: 0.9,
      ease: 'power4.out',
    }, 'a');

    tl.from(heading2Ref.current, {
      y: 75,
      duration: 0.9,
      delay: 0.1,
      ease: 'power4.out',
    }, 'a');

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: screenRef.current,
        start: '-20%',
        scrub: true,
      }
    });

    tl2.to(image1Ref.current, {
      y: 450,
      ease: 'none',
    });

  });

  const handleButtonEnter = () => {
    gsap.to(rightIconRef.current, {
      scale: 1.09,
      duration: 0.2,
    });

    gsap.to(rightArrow.current, {
      x: 40,
      duration: 0.7,
      ease: 'power4.out',
      opacity: 0,
    });

    gsap.to(leftArrow.current, {
      x: 40,
      duration: 0.7,
      ease: 'power4.out',
      opacity: 1,
    });
  }

  const handleButtonLeave = () => {
    gsap.to(rightIconRef.current, {
      scale: 1,
      duration: 0.2,
    });

    gsap.to(rightArrow.current, {
      x: 0,
      duration: 0.7,
      ease: 'power4.out',
      opacity: 1,
    });

    gsap.to(leftArrow.current, {
      x: 0,
      duration: 0.7,
      ease: 'power4.out',
      opacity: 0,
    });
  }


  return (
    <section ref={screenRef} className="w-full h-[290vh] bg-zinc-50">
      <div className="w-[90%] h-[1px] bg-zinc-300 mx-auto"></div>
      <div className="w-full flex-col h-[330px] flex justify-center items-center relative">
        <div className="overflow-hidden">
          <h1 ref={heading1Ref} className="text-6xl tracking-wide font-semibold text-zinc-700">
            EXPLORE
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 ref={heading2Ref} className="text-[5rem] leading-16 h-[80px] flex items-start text-zinc-700 font-semibold font-editorialNew tracking-tighter">
            raw luxury
          </h1>
        </div>
        <span className="absolute bottom-[35%] right-[6%]"><CornerRightDown strokeWidth={1} className="text-zinc-700" /></span>
      </div>
      <div className="relative h-[120vh] w-full overflow-hidden">
        <Image height={2000} width={2000} ref={image1Ref} src="/women-spray.jpg" alt="women" className="absolute inset-0 w-full scale-200 -top-[7%] h-full object-contain z-0" />
        <div className="absolute inset-0 bg-zinc-50 z-10"
          style={{
            maskImage: "linear-gradient(to right, transparent 50%, white 50%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 50%, white 50%)",
            maskComposite: "exclude",
            WebkitMaskComposite: "destination-out",
          }}>
          <div className="w-[50.1%] px-20 absolute right-0 h-[200px] flex justify-between items-center">
            <div className="">
              <div className="overflow-hidden">
                <h1 className="text-5xl text-zinc-700">
                  Pure
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 className="text-5xl leading-12 h-[80px] flex items-start text-zinc-700 font- font-editorialNew tracking-tighter">
                  Brilliance
                </h1>
              </div>
            </div>
            <div className="">
              <Link onMouseEnter={handleButtonEnter} onMouseLeave={handleButtonLeave} href={'/products'}>
                <span ref={rightIconRef} className="w-12 h-12 overflow-hidden bg-zinc-700 rounded-full absolute right-16 bottom-16 flex justify-center items-center"><MoveRight ref={rightArrow} className="text-zinc-50 absolute w-3.5" /><MoveRight ref={leftArrow} className="text-zinc-50 right-14 w-3.5 absolute" /></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}