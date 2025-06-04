'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, Leaf, Search, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { EditorialNew } from "@/utils/fonts";
import { useAnimation } from '@/app/_context/AnimationContext';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {

  const animated = useAnimation((s) => s.hasAnimated('home-features'));
  const setAnimated = useAnimation((s) => s.setAnimated);
  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const leafRef = useRef(null);
  const empressRef = useRef(null);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: overlayRef.current,
        start: "-20%",
        end: '120%',
        scrub: true,
      }
    });

    tl.to(imageRef.current, {
      y: 200,
      duration: 0.7,
    }, 'a');

    tl.to(leafRef.current, {
      y: -550,
    }, 'a');

    tl.to(empressRef.current, {
      y: -500,
    }, 'a');

    tl.to(box1Ref.current, {
      y: -300,
    }, 'a');

    tl.to(box2Ref.current, {
      y: -500,
    }, 'a');

    tl.to(box3Ref.current, {
      y: -600,
      duration: 0.7,
    }, 'a');

    tl.to(box4Ref.current, {
      y: -400,
    }, 'a');

    if (!animated) {

      gsap.from(heading1Ref.current, {
        y: 60,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: overlayRef.current,
          start: '-24%',
        }
      });

      gsap.from(heading2Ref.current, {
        y: 60,
        duration: 0.9,
        delay: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: overlayRef.current,
          start: '-24%',
        }
      });

      gsap.from(lineRef.current, {
        width: 0,
        ease: 'power4.out',
        delay: 0.4,
        scrollTrigger: {
          trigger: overlayRef.current,
          start: '-24%',
        },
        onComplete: () => setAnimated('home-features', true)
      });
    }
  });

  return (
    <section ref={overlayRef} className="w-full h-max bg-zinc-50">
      <div className="w-full sm:px-20 px-5 py-14 h-[340px] flex">
        <div className="md:w-1/2 w-full relative h-full flex flex-col gap-7">
          <div className="">
            <div className="overflow-hidden">
              <h1 ref={heading1Ref} className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl text-zinc-700 font-semibold tracking-wider">
                PURE, RARE,
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 ref={heading2Ref} className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl text-zinc-700 font-semibold tracking-wider">
                SOPHISTICATION
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className={`font-semibold text-4xl p-2.5 block lg:hidden underline ${EditorialNew.className} text-zinc-700`}>fragrance.</h1>
            </div>
          </div>
          <p className="text-xs tracking-wide text-zinc-700 lg:w-[40%] w-3/4">
            Small-batch perfumes with golden notes and pure botanicals — no compromises.
          </p>
          <h1 className={`absolute font-semibold xl:bottom-[15px] lg:bottom-[40px] lg:block hidden right-0 xl:text-7xl lg:text-6xl ${EditorialNew.className} text-zinc-700`}>fragrance.</h1>
          <div ref={lineRef} className="xl:block hidden absolute w-[310px] h-1 bg-zinc-700 bottom-0 right-0"></div>
        </div>
      </div>
      <div className="lg:h-[1150px] sm:h-[600px] h-[300px] w-full relative overflow-hidden">
        <div ref={box1Ref} className="absolute p-5 bg-[#eeeeee] lg:flex hidden flex-col items-center justify-center gap-6 xl:left-[25%] left-[30%] w-[15rem] top-[20%] h-[20rem] rounded-xl z-30">
          <div className=" w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><Leaf className="text-zinc-700" strokeWidth={1.5} /></div>
          <h1 className="text-zinc-700 text-center font-semibold">Botanical Alchemy</h1>
          <p className="text-xs tracking-wide text-zinc-700 text-center">Blended with rare botanicals and golden essences, our perfumes are rooted in nature&apos;s finest.</p>
        </div>
        <div ref={box2Ref} className="absolute p-5 bg-[#eeeeee] lg:flex hidden flex-col items-center justify-center gap-6 w-[15rem] left-[3%] bottom-[20%] h-[20rem] rounded-xl z-30">
          <div className=" w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><FlaskConical className="text-zinc-700" strokeWidth={1.5} /></div>
          <h1 className="text-zinc-700 font-semibold text-center">Crafted<br /> in Small Batches</h1>
          <p className="text-xs tracking-wide text-zinc-700 text-center">Each scent is hand-poured in limited runs, ensuring exclusivity, quality, and attention to detail.</p>
        </div>
        <div ref={box3Ref} className="absolute p-5 bg-[#eeeeee] lg:flex hidden flex-col items-center justify-center gap-6 w-[15rem] xl:right-[25%] right-[30%] -bottom-[34%] h-[20rem] rounded-xl z-30">
          <div className=" w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><ShieldCheck className="text-zinc-700" strokeWidth={1.5} /></div>
          <h1 className="text-zinc-700 text-center font-semibold">Pure, <br /> No Compromise</h1>
          <p className="text-xs tracking-wide text-zinc-700 text-center">Free from harmful additives. Only pure natural extracts and clean ingredients go into every bottle.</p>
        </div>
        <div ref={box4Ref} className="absolute p-5 bg-[#eeeeee] lg:flex hidden flex-col items-center justify-center gap-6 w-[15rem] right-[3%] bottom-0 h-[20rem] rounded-xl z-30">
          <div className=" w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><Search className="text-zinc-700" strokeWidth={1.5} /></div>
          <h1 className="text-zinc-700 text-center font-semibold">Honest Luxury</h1>
          <p className="text-xs tracking-wide text-zinc-700 text-center">No secrets. Every note, ingredient, and process is shared — because luxury should be transparent.</p>
        </div>
        <Image priority width={500} height={500} ref={leafRef} className="absolute hidden lg:block select-none z-20 w-48 right-[22%] bottom-[30%]" src="/images/leaf.png" alt="leaf" />
        <Image priority width={500} height={500} ref={empressRef} className="absolute hidden lg:block select-none z-20 lg:w-48 w-20 left-[15%] sm:left-[20%] md:left-[25%] -bottom-20" src="/images/empress.png" alt="empress" />
        <Image priority width={3000} height={3000} ref={imageRef} src="/images/man-spray-min.jpg" alt="Face" className="absolute hidden lg:block select-none man-image sm:left-[100px] lg:left-[150px] sm:bottom-32 bottom-24 lg:inset-0 lg:w-full w-[100%] h-[100%] sm:w-[80%] sm:h-[90%] object-cover z-0" />
        <Image priority width={3000} height={3000} src="/images/man-spray-min.jpg" alt="Face" className="absolute block lg:hidden select-none left-5 w-[100%] h-[100%] object-cover z-0" />
        <div className="absolute inset-0 scale-140 sm:scale-100 bg-gradient-to-b bg-zinc-50" style={{
          maskImage: "radial-gradient(circle at center, transparent 45%, white 40.1%)",
          WebkitMaskImage: "radial-gradient(circle at center, transparent 40%, white 40.1%)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          transformOrigin: "center",
        }}></div>
      </div>
      <div className="w-full flex justify-center items-center lg:hidden h-[500px] bg-gradient-to-b from-zinc-50 via-[#eeeeee] to-[#eeeeee]">
        <div className="grid grid-cols-2 relative gap-x-14 sm:gap-x-52 gap-y-14 max-w-4xl mx-auto py-12">
          <div className="absolute inset-y-0 left-1/2 w-px bg-gray-300 transform -translate-x-1/2"></div>
          <div className="absolute inset-x-0 top-1/2 h-px bg-gray-300 transform -translate-y-1/2"></div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="sm:w-28 sm:h-28 w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><Leaf className="text-zinc-700" strokeWidth={1.5} /></div>
            <p className="font-semibold sm:text-sm text-xs">Botanical <br /> Alchemy</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="sm:w-28 sm:h-28 w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><FlaskConical className="text-zinc-700" strokeWidth={1.5} /></div>
            <p className="font-semibold sm:text-sm text-xs">Crafted<br /> in Small Batches</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="sm:w-28 sm:h-28 w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><ShieldCheck className="text-zinc-700" strokeWidth={1.5} /></div>
            <p className="font-semibold sm:text-sm text-xs">Pure, <br /> No Compromise</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="sm:w-28 sm:h-28 w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><Search className="text-zinc-700" strokeWidth={1.5} /></div>
            <p className="font-semibold sm:text-sm text-xs">Honest <br /> Luxury</p>
          </div>
        </div>
      </div>
    </section>
  )
}