import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

// Define props for the component
interface ItemCardProps {
  itemName: string;
  amount: number;
  income?: number; // To compare against expense & balance
}

// Define the card component
const ItemCard: React.FC<ItemCardProps> = ({ itemName, amount, income = 0 }) => {
  let bgColor = "#4FFFB0"; // Default green

  if (itemName.toLowerCase() === "income") {
    bgColor = "#4FFFB0"; // Always green for income
  } else if (itemName.toLowerCase() === "expense") {
    const expensePercentage = (amount / income) * 100;

    if (expensePercentage <= 50) bgColor = "#4FFFB0"; // Green
    else if (expensePercentage > 50 && expensePercentage <= 80) bgColor = "#FFD700"; // Yellow
    else if (expensePercentage > 80 && expensePercentage < 100) bgColor = "#FFA500"; // Orange
    else if (expensePercentage >= 100) bgColor = "#FF5733"; // Red
  } else if (itemName.toLowerCase() === "balance") {
    const balancePercentage = (amount / income) * 100;

    if (balancePercentage >= 50) bgColor = "#4FFFB0"; // Green
    else if (balancePercentage >= 20 && balancePercentage <= 50) bgColor = "#FFD700"; // Yellow
    else if (balancePercentage > 0 && balancePercentage < 20) bgColor = "#FFA500"; // Orange
    else if (amount < 0) bgColor = "#FF5733"; // Red
  }

  return (
    <Card sx={{ backgroundColor: bgColor, borderRadius: 3, textAlign: "center", padding: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2D6A4F" }}>
          {itemName}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
          ${amount.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
