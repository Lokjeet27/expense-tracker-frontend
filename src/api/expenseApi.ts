import axios from '../utils/axiosInstance';

export const getExpenses = async () => {
  const response = await axios.get('/expenses');
  return response.data;
};

export const addExpense = async (expense: { amount: number; category: string; date: string }) => {
  const response = await axios.post('/expenses', expense);
  return response.data;
};

export const deleteExpense = async (id: string) => {
  const response = await axios.delete(`/expenses/${id}`);
  return response.data;
};
