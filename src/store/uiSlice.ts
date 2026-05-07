import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    isCartOpen: boolean;
}

const initialState: UIState = {
    isCartOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setCartOpen(state, action: PayloadAction<boolean>) {
            state.isCartOpen = action.payload;
        },
        toggleCart(state) {
            state.isCartOpen = !state.isCartOpen;
        },
    },
    selectors: {
        selectIsCartOpen: (state) => state.isCartOpen,
    },
});

export const { setCartOpen, toggleCart } = uiSlice.actions;
export const { selectIsCartOpen } = uiSlice.selectors;
export default uiSlice.reducer;
