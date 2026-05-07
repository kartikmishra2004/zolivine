import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, products as productData } from '@/utils/products';

interface ProductsState {
    items: Product[];
    activeFilter: string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    activeFilter: 'All',
    status: 'idle',
    error: null,
};

// Async thunk prepared for actual API integration
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        // Replace with actual API call: const response = await fetch('/api/products'); return response.json();
        return new Promise<Product[]>((resolve) => setTimeout(() => resolve(productData), 500));
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
    selectors: {
        selectAllProducts: (state) => state.items,
        selectActiveFilter: (state) => state.activeFilter,
        selectProductsStatus: (state) => state.status,
        selectFilteredProducts: (state) => {
            if (state.activeFilter === 'All') return state.items;
            return state.items.filter(p => p.collection === state.activeFilter.toUpperCase());
        },
        selectProductBySlug: (state) => (slug: string) =>
            state.items.find(p => p.slug === slug),
        selectRelatedProducts: (state) => (slug: string, count: number = 4) =>
            state.items.filter(p => p.slug !== slug).slice(0, count),
        selectProductsByCollection: (state) => (collection: string) =>
            state.items.filter(p => p.collection === collection),
        selectHeroProducts: (state) => state.items.slice(0, 4),
    },
});

export const { setFilter } = productsSlice.actions;
export const {
    selectAllProducts,
    selectActiveFilter,
    selectProductsStatus,
    selectFilteredProducts,
    selectProductBySlug,
    selectRelatedProducts,
    selectProductsByCollection,
    selectHeroProducts,
} = productsSlice.selectors;
export default productsSlice.reducer;
