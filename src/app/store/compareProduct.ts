import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompareProduct {
    id: string;  
    name: string; 
    price: number;  
    salePrice?: number;
    averageRating: number;
    totalReviews: number;
    image: string[];  
}

interface CompareProductsState {
    compareItems: CompareProduct[];
}

const initialState: CompareProductsState = {
    compareItems: [],
};

const compareProductsSlice = createSlice({
    name: "compareProducts",
    initialState,
    reducers: {
        addToCompare: (state, action: PayloadAction<CompareProduct>) => {
            const exists = state.compareItems.some(
                (item) => item.id === action.payload.id
            );
            if (!exists) {
                state.compareItems.push(action.payload);
            }
        },
        removeFromCompare: (state, action: PayloadAction<string>) => {
            state.compareItems = state.compareItems.filter(
                (item) => item.id !== action.payload
            );
        },
        clearCompare: (state) => {
            state.compareItems = [];
        },
    },
});

export const { addToCompare, removeFromCompare, clearCompare } =
    compareProductsSlice.actions;
export default compareProductsSlice.reducer;
