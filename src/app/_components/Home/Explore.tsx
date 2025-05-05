'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CornerRightDown, MoveRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Explore() {

  const screenRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const heading3Ref = useRef(null);
  const heading4Ref = useRef(null);
  const image1Ref = useRef(null);
  const rightIconRef = useRef<HTMLSpanElement | null>(null);
  const rightArrow = useRef<SVGSVGElement | null>(null);
  const leftArrow = useRef<SVGSVGElement | null>(null);
  const image2Ref = useRef(null);

  const exploreProducts = [
    {
      title: 'PURE BRILLIANCE',
      description: 'Aha brightning exfoliant cleanser/face wash',
      price: '₹899',
      image: 'https://images.prismic.io/truekind/ZurDj7VsGrYSvh0W_1.jpg?auto=format,compress'
    },
    {
      title: 'PURE BRILLIANCE',
      description: 'Aha brightning exfoliant cleanser/face wash',
      price: '₹899',
      image: 'https://images.prismic.io/truekind/ZurDj7VsGrYSvh0W_1.jpg?auto=format,compress'
    },
    {
      title: 'PURE BRILLIANCE',
      description: 'Aha brightning exfoliant cleanser/face wash',
      price: '₹899',
      image: 'https://images.prismic.io/truekind/ZurDj7VsGrYSvh0W_1.jpg?auto=format,compress'
    },
  ]

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: screenRef.current,
        start: "-20%",
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

    tl.from(heading3Ref.current, {
      y: 60,
      duration: 0.9,
      delay: 0.4,
      ease: 'power4.out',
    }, 'a');

    tl.from(heading4Ref.current, {
      y: 60,
      duration: 0.9,
      delay: 0.4,
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
        <Image priority height={2000} width={2000} ref={image1Ref} src="/women-spray.jpg" alt="women" className="absolute select-none inset-0 w-full scale-200 -top-[7%] h-full object-contain z-0" />
        <div className="absolute inset-0 bg-zinc-50 z-10"
          style={{
            maskImage: "linear-gradient(to right, transparent 50%, white 50%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 50%, white 50%)",
            maskComposite: "exclude",
            WebkitMaskComposite: "destination-out",
          }}>
          <div className="w-[50.1%] px-20 absolute right-0 h-[24%] flex justify-between items-center">
            <div className="">
              <div className="overflow-hidden">
                <h1 ref={heading3Ref} className="text-5xl text-zinc-700">
                  Pure
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 ref={heading4Ref} className="text-5xl leading-12 h-[45px] flex items-start text-zinc-700 font- font-editorialNew tracking-tighter">
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
          <div className="w-[50.1%] px-20 absolute right-0 bottom-[150px] h-[57%] overflow-x-auto flex items-center scroll-hide">
            <div className="flex-nowrap flex gap-4">
              {exploreProducts.map((item, id) => (
                <Link href={'/products'} key={id} className="bg-red-200 min-w-[19rem] h-[26rem] rounded-xl relative overflow-hidden">
                  <img className="absolute select-none w-full h-full object-cover z-0" src={item.image} alt="product" />
                  <div className="h-full z-10 absolute w-full flex flex-col justify-between p-4">
                    <div className="flex justify-between">
                      <div className="text-[11px] tracking-wider bg-zinc-50 flex justify-center items-center px-6 rounded-xl text-zinc-700">{item.title}</div>
                      <span className="bg-zinc-50 flex justify-center items-center w-7 rounded-full h-7"><ShoppingBag size={14} strokeWidth={1} /></span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm tracking-wider text-zinc-700 leading-4">{item.description}</p>
                      <p className="text-sm my-auto tracking-wider text-zinc-700">{item.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[50.1%] absolute right-0 bottom-0 h-[19%] px-20 pt-10">
            <p className="text-md text-zinc-700 w-[300px] capitalize">Stay radiant and refreshed, effortlessly scented by nature.</p>
          </div>
        </div>
      </div>
    </section>
  )
}