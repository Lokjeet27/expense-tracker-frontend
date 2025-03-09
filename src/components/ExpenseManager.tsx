import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { Edit, Delete, Add, Sort } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ExpenseManager: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [expenseData, setExpenseData] = useState({ type: "Others", amount: "" });

  const expenseTypes = ["Food", "Rent", "Transport", "Entertainment", "Others"];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    if (!token) {
      console.error("No token found. User may not be authenticated.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error: any) {
      console.error("Error fetching expenses:", error.response?.data || error.message);
      setSnackbar({ open: true, message: "Failed to fetch expenses", severity: "error" });
    }
  };

  const handleAddOrUpdateExpense = async () => {
    if (!expenseData.amount || Number(expenseData.amount) <= 0) {
      setSnackbar({ open: true, message: "Amount must be a positive number", severity: "error" });
      return;
    }

    try {
      if (editMode && selectedExpense) {
        // Update expense
        await axios.put(`http://localhost:5000/api/expenses/${selectedExpense.id}`, expenseData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbar({ open: true, message: "Expense updated successfully", severity: "success" });
      } else {
        // Add new expense
        await axios.post("http://localhost:5000/api/expenses", expenseData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbar({ open: true, message: "Expense added successfully", severity: "success" });
      }

      fetchExpenses();
      setOpenDialog(false);
      setExpenseData({ type: "Others", amount: "" });
      setEditMode(false);
    } catch (error: any) {
      console.error("Error saving expense:", error.response?.data || error.message);
      setSnackbar({ open: true, message: "Failed to save expense", severity: "error" });
    }
  };

  const handleEditClick = (expense: any) => {
    setSelectedExpense(expense);
    setExpenseData({ type: expense.type, amount: expense.amount });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteExpense = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: "Expense deleted successfully", severity: "success" });
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      setSnackbar({ open: true, message: "Failed to delete expense", severity: "error" });
    }
  };
  const filteredExpenses = expenses
    .filter((expense) => (search ? expense.type.toLowerCase().includes(search.toLowerCase()) : true))
    .sort((a, b) => (sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount));

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <TextField
        label="Search by Type"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button variant="contained" sx={{ backgroundColor: "#6fffc1", color: "#000", mr: 2 }} startIcon={<Add />} onClick={() => setOpenDialog(true)}>
        Add Expense
      </Button>

      <Button variant="contained" sx={{ backgroundColor: "#cca3ff", color: "#000" }} startIcon={<Sort />} onClick={toggleSortOrder}>
        Sort by Amount ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", width: "33%" }}>Type</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "33%" }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "34%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell>${expense.amount}</TableCell>
                  <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" sx={{ backgroundColor: "#5dadec", color: "#000", mr: 1 }} startIcon={<Edit />} onClick={() => handleEditClick(expense)}>
                      Edit
                    </Button>
                    <Button variant="contained" sx={{ backgroundColor: "#fd0e35", color: "#000" }} startIcon={<Delete />} onClick={() => { handleDeleteExpense(expense.id)}}>
                      Del
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Record Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editMode ? "Edit Expense" : "Add Expense"}</DialogTitle>
        <DialogContent>
          <Select fullWidth value={expenseData.type} onChange={(e) => setExpenseData({ ...expenseData, type: e.target.value })}>
            {expenseTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
          <TextField fullWidth label="Amount" type="number" value={expenseData.amount} onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddOrUpdateExpense}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExpenseManager;
