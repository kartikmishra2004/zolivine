'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, Leaf, Search, ShieldCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {

  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const leafRef = useRef(null);
  const empressRef = useRef(null);
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);
  const box4Ref = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: overlayRef.current,
        start: "-20%",
        scrub: true,
      }
    });

    tl.to(imageRef.current, {
      y: 200,
      duration: 0.7,
    }, 'a');

    tl.to(leafRef.current, {
      y: -350,
      duration: 0.5
    }, 'a');

    tl.to(empressRef.current, {
      y: -300,
      duration: 0.5
    }, 'a');

    tl.to(box1Ref.current, {
      y: -300
    }, 'a');

    tl.to(box2Ref.current, {
      y: -500,
    }, 'a');

    tl.to(box3Ref.current, {
      y: -600
    }, 'a');

    tl.to(box4Ref.current, {
      y: -400,
    }, 'a');

  });

  return (
    <section ref={overlayRef} className="w-full h-max bg-zinc-50">
      <div className="w-full px-20 py-14 h-[340px] flex">
        <div className="w-1/2 relative h-full flex flex-col gap-7">
          <h1 className="text-6xl text-zinc-700 font-semibold tracking-wider">
            PURE, RARE, <br />
            SOPHISTICATION
          </h1>
          <p className="text-xs tracking-wide text-zinc-700 w-[35%]">
            Small-batch perfumes with golden notes and pure botanicals — no compromises.
          </p>
          <h1 className="absolute underline font-semibold bottom-0 right-14 text-7xl font-editorialNew text-zinc-700 leading-20 tracking-tighter">fragrance.</h1>
        </div>
      </div>
      <div className="h-[1150px] w-full relative overflow-hidden">
        <div ref={box1Ref} className="absolute p-5 bg-[#eeeeee] flex flex-col items-center justify-center gap-6 left-[20%] w-[15rem] top-[20%] h-[20rem] rounded-xl z-30">
          <div className=" w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><Leaf className="text-zinc-700" strokeWidth={1.5} /></div>
          <h1 className="text-zinc-700 text-center font-semibold">Botanical Alchemy</h1>
          <p className="text-xs tracking-wide text-zinc-700 text-center">Blended with rare botanicals and golden essences, our perfumes are rooted in nature's finest.</p>
        </div>
        <div ref={box2Ref} className="absolute p-5 bg-[#eeeeee] flex flex-col items-center justify-center gap-6 w-[15rem] left-[3%] bottom-[20%] h-[20rem] rounded-xl z-30">
          <div className=" w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><FlaskConical className="text-zinc-700" strokeWidth={1.5} /></div>
          <h1 className="text-zinc-700 font-semibold text-center">Crafted<br /> in Small Batches</h1>
          <p className="text-xs tracking-wide text-zinc-700 text-center">Each scent is hand-poured in limited runs, ensuring exclusivity, quality, and attention to detail.</p>
        </div>
        <div ref={box3Ref} className="absolute p-5 bg-[#eeeeee] flex flex-col items-center justify-center gap-6 w-[15rem] right-[20%] -bottom-[40%] h-[20rem] rounded-xl z-30">
          <div className=" w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><ShieldCheck className="text-zinc-700" strokeWidth={1.5} /></div>
          <h1 className="text-zinc-700 text-center font-semibold">Pure, <br /> No Compromise</h1>
          <p className="text-xs tracking-wide text-zinc-700 text-center">Free from harmful additives. Only pure natural extracts and clean ingredients go into every bottle.</p>
        </div>
        <div ref={box4Ref} className="absolute p-5 bg-[#eeeeee] flex flex-col items-center justify-center gap-6 w-[15rem] right-[3%] bottom-0 h-[20rem] rounded-xl z-30">
          <div className=" w-22 h-22 bg-zinc-50 flex justify-center items-center rounded-full"><Search className="text-zinc-700" strokeWidth={1.5} /></div>
          <h1 className="text-zinc-700 text-center font-semibold">Honest Luxury</h1>
          <p className="text-xs tracking-wide text-zinc-700 text-center">No secrets. Every note, ingredient, and process is shared — because luxury should be transparent.</p>
        </div>
        <img ref={leafRef} className="absolute z-20 w-48 right-[22%] bottom-[40%]" src="/leaf.png" alt="leaf" />
        <img ref={empressRef} className="absolute z-20 w-48 left-[25%] bottom-0" src="/empress.png" alt="empress" />
        <img ref={imageRef} src="/man-spray-min.jpg" alt="Face" className="absolute man-image bottom-[30px] left-[170px] sm:left-[100px] lg:left-[150px] inset-0 lg:w-full w-[80%] lg:h-[90%] h-[80%] object-cover z-0" />
        <div className="absolute inset-0 bg-zinc-50" style={{
          maskImage: "radial-gradient(circle at center, transparent 45%, white 40.1%)",
          WebkitMaskImage: "radial-gradient(circle at center, transparent 40%, white 40.1%)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          transformOrigin: "center",
        }}></div>
      </div>
    </section>
  )
}