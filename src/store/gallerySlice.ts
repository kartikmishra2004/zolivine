import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface GalleryState {
    imagesCol1: string[];
    imagesCol2: string[];
    imagesCol3: string[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: GalleryState = {
    imagesCol1: [],
    imagesCol2: [],
    imagesCol3: [],
    status: 'idle',
    error: null,
};

// Mock data to simulate API response
const mockImages = {
    imagesCol1: [
        '/images/1.png',
        '/images/gold-perfume.jpg',
        '/images/moa1.jpg',
        '/images/man-flower.jpg',
        '/images/5.png',
    ],
    imagesCol2: [
        '/images/2.png',
        '/images/women-spray.jpg',
        '/images/6.png',
        '/images/man-spray-min.jpg',
        '/images/blowup.jpg',
    ],
    imagesCol3: [
        '/images/3.png',
        '/images/signup.jpg',
        '/images/4.png',
        '/images/login.jpg',
        '/images/man.jpg',
    ]
};

// Async thunk prepared for actual API integration
export const fetchGalleryImages = createAsyncThunk(
    'gallery/fetchGalleryImages',
    async () => {
        // Replace with actual API call: const response = await fetch('/api/gallery'); return response.json();
        return new Promise<{imagesCol1: string[], imagesCol2: string[], imagesCol3: string[]}>((resolve) => setTimeout(() => resolve(mockImages), 600));
    }
);

const gallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGalleryImages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGalleryImages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.imagesCol1 = action.payload.imagesCol1;
                state.imagesCol2 = action.payload.imagesCol2;
                state.imagesCol3 = action.payload.imagesCol3;
            })
            .addCase(fetchGalleryImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch gallery images';
            });
    },
    selectors: {
        selectGalleryImages: (state) => ({
            imagesCol1: state.imagesCol1,
            imagesCol2: state.imagesCol2,
            imagesCol3: state.imagesCol3
        }),
        selectGalleryStatus: (state) => state.status,
    }
});

export const { selectGalleryImages, selectGalleryStatus } = gallerySlice.selectors;
export default gallerySlice.reducer;
