import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';  
import likedProductsReducer from './likedProductSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    likedProducts: likedProductsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
