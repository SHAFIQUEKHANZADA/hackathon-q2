import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';  
import likedProductsReducer from './likedProductSlice';
import compareProductsReducer from "./compareProduct";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    likedProducts: likedProductsReducer,
    compareProducts: compareProductsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
