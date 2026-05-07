import Hero from "@/app/_components/Home/Hero";
import Features from "@/app/_components/Home/Features";
import Explore from "@/app/_components/Home/Explore";
import Information from "@/app/_components/Home/Information";
import Offers from "./_components/Home/Offers";
import Journal from "./_components/Home/Journal";
import Footer from "./_components/Extras/Footer";

export default function Home() {
  return (
    <section>
      <Hero />
      <Features />
      <Explore />
      <Information />
      <Offers />
      <Journal />
      <Footer />
    </section>
  );
}