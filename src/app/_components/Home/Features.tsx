export default function Features() {
  return (
    <section className="w-full h-[250vh] bg-zinc-50">
      <div className="w-full px-20 py-28 h-[62vh] flex">
        <div className="w-1/2 relative h-full flex flex-col gap-7">
          <h1 className="text-6xl text-zinc-700 font-semibold tracking-wider">
            PURE, RARE, <br />
            SOPHISTICATION
          </h1>
          <p className="text-xs  tracking-wide text-zinc-700 w-[35%]">
            Small-batch perfumes with golden notes and pure botanicals — no compromises.
          </p>
          <h1 className="absolute underline font-semibold bottom-0 right-14 text-7xl font-editorialNew text-zinc-700 leading-20 tracking-tighter">fragrance.</h1>
        </div>
      </div>
      <div className="h-[120vh] w-full relative overflow-hidden">
        <img src="/logo.png" alt="Face" className="absolute man-image bottom-[30px] left-[220px] inset-0 w-[81vw] h-full object-cover z-0" />
        <div className="absolute inset-0 bg-zinc-50" style={{
          maskImage: "radial-gradient(ellipse at center, transparent 45%, white 40.1%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, transparent 40%, white 40.1%)",
          maskComposite: "exclude",
          WebkitMaskComposite: "destination-out",
          transform: "rotate(130deg)",
          transformOrigin: "center",
        }}></div>
      </div>
    </section>
  )
}