import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
// import expenseReducer from '../features/expenseSlice';
// import incomeReducer from '../features/incomeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // expense: expenseReducer,
    // income: incomeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
