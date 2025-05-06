import Hero from "@/app/_components/Home/Hero";
import Features from "@/app/_components/Home/Features";
import Explore from "@/app/_components/Home/Explore";
import Information from "@/app/_components/Home/Information";

export default function Home() {
  return (
    <section>
      <Hero />
      <Features />
      <Explore />
      <Information />
    </section>
  );
}