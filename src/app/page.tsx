import Hero from "@/app/_components/Home/Hero";
import Features from "@/app/_components/Home/Features";
import Explore from "@/app/_components/Home/Explore";
import Information from "@/app/_components/Home/Information";
import Offers from "./_components/Home/Offers";
import Journal from "./_components/Home/Journal";

export default function Home() {
  return (
    <section>
      <Hero />
      <div className="h-screen w-full"></div>
      {/* <Features />
      <Explore />
      <Information />
      <Offers />
      <Journal /> */}
    </section>
  );
}