import axios from '../utils/axiosInstance';

export const getIncome = async () => {
  const response = await axios.get('/income');
  return response.data;
};

export const addIncome = async (income: { amount: number; source: string; date: string }) => {
  const response = await axios.post('/income', income);
  return response.data;
};
