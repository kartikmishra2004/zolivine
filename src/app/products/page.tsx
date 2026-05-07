import ProductHero from "@/app/_components/Products/ProductHero";
import ProductMarquee from "@/app/_components/Products/ProductMarquee";
import ProductGrid from "@/app/_components/Products/ProductGrid";
import Footer from "@/app/_components/Extras/Footer";

export default function Products() {
    return (
        <section>
            <ProductHero />
            <ProductMarquee />
            <ProductGrid />
            <Footer />
        </section>
    )
}