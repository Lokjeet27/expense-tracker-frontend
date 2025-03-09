// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { 
//   BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
// } from "recharts";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { 
//   Button, Card, CardContent, Typography, Avatar, CircularProgress, Box, Paper 
// } from "@mui/material";
// import { blue, green, red, grey } from "@mui/material/colors";
// import profilePic from "../assets/avatar-25.webp";

// interface Expense {
//   type: string;
//   cost: number;
// }

// const ExpenseReport: React.FC = () => {
//   const reportRef = useRef<HTMLDivElement>(null);
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [financials, setFinancials] = useState({
//     income: 0,  // Initially 0, will be fetched from API
//     expenses: 0,
//     balance: 0,
//   });

//   // Fetch income and expenses from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch income
//         const incomeResponse = await axios.get("https://expense-tracker-backend-1e0i.onrender.com/api/income", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });

//         const income = incomeResponse.data.amount || 0;

//         // Fetch expenses
//         const expensesResponse = await axios.get("https://expense-tracker-backend-1e0i.onrender.com/api/expenses", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });

//         const expensesData: Expense[] = expensesResponse.data.map((expense: any) => ({
//           type: (expense.type).substring(0,5),
//           cost: expense.amount, // Map 'amount' to 'cost'
//         }));

//         const totalExpenses = expensesData.reduce((sum, expense) => sum + expense.cost, 0);
//         const balance = income - totalExpenses;

//         // Update state
//         setExpenses(expensesData);
//         setFinancials({
//           income,
//           expenses: totalExpenses,
//           balance,
//         });

//         console.log("Expense Report Data:", expensesData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Generate suggestions based on balance
//   const getSuggestions = () => {
//     if (financials.balance > 3000) {
//       return [
//         "✅ Great job! Consider investing a portion of your balance for future growth.",
//         "✅ You have enough savings. You might want to donate or help someone in need.",
//       ];
//     } else if (financials.balance > 1000) {
//       return [
//         "⚠️ You're managing well! Try cutting down on small unnecessary expenses to save more.",
//         "⚠️ Consider setting up an emergency fund for unexpected situations.",
//       ];
//     } else {
//       return [
//         "❌ Your balance is low! Avoid unnecessary spending and focus on essentials.",
//         "❌ Try tracking daily expenses to understand where your money is going.",
//       ];
//     }
//   };

//   const handleDownload = async () => {
//     if (!reportRef.current) return;
//     const canvas = await html2canvas(reportRef.current);
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF("p", "mm", "a4");
//     pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
//     pdf.save(`ExpenseReport_${new Date().toISOString()}.pdf`);
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: grey[100], width: "100%", padding: 3 }}>
//       <Paper elevation={4} sx={{ width: "100%", padding: 3, borderRadius: 3, backgroundColor: "white" }}>
//         <Card ref={reportRef} sx={{ padding: 3, backgroundColor: blue[50] }}>
//           <CardContent>
//             {/* User Info */}
//             <Box display="flex" alignItems="center">
//               <Avatar src={profilePic} sx={{ width: 80, height: 80, marginRight: 2, border: `2px solid ${blue[500]}` }} />
//               <Box>
//                 <Typography variant="h5" color={blue[900]} fontWeight="bold">
//                   Jaydon Frankie
//                 </Typography>
//                 <Typography variant="body1" color={grey[700]}>
//                   jaydon.frankie@example.com
//                 </Typography>
//               </Box>
//             </Box>

//             {/* Financial Summary */}
//             <Typography variant="h6" sx={{ mt: 3, color: blue[900] }}>Financial Summary</Typography>
//             <Box display="flex" flexDirection="column" gap={1}>
//               <Typography variant="body1" color={green[700]}>💰 Income: ${financials.income}</Typography>
//               <Typography variant="body1" color={red[700]}>💸 Expenses: ${financials.expenses}</Typography>
//               <Typography variant="body1" color={financials.balance > 0 ? green[700] : red[700]}>
//                 🔹 Balance: ${financials.balance}
//               </Typography>
//             </Box>

//             {/* Expense Breakdown Graph */}
//             <Typography variant="h6" sx={{ mt: 3, color: blue[900] }}>Expense Breakdown</Typography>
//             {loading ? (
//               <CircularProgress />
//             ) : (
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={expenses}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="type" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="cost" fill={red[500]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             )}

//             {/* Suggestions */}
//             <Typography variant="h6" sx={{ mt: 3, color: blue[900] }}>Suggestions</Typography>
//             {getSuggestions().map((suggestion, index) => (
//               <Typography key={index} variant="body2" sx={{ mt: 1, color: grey[800] }}>
//                 {suggestion}
//               </Typography>
//             ))}
//           </CardContent>
//         </Card>

//         {/* Download Button Positioned at Bottom Right */}
//         <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
//           <Button variant="contained" color="primary" onClick={handleDownload}>
//             Download Report 📄
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default ExpenseReport;



import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwtDecode to decode JWT
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { 
  Button, Card, CardContent, Typography, Avatar, CircularProgress, Box, Paper 
} from "@mui/material";
import { blue, green, red, grey } from "@mui/material/colors";
import profilePic from "../assets/avatar-25.webp";

interface Expense {
  type: string;
  cost: number;
}

interface DecodedToken {
  email: string;
}

const ExpenseReport: React.FC = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("user@example.com");
  const [userName, setUserName] = useState<string>("User");

  const [financials, setFinancials] = useState({
    income: 0,  // Initially 0, will be fetched from API
    expenses: 0,
    balance: 0,
  });

  // Extract user email and username from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.email) {
          setUserEmail(decoded.email);
          setUserName(decoded.email.split("@")[0]); // Extract username from email
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch income and expenses from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch income
        const incomeResponse = await axios.get("https://expense-tracker-backend-1e0i.onrender.com/api/income", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const income = incomeResponse.data.amount || 0;

        // Fetch expenses
        const expensesResponse = await axios.get("https://expense-tracker-backend-1e0i.onrender.com/api/expenses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const expensesData: Expense[] = expensesResponse.data.map((expense: any) => ({
          type: expense.type.substring(0, 5),
          cost: expense.amount, // Map 'amount' to 'cost'
        }));

        const totalExpenses = expensesData.reduce((sum, expense) => sum + expense.cost, 0);
        const balance = income - totalExpenses;

        // Update state
        setExpenses(expensesData);
        setFinancials({
          income,
          expenses: totalExpenses,
          balance,
        });

        console.log("Expense Report Data:", expensesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate suggestions based on balance
  const getSuggestions = () => {
    if (financials.balance > 3000) {
      return [
        "✅ Great job! Consider investing a portion of your balance for future growth.",
        "✅ You have enough savings. You might want to donate or help someone in need.",
      ];
    } else if (financials.balance > 1000) {
      return [
        "⚠️ You're managing well! Try cutting down on small unnecessary expenses to save more.",
        "⚠️ Consider setting up an emergency fund for unexpected situations.",
      ];
    } else {
      return [
        "❌ Your balance is low! Avoid unnecessary spending and focus on essentials.",
        "❌ Try tracking daily expenses to understand where your money is going.",
      ];
    }
  };

  const handleDownload = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(`ExpenseReport_${new Date().toISOString()}.pdf`);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: grey[100], width: "100%", padding: 3 }}>
      <Paper elevation={4} sx={{ width: "100%", padding: 3, borderRadius: 3, backgroundColor: "white" }}>
        <Card ref={reportRef} sx={{ padding: 3, backgroundColor: blue[50] }}>
          <CardContent>
            {/* User Info */}
            <Box display="flex" alignItems="center">
              <Avatar src={profilePic} sx={{ width: 80, height: 80, marginRight: 2, border: `2px solid ${blue[500]}` }} />
              <Box>
                <Typography variant="h5" color={blue[900]} fontWeight="bold">
                  {userName}
                </Typography>
                <Typography variant="body1" color={grey[700]}>
                  {userEmail}
                </Typography>
              </Box>
            </Box>

            {/* Financial Summary */}
            <Typography variant="h6" sx={{ mt: 3, color: blue[900] }}>Financial Summary</Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body1" color={green[700]}>💰 Income: ${financials.income}</Typography>
              <Typography variant="body1" color={red[700]}>💸 Expenses: ${financials.expenses}</Typography>
              <Typography variant="body1" color={financials.balance > 0 ? green[700] : red[700]}>
                🔹 Balance: ${financials.balance}
              </Typography>
            </Box>

            {/* Expense Breakdown Graph */}
            <Typography variant="h6" sx={{ mt: 3, color: blue[900] }}>Expense Breakdown</Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={expenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill={red[500]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {/* Suggestions */}
            <Typography variant="h6" sx={{ mt: 3, color: blue[900] }}>Suggestions</Typography>
            {getSuggestions().map((suggestion, index) => (
              <Typography key={index} variant="body2" sx={{ mt: 1, color: grey[800] }}>
                {suggestion}
              </Typography>
            ))}
          </CardContent>
        </Card>

        {/* Download Button Positioned at Bottom Right */}
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download Report 📄
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ExpenseReport;
