import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Update the path if necessary

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
