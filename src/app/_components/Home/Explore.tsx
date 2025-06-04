'use client'
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CornerRightDown, ShoppingBag } from "lucide-react";
import Link from "next/link";
import ArrowButton from "../Extras/ArrowButton";
import { useGSAP } from "@gsap/react";
import { EditorialNew } from "@/utils/fonts";
import { useAnimation } from '@/app/_context/AnimationContext';

gsap.registerPlugin(ScrollTrigger);

export default function Explore() {

  const animated = useAnimation((s) => s.hasAnimated('home-explore'));
  const setAnimated = useAnimation((s) => s.setAnimated);
  const screenRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const heading3Ref = useRef(null);
  const heading4Ref = useRef(null);
  const heading5Ref = useRef(null);
  const heading6Ref = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [arrow1Hovered, setArrow1Hovered] = useState(false);
  const [arrow2Hovered, setArrow2Hovered] = useState(false);

  const pureBrilliance = [
    {
      title: 'PURE BRILLIANCE',
      description: 'Aha brightning exfoliant cleanser/face wash',
      price: '₹899',
      image: '/images/1.png'
    },
    {
      title: 'PURE BRILLIANCE',
      description: 'Aha brightning exfoliant cleanser/face wash',
      price: '₹899',
      image: '/images/2.png'
    },
    {
      title: 'PURE BRILLIANCE',
      description: 'Aha brightning exfoliant cleanser/face wash',
      price: '₹899',
      image: '/images/3.png'
    },
  ]

  const gildedEssence = [
    {
      title: 'GILDED ESSENCE',
      description: 'Aha brightning exfoliant cleanser/face wash',
      price: '₹1299',
      image: '/images/4.png'
    },
    {
      title: 'GILDED ESSENCE',
      description: 'Aha brightning exfoliant cleanser/face wash',
      price: '₹1299',
      image: '/images/5.png'
    },
    {
      title: 'GILDED ESSENCE',
      description: 'Aha brightning exfoliant cleanser/face wash',
      price: '₹1299',
      image: '/images/6.png'
    },
  ]

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft = container.scrollWidth;
    }
  }, []);

  useGSAP(() => {

    if (!animated) {

      gsap.from(heading1Ref.current, {
        y: 60,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: screenRef.current,
          start: '-20%',
        }
      });

      gsap.from(heading2Ref.current, {
        y: 90,
        duration: 0.9,
        delay: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: screenRef.current,
          start: '-20%',
        }
      });

      gsap.from(heading3Ref.current, {
        y: 60,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: screenRef.current,
          start: '-5%',
        }
      });

      gsap.from(heading4Ref.current, {
        y: 60,
        duration: 0.9,
        delay: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: screenRef.current,
          start: '-5%',
        }
      });

      gsap.from(heading5Ref.current, {
        y: 60,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: screenRef.current,
          start: '35%',
        }
      });

      gsap.from(heading6Ref.current, {
        y: 60,
        duration: 0.9,
        delay: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: screenRef.current,
          start: '35%',
        }
      });

      gsap.utils.toArray<HTMLElement>(".product-card1").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: screenRef.current,
            start: '-5%',
          },
          rotateZ: -5,
          delay: 0.2,
          x: 60,
          y: -30,
          opacity: 0,
          duration: 1,
        });
      });

      gsap.utils.toArray<HTMLElement>(".product-card2").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: screenRef.current,
            start: '35%',
          },
          rotateZ: 5,
          delay: 0.2,
          x: -60,
          y: 30,
          opacity: 0,
          duration: 1,
          onComplete: () => setAnimated('home-explore', true)
        });
      });
    }

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
    }, 'image');

    tl2.to(image2Ref.current, {
      y: 450,
      ease: 'none',
    }, 'image+=0.2');
  });

  return (
    <section ref={screenRef} className="w-full h-max bg-zinc-50">
      <div className="w-[90%] lg:block hidden h-[1px] bg-zinc-400/70 mx-auto"></div>
      <div className="w-full flex-col md:h-[330px] sm:h-[230px] h-[130px] flex justify-center items-center relative">
        <div className="overflow-hidden">
          <h1 ref={heading1Ref} className="md:text-6xl sm:text-5xl text-3xl tracking-wide font-semibold text-zinc-700">
            EXPLORE
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 ref={heading2Ref} className={`md:text-[5rem] sm:text-[4.5rem] text-[2.5rem] md:leading-24 sm:leading-16 leading-5 sm:h-[90px] h-[30px] flex items-start text-zinc-700 font-normal ${EditorialNew.className} pr-1 tracking-tighter`}>
            raw luxury
          </h1>
        </div>
        <span className="absolute bottom-[35%] right-[6%]"><CornerRightDown strokeWidth={1} className="text-zinc-700" /></span>
      </div>

      {/* Product section #1 */}
      <div className="relative sm:h-[120vh] h-[85vh] w-full overflow-hidden">
        <Image priority height={2000} width={2000} ref={image1Ref} src="/images/women-spray.jpg" alt="women" className="absolute lg:block hidden select-none inset-0 w-full scale-200 -top-[7%] h-full object-contain z-0" />
        <div className="absolute inset-0 lg:left-0 left-[-100%] bg-zinc-50 z-10"
          style={{
            maskImage: "linear-gradient(to right, transparent 50%, white 50%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 50%, white 50%)",
            maskComposite: "exclude",
            WebkitMaskComposite: "destination-out",
          }}>
          <div className="w-[50.1%] lg:px-16 px-7 absolute right-0 h-[24%] flex justify-between items-center">
            <div className="">
              <div className="overflow-hidden">
                <h1 ref={heading3Ref} className="sm:text-5xl text-3xl text-zinc-700">
                  Pure
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 ref={heading4Ref} className={`sm:text-5xl text-3xl sm:leading-16 h-[47px] flex items-start text-zinc-700 ${EditorialNew.className} pr-1 tracking-tight font-extralight`}>
                  Brilliance
                </h1>
              </div>
            </div>
            <div className="relative pb-10 sm:pb-0">
              <Link className="mr-16" onMouseEnter={() => setArrow1Hovered(true)} onMouseLeave={() => setArrow1Hovered(false)} href={'/products'}>
                <ArrowButton hover={arrow1Hovered} />
              </Link>
            </div>
          </div>
          <div className="w-[50.1%] lg:px-16 px-7 absolute right-0 bottom-[150px] h-[57%] overflow-x-auto flex items-center scroll-hide">
            <div className="flex-nowrap flex gap-4">
              {pureBrilliance.map((item, id) => (
                <Link href={'/products'} key={id} className="product-card1 bg-red-200 sm:min-w-[19rem] min-w-[16rem] h-[22rem] sm:h-[26rem] rounded-xl relative overflow-hidden">
                  <Image height={416} width={304} alt='product-img' className="absolute select-none w-full h-full object-cover z-0" src={item.image} />
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
          <div className="w-[50.1%] absolute right-0 bottom-0 h-[19%] lg:px-16 px-7 sm:pt-10">
            <p className="sm:text-sm text-xs text-zinc-700 w-[300px]">STAY RADIANT AND REFRESHED, EFFORTLESSLY SCENTED BY NATURE.</p>
          </div>
        </div>
      </div>

      {/* Product section #2 */}
      <div className="relative sm:h-[120vh] h-[85vh] w-full overflow-hidden">
        <Image priority height={2000} width={2000} ref={image2Ref} src="/images/man-flower.jpg" alt="women" className="absolute lg:block hidden select-none inset-0 w-full scale-150 -top-[7%] h-full object-contain z-0" />
        <div className="absolute lg:right-0 right-[-100%] inset-0 bg-zinc-50 z-10"
          style={{
            maskImage: "linear-gradient(to left, transparent 50%, white 50%)",
            WebkitMaskImage: "linear-gradient(to left, transparent 50%, white 50%)",
            maskComposite: "exclude",
            WebkitMaskComposite: "destination-out",
          }}>
          <div className="w-[50.1%] lg:px-16 px-7 absolute left-0 h-[24%] flex justify-between items-center">
            <div className="">
              <div className="overflow-hidden">
                <h1 ref={heading5Ref} className="sm:text-5xl text-3xl text-zinc-700">
                  Gilded
                </h1>
              </div>
              <div className="overflow-hidden">
                <h1 ref={heading6Ref} className={`sm:text-5xl text-3xl sm:leading-16 h-[47px] flex items-start text-zinc-700 ${EditorialNew.className} pr-1 tracking-tight font-extralight`}>
                  Essence
                </h1>
              </div>
            </div>
            <div className="relative pb-10 sm:pb-0">
              <Link className="mr-16" onMouseEnter={() => setArrow2Hovered(true)} onMouseLeave={() => setArrow2Hovered(false)} href={'/products'}>
                <ArrowButton hover={arrow2Hovered} />
              </Link>
            </div>
          </div>
          <div className="w-[50.1%] lg:px-16 px-7 absolute bottom-[150px] h-[57%] overflow-x-auto flex items-center scroll-hide" ref={scrollContainerRef}>
            <div className="flex-nowrap flex gap-4">
              {gildedEssence.map((item, id) => (
                <Link href={'/products'} key={id} className="bg-[#d8cec4] product-card2 sm:min-w-[19rem] min-w-[16rem] h-[22rem] sm:h-[26rem] rounded-xl relative overflow-hidden">
                  <Image height={416} width={304} className="absolute select-none w-full h-full object-cover z-0" src={item.image} alt="product-img" />
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
          <div className="w-[50.1%] absolute left-0 bottom-0 h-[19%] lg:px-16 px-7 sm:pt-10">
            <p className="sm:text-sm text-xs text-zinc-700 w-[300px]">GLOW IN GOLDEN GRACE, EFFORTLESSLY WRAPPED IN TIMELESS SCENT.</p>
          </div>
        </div>
      </div>
    </section>
  )
}