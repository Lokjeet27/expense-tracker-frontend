import React from "react";
import { Box, Grid } from "@mui/material";
import ItemCard from "./CardLayout"; // Import the component

const CardItems = () => {
  const income = 5000; 
  const expense = 3000; 
  const balance = income - expense; 

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <ItemCard itemName="Income" amount={income} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ItemCard itemName="Expense" amount={expense} income={income} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ItemCard itemName="Balance" amount={balance} income={income} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardItems;
