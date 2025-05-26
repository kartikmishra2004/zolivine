'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

interface LoadingContextType {
    loading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({ loading: true });

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            document.body.style.position = "static";
        }, 5600);
        return () => clearTimeout(timer);
    }, []);

    return (
        <LoadingContext.Provider value={{ loading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
