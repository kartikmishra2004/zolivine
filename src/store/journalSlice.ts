import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Article {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    image: string;
    featured?: boolean;
}

interface JournalState {
    articles: Article[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: JournalState = {
    articles: [],
    status: 'idle',
    error: null,
};

// Mock data to simulate API response
const mockArticles: Article[] = [
    {
        id: 1,
        title: "The Anatomy of a Signature Scent",
        excerpt: "Discover the delicate balance of top, heart, and base notes that define a truly unforgettable fragrance. A masterclass in olfactory architecture.",
        category: "Olfactory Art",
        date: "Oct 12, 2026",
        image: "/images/hanna-balan-d1GwyeOlZDw-unsplash.jpg",
        featured: true,
    },
    {
        id: 2,
        title: "Notes from the Perfumer's Desk",
        excerpt: "An intimate look at the creative process behind our latest seasonal collection and the inspirations drawn from the Mediterranean coast.",
        category: "Behind the Scenes",
        date: "Sep 28, 2026",
        image: "/images/blowup.jpg",
    },
    {
        id: 3,
        title: "Sourcing Ingredients: A Journey to Grasse",
        excerpt: "Traveling to the historical perfume capital of the world to find the purest jasmine and rose fields.",
        category: "Heritage",
        date: "Sep 15, 2026",
        image: "/images/man-flower.jpg",
    },
    {
        id: 4,
        title: "The Art of Layering Fragrances",
        excerpt: "How to combine scents to create a bespoke aroma uniquely tailored to your skin chemistry.",
        category: "Guide",
        date: "Aug 30, 2026",
        image: "/images/gold-perfume.jpg",
    },
    {
        id: 5,
        title: "Memories Captured in Glass",
        excerpt: "Exploring the profound psychological connection between scent and human memory. Why one drop can transport you decades back.",
        category: "Psychology",
        date: "Aug 12, 2026",
        image: "/images/women-spray.jpg",
    },
    {
        id: 6,
        title: "Sustainable Luxury in Perfumery",
        excerpt: "Our unwavering commitment to ethically sourced botanicals, cruelty-free processes, and fully recyclable eco-conscious packaging.",
        category: "Sustainability",
        date: "Jul 22, 2026",
        image: "/images/5.png",
    }
];

// Async thunk prepared for actual API integration
export const fetchArticles = createAsyncThunk(
    'journal/fetchArticles',
    async () => {
        // Replace with actual API call: const response = await fetch('/api/journal'); return response.json();
        return new Promise<Article[]>((resolve) => setTimeout(() => resolve(mockArticles), 800));
    }
);

const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch articles';
            });
    },
    selectors: {
        selectAllArticles: (state) => state.articles,
        selectFeaturedArticle: (state) => state.articles.find(a => a.featured) || state.articles[0],
        selectGridArticles: (state) => state.articles.filter(a => !a.featured),
        selectJournalStatus: (state) => state.status,
    }
});

export const { selectAllArticles, selectFeaturedArticle, selectGridArticles, selectJournalStatus } = journalSlice.selectors;
export default journalSlice.reducer;
