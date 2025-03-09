import React, { useState } from "react";
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Drawer, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, Grid } from "@mui/material";
import { PieChart } from "recharts";
import { Menu as MenuIcon, AccountCircle, Dashboard, Money, BarChart, Logout } from "@mui/icons-material";

const DashboardPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const income = 5000;
  const expenses = 3200;
  const balance = income - expenses;

  const expenseData = [
    { name: "Expense", value: expenses },
    { name: "Balance", value: balance },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, padding: 2, textAlign: "center" }}>
          <Avatar sx={{ width: 56, height: 56, margin: "auto" }}>IMS</Avatar>
          <List>
            <ListItem button>
              <ListItemIcon><Dashboard /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Navbar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Expense Management System</Typography>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}><Logout /> Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Grid container spacing={2}>
          {[{ label: "Income", value: income, icon: <Money /> }, { label: "Expense", value: expenses, icon: <BarChart /> }, { label: "Balance", value: balance, icon: <Money /> }].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.label}</Typography>
                  <Typography variant="h4">${item.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pie Chart */}
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <PieChart width={300} height={300}>
            <Pie dataKey="value" data={expenseData} cx="50%" cy="50%" outerRadius={100} fill="#4FFFB0" label />
          </PieChart>
        </Box>
        <Typography align="center" variant="h6">Expense Report</Typography>
      </Box>
    </Box>
  );
};

export default DashboardPage;
