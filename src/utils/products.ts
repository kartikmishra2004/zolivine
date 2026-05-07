export interface Product {
    slug: string;
    collection: string;
    name: string;
    price: string;
    image: string;
    description: string;
    size: string;
    topNotes: string[];
    heartNotes: string[];
    baseNotes: string[];
    features: string[];
}

export const products: Product[] = [
    {
        slug: 'aha-brightening-cleanser',
        collection: 'PURE BRILLIANCE',
        name: 'Aha Brightening Exfoliant Cleanser',
        price: '₹899',
        image: '/images/1.png',
        description: 'A luminous blend of citrus top notes and delicate white florals that awakens the senses. Crafted with hand-harvested bergamot and rare jasmine petals, this fragrance transitions from bright morning zest to a warm, lingering sandalwood embrace.',
        size: '100ml',
        topNotes: ['Bergamot', 'Pink Pepper', 'Lemon Zest'],
        heartNotes: ['Jasmine', 'White Rose', 'Peony'],
        baseNotes: ['Sandalwood', 'Vanilla', 'White Musk'],
        features: ['100% Natural', 'Cruelty-Free', 'Vegan', 'Small Batch'],
    },
    {
        slug: 'radiant-glow-serum',
        collection: 'PURE BRILLIANCE',
        name: 'Radiant Glow Serum Mist',
        price: '₹949',
        image: '/images/2.png',
        description: 'An ethereal veil of dewy florals and crisp green notes that captures the first light of dawn. Wild-harvested neroli and morning dew accord create a scent that feels like sunlight on skin — fresh, warm, and impossibly radiant.',
        size: '75ml',
        topNotes: ['Neroli', 'Green Apple', 'Dew Drops'],
        heartNotes: ['Lily of the Valley', 'Iris', 'Magnolia'],
        baseNotes: ['Cedarwood', 'Ambrette', 'Skin Musk'],
        features: ['100% Natural', 'Cruelty-Free', 'Eco-Packaged', 'Small Batch'],
    },
    {
        slug: 'crystal-botanical-toner',
        collection: 'PURE BRILLIANCE',
        name: 'Crystal Clear Botanical Toner',
        price: '₹799',
        image: '/images/3.png',
        description: 'Translucent and meditative, this scent is a study in clarity. Alpine water accord meets crystalline musk in a fragrance stripped to its purest essence — clean, weightless, and deeply calming. Less is infinitely more.',
        size: '100ml',
        topNotes: ['Aldehyde', 'Water Accord', 'Mint'],
        heartNotes: ['White Tea', 'Lotus', 'Violet Leaf'],
        baseNotes: ['Crystal Musk', 'Driftwood', 'Cashmere'],
        features: ['100% Natural', 'Cruelty-Free', 'Vegan', 'Refillable'],
    },
    {
        slug: 'golden-hour-parfum',
        collection: 'GILDED ESSENCE',
        name: 'Golden Hour Eau de Parfum',
        price: '₹1299',
        image: '/images/4.png',
        description: 'Liquid gold distilled into fragrance. Saffron threads harvested at dawn, blended with smoky oud and honeyed amber, create an opulent scent that drapes the skin like warm light at sunset. Unapologetically luxurious.',
        size: '50ml',
        topNotes: ['Saffron', 'Cardamom', 'Blood Orange'],
        heartNotes: ['Turkish Rose', 'Oud', 'Incense'],
        baseNotes: ['Amber', 'Benzoin', 'Golden Honey'],
        features: ['Rare Ingredients', 'Hand-Poured', 'Cruelty-Free', 'Limited Edition'],
    },
    {
        slug: 'amber-velvet-mist',
        collection: 'GILDED ESSENCE',
        name: 'Amber Velvet Body Mist',
        price: '₹1199',
        image: '/images/5.png',
        description: 'A sensuous cocoon of amber, tonka, and dark vanilla that wraps around the skin like velvet. Blended with sustainably sourced Madagascan vanilla and Indonesian patchouli for a scent that is both intimate and unforgettable.',
        size: '150ml',
        topNotes: ['Black Pepper', 'Plum', 'Rum Accord'],
        heartNotes: ['Tuberose', 'Patchouli', 'Cinnamon'],
        baseNotes: ['Amber', 'Tonka Bean', 'Dark Vanilla'],
        features: ['Sustainably Sourced', 'Cruelty-Free', 'Vegan', 'Small Batch'],
    },
    {
        slug: 'royal-oud-oil',
        collection: 'GILDED ESSENCE',
        name: 'Royal Oud Fragrance Oil',
        price: '₹1499',
        image: '/images/6.png',
        description: 'The crown jewel of the collection. Wild Assam oud aged for decades, blended with Ethiopian frankincense and rare orris root. Each bottle is numbered, each drop is a meditation on the art of patience and the beauty of the rare.',
        size: '30ml',
        topNotes: ['Frankincense', 'Elemi', 'Pink Grapefruit'],
        heartNotes: ['Orris Root', 'Wild Oud', 'Labdanum'],
        baseNotes: ['Vetiver', 'Civet Accord', 'Aged Sandalwood'],
        features: ['Rare Ingredients', 'Hand-Poured', 'Numbered Edition', 'Refillable'],
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
}

export function getRelatedProducts(slug: string, count: number = 4): Product[] {
    return products.filter(p => p.slug !== slug).slice(0, count);
}
