import { products, getProductBySlug } from '@/utils/products';
import { notFound } from 'next/navigation';
import DetailHero from '@/app/_components/ProductDetail/DetailHero';
import DetailNotes from '@/app/_components/ProductDetail/DetailNotes';
import DetailRelated from '@/app/_components/ProductDetail/DetailRelated';
import Footer from '@/app/_components/Extras/Footer';

export function generateStaticParams() {
    return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return { title: 'Product Not Found' };
    return {
        title: `${product.name} — Zolivine`,
        description: product.description,
    };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return notFound();

    return (
        <section>
            <DetailHero product={product} />
            <DetailNotes product={product} />
            <DetailRelated currentSlug={slug} />
            <Footer />
        </section>
    );
}
