import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import ItemCard from "./CardLayout";

const CardItems = () => {
  const [income, setIncome] = useState<number | null>(null);
  const [expense, setExpense] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [openIncomeDialog, setOpenIncomeDialog] = useState<boolean>(false);
  const [newIncome, setNewIncome] = useState<number | string>("");

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. User may not be authenticated.");
          return;
        }

        // Fetch income
        const incomeResponse = await axios.get("http://localhost:5000/api/income", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedIncome = incomeResponse.data.amount || null;

        // Fetch total expenses
        const expensesResponse = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const totalExpense = expensesResponse.data.reduce(
          (sum: number, expense: any) => sum + expense.amount,
          0
        );

        setIncome(fetchedIncome);
        setExpense(totalExpense);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, []);

  // Calculate balance
  const balance = (income ?? 0) - (expense ?? 0);

  // Handle Income Click - Open Dialog
  const handleIncomeClick = () => {
    setNewIncome(income ?? ""); // Set existing income or empty string
    setOpenIncomeDialog(true);
  };

  // Update Income in API
  const updateIncome = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User may not be authenticated.");
        return;
      }
  
      // Ensure newIncome is a valid number before sending
      const incomeAmount = Number(newIncome);
      if (isNaN(incomeAmount) || incomeAmount <= 0) {
        alert("Please enter a valid income amount.");
        return;
      }
  
      await axios.put( // Change POST to PUT if required by API
        "http://localhost:5000/api/income",
        { amount: incomeAmount },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json" // Ensure JSON content type
          }
        }
      );
  
      setIncome(incomeAmount);
      setOpenIncomeDialog(false);
    } catch (error) {
      console.error("Error updating income:", error);
      alert("Failed to update income. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 3 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4} onClick={handleIncomeClick} sx={{ cursor: "pointer" }}>
            <ItemCard itemName="Income" amount={income ?? 0} />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ cursor: "pointer" }}>
            <ItemCard itemName="Expense" amount={expense ?? 0} income={income ?? 0} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ItemCard itemName="Balance" amount={balance} income={income ?? 0} />
          </Grid>
        </Grid>
      )}

      {/* Income Update Dialog */}
      <Dialog open={openIncomeDialog} onClose={() => setOpenIncomeDialog(false)}>
        <DialogTitle>Update Income</DialogTitle>
        <DialogContent>
          <TextField
            label="New Income Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={newIncome}
            onChange={(e) => setNewIncome(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIncomeDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={updateIncome} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CardItems;
