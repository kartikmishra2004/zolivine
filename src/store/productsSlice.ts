import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, products as productData } from '@/utils/products';

interface ProductsState {
    items: Product[];
    activeFilter: string;
}

const initialState: ProductsState = {
    items: productData,
    activeFilter: 'All',
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<string>) {
            state.activeFilter = action.payload;
        },
    },
    selectors: {
        selectAllProducts: (state) => state.items,
        selectActiveFilter: (state) => state.activeFilter,
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
    selectFilteredProducts,
    selectProductBySlug,
    selectRelatedProducts,
    selectProductsByCollection,
    selectHeroProducts,
} = productsSlice.selectors;
export default productsSlice.reducer;
