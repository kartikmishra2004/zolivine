import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';
import uiReducer from './uiSlice';
import authReducer from './authSlice';
import journalReducer from './journalSlice';
import galleryReducer from './gallerySlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
        ui: uiReducer,
        auth: authReducer,
        journal: journalReducer,
        gallery: galleryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
