// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getExpenses, addExpense } from '../api/expenseApi';

// export const fetchExpenses = createAsyncThunk('expense/fetchExpenses', async () => {
//   return await getExpenses();
// });

// export const createExpense = createAsyncThunk('expense/createExpense', async (expense) => {
//   return await addExpense(expense);
// });

// const expenseSlice = createSlice({
//   name: 'expense',
//   initialState: { expenses: [], loading: false },
//   extraReducers: (builder) => {
//     builder.addCase(fetchExpenses.fulfilled, (state, action) => {
//       state.expenses = action.payload;
//     });
//   }
// });

// export default expenseSlice.reducer;
