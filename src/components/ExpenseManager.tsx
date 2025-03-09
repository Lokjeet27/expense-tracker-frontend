

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";

// const ExpenseManager: React.FC = () => {
//   const token = useSelector((state: RootState) => state.auth.token);
//   const [expenses, setExpenses] = useState<any[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [selectedExpense, setSelectedExpense] = useState<any>(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" });

//   const expenseTypes = ["Food", "Rent", "Transport", "Entertainment", "Others"];

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const fetchExpenses = async () => {
//     if (!token) {
//       console.error("No token found. User may not be authenticated.");
//       return;
//     }

//     try {
//       const response = await axios.get("http://localhost:5000/api/expenses", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setExpenses(response.data);
//     } catch (error: any) {
//       console.error("Error fetching expenses:", error.response?.data || error.message);
//       setSnackbar({ open: true, message: "Failed to fetch expenses", severity: "error" });
//     }
//   };

//   const handleOpenDialog = (expense: any = null) => {
//     setEditMode(!!expense);
//     setSelectedExpense(expense || { type: "", amount: "" });
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleSaveExpense = async () => {
//     if (!selectedExpense.type || selectedExpense.amount <= 0) {
//       setSnackbar({ open: true, message: "Type and Amount are required. Amount should be >0", severity: "error" });
//       return;
//     }

//     try {
//       if (editMode) {
//         await axios.put(`http://localhost:5000/api/expenses/${selectedExpense.id}`, selectedExpense, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSnackbar({ open: true, message: "Expense updated successfully", severity: "success" });
//       } else {
//         await axios.post("http://localhost:5000/api/expenses", selectedExpense, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSnackbar({ open: true, message: "Expense added successfully", severity: "success" });
//       }
//       fetchExpenses();
//       handleCloseDialog();
//     } catch (error) {
//       console.error("Error saving expense:", error);
//       setSnackbar({ open: true, message: "Operation failed", severity: "error" });
//     }
//   };

//   const handleDeleteExpense = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this expense?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSnackbar({ open: true, message: "Expense deleted successfully", severity: "success" });
//       fetchExpenses();
//     } catch (error) {
//       console.error("Error deleting expense:", error);
//       setSnackbar({ open: true, message: "Failed to delete expense", severity: "error" });
//     }
//   };

//   return (
//     <>
//       <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
//       </Snackbar>

//       <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog()}>
//         Add Expense
//       </Button>

//       <TableContainer component={Paper} sx={{ mt: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Type</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {expenses.map((expense) => (
//               <TableRow key={expense.id}>
//                 <TableCell>{expense.type}</TableCell>
//                 <TableCell>${expense.amount}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="primary" startIcon={<Edit />} onClick={() => handleOpenDialog(expense)}>
//                     Edit
//                   </Button>
//                   <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => handleDeleteExpense(expense.id)} sx={{ ml: 1 }}>
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>{editMode ? "Edit Expense" : "Add Expense"}</DialogTitle>
//         <DialogContent>
//           <Select
//             fullWidth
//             value={selectedExpense?.type || ""}
//             onChange={(e) => setSelectedExpense({ ...selectedExpense, type: e.target.value })}
//             sx={{ mt: 2 }}
//           >
//             {expenseTypes.map((type) => (
//               <MenuItem key={type} value={type}>
//                 {type}
//               </MenuItem>
//             ))}
//           </Select>

//           <TextField
//             fullWidth
//             type="number"
//             label="Amount"
//             value={selectedExpense?.amount || ""}
//             onChange={(e) => {
//               const value = e.target.value === "" ? "" : parseFloat(e.target.value);
//               setSelectedExpense({ ...selectedExpense, amount: value });
//             }}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveExpense} color="primary" variant="contained">
//             {editMode ? "Update" : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ExpenseManager;


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
