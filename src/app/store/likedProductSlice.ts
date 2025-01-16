import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface LikedProductsState {
    likedItems: LikedProduct[];
}

const initialState: LikedProductsState = {
    likedItems: [],
};

const likedProductsSlice = createSlice({
    name: 'likedProducts',
    initialState,
    reducers: {
        addToLikes: (state, action: PayloadAction<LikedProduct>) => {
            // Check if the product is already in the liked list to avoid duplicates
            const exists = state.likedItems.some(item => item.id === action.payload.id);
            if (!exists) {
                state.likedItems.push(action.payload);
            }
        },
        removeFromLikes: (state, action: PayloadAction<string>) => {
            state.likedItems = state.likedItems.filter(item => item.id !== action.payload);
        },
        clearLikes: (state) => {
            state.likedItems = [];
        },
    },
});

export const { addToLikes, removeFromLikes, clearLikes } = likedProductsSlice.actions;
export default likedProductsSlice.reducer;
