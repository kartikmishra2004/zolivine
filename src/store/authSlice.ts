import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// Mock API thunks
export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials: any, { rejectWithValue }) => {
        try {
            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            // For now, just return a mock user
            return {
                user: { id: '1', email: credentials.email, name: 'Guest User' },
                token: 'mock-jwt-token',
            };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const signupThunk = createAsyncThunk(
    'auth/signup',
    async (userData: any, { rejectWithValue }) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            return {
                user: { id: '2', email: userData.email, name: userData.name },
                token: 'mock-jwt-token',
            };
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Signup
            .addCase(signupThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(signupThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
    selectors: {
        selectUser: (state) => state.user,
        selectIsAuthenticated: (state) => state.isAuthenticated,
        selectAuthLoading: (state) => state.loading,
        selectAuthError: (state) => state.error,
    },
});

export const { logout, clearError } = authSlice.actions;
export const { selectUser, selectIsAuthenticated, selectAuthLoading, selectAuthError } = authSlice.selectors;
export default authSlice.reducer;
