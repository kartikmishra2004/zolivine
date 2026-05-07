import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    slug: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<string>) {
            const existing = state.items.find(i => i.slug === action.payload);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ slug: action.payload, quantity: 1 });
            }
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(i => i.slug !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{ slug: string; quantity: number }>) {
            const item = state.items.find(i => i.slug === action.payload.slug);
            if (item) {
                item.quantity = Math.max(0, action.payload.quantity);
                if (item.quantity === 0) {
                    state.items = state.items.filter(i => i.slug !== action.payload.slug);
                }
            }
        },
        clearCart(state) {
            state.items = [];
        },
    },
    selectors: {
        selectCartItems: (state) => state.items,
        selectCartCount: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const { selectCartItems, selectCartCount } = cartSlice.selectors;
export default cartSlice.reducer;
