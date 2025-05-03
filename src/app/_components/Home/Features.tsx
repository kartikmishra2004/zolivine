'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {

  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const leafRef = useRef(null);
  const empressRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: overlayRef.current,
        start: "-20%",
        scrub: 1,
      }
    });

    tl.to(imageRef.current, {
      y: 100,
      duration: 0.7,
    }, 'a');

    tl.to(leafRef.current, {
      y: -300,
      duration: 0.2
    }, 'a');

    tl.to(empressRef.current, {
      y: -300,
      duration: 0.5
    }, 'a');

  });

  return (
    <section ref={overlayRef} className="w-full h-[250vh] bg-zinc-50">
      <div className="w-full px-20 py-14 h-[50vh] flex">
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
      <div className="h-[120vh] w-full relative overflow-hidden">
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