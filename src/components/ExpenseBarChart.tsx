import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Expense {
  id: number;
  type: string;  // Updated to match API response
  amount: number;
}

const ExpenseBarChart: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get token from Redux store
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token from Redux
          },
        });

        console.log("Fetched Expenses:", response.data); // Debugging Log
        setExpenses(response.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching expenses:", err);
        setError("Failed to load expenses");
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [token]);

  return (
    <Paper elevation={3} sx={{ padding: 2, mt: 3 }}>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        Expense Breakdown
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" /> {/* Fixed: Mapping 'type' from API */}
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#4FFFB0" /> {/* Fixed: Using 'amount' */}
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default ExpenseBarChart;
