
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
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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
      
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setOpenDialog(true)} sx={{ mr: 2 }}>
        Add Expense
      </Button>
      
      <Button variant="contained" color="secondary" startIcon={<Sort />} onClick={toggleSortOrder}>
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
                  <TableCell sx={{display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" startIcon={<Edit />} onClick={() => setOpenDialog(true)} sx={{ mr: 1, }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => console.log("Delete", expense.id)}>
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
    </>
  );
};

export default ExpenseManager;
