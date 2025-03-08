// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getIncome, addIncome } from '../api/incomeApi';

// export const fetchIncome = createAsyncThunk('income/fetchIncome', async () => {
//   return await getIncome();
// });

// export const createIncome = createAsyncThunk('income/createIncome', async (income) => {
//   return await addIncome(income);
// });

// const incomeSlice = createSlice({
//   name: 'income',
//   initialState: { income: [], loading: false },
//   extraReducers: (builder) => {
//     builder.addCase(fetchIncome.fulfilled, (state, action) => {
//       state.income = action.payload;
//     });
//   }
// });

// export default incomeSlice.reducer;
