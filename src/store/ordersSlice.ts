import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface OrderItem {
    slug: string;
    quantity: number;
    price: string;
    name: string;
    image: string;
}

export interface Order {
    id: string;
    date: string;
    items: OrderItem[];
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    trackingNumber?: string;
    shippingAddress: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        postalCode: string;
    };
}

interface OrdersState {
    orders: Order[];
}

const initialState: OrdersState = {
    orders: [
        // Dummy initial order for preview
        {
            id: 'ORD-77291',
            date: 'Oct 24, 2023',
            total: 12500,
            status: 'Delivered',
            trackingNumber: 'ZL-992837465',
            items: [
                {
                    slug: 'pure-brilliance-01',
                    name: 'Gilded Essence',
                    quantity: 1,
                    price: '₹12,500',
                    image: '/images/products/p1.jpg'
                }
            ],
            shippingAddress: {
                firstName: 'John',
                lastName: 'Doe',
                address: '123 Luxury Lane',
                city: 'Mumbai',
                postalCode: '400001'
            }
        }
    ],
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.unshift(action.payload);
        },
    },
});

export const { addOrder } = ordersSlice.actions;

export const selectOrders = (state: RootState) => state.orders.orders;

export default ordersSlice.reducer;
