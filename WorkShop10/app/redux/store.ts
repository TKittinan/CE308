import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;