'use client'
import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { fetchProducts } from './productsSlice';
import { useAppDispatch } from './hooks';

function DataLoader({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    return <>{children}</>;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <DataLoader>
                {children}
            </DataLoader>
        </Provider>
    );
}
