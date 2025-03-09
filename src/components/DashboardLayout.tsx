// import * as React from "react";
// import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiDrawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
// import Grid from "@mui/material/Grid";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import { Paper, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import { grey } from "@mui/material/colors";
// import CardItems from "./CardItems";
// import ExpenseBarChart from "./ExpenseBarChart";
// import ExpenseManager from "./ExpenseManager";
// import ExpenseReport from "./ExpenseReport"; // Assuming you have this

// const drawerWidth: number = 240;

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   backgroundColor: "#2D6A4F",
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   "& .MuiDrawer-paper": {
//     position: "relative",
//     whiteSpace: "nowrap",
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     boxSizing: "border-box",
//     ...(!open && {
//       overflowX: "hidden",
//       transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       width: theme.spacing(7),
//       [theme.breakpoints.up("sm")]: {
//         width: theme.spacing(9),
//       },
//     }),
//   },
// }));

// const ContentContainer = styled(Box)(({ theme }) => ({
//   backgroundColor: "#F0F4F8",
//   minHeight: "100vh",
//   width: "100%",
//   paddingTop: theme.spacing(10),
//   display: "flex",
//   justifyContent: "center",
// }));

// const defaultTheme = createTheme();

// export default function Dashboard() {
//   const [open, setOpen] = React.useState(true);
//   const [selectedItem, setSelectedItem] = React.useState("Dashboard");

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   const menuItems = [
//     { text: "Dashboard", icon: <DashboardIcon /> },
//     { text: "Expense", icon: <ShoppingCartIcon /> },
//     { text: "Report", icon: <BarChartIcon /> },
//   ];

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Box sx={{ display: "flex" }}>
//         <CssBaseline />
//         <AppBar position="absolute" open={open}>
//           <Toolbar sx={{ pr: "24px" }}>
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="open drawer"
//               onClick={toggleDrawer}
//               sx={{
//                 marginRight: "36px",
//                 ...(open && { display: "none" }),
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, textAlign: "center" }}>
//               Expense Tracker
//             </Typography>
//             <IconButton color="inherit">
//               <Badge badgeContent={4} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//         <Drawer variant="permanent" open={open}>
//           <Toolbar
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-end",
//               px: [1],
//             }}
//           >
//             <IconButton onClick={toggleDrawer}>
//               <ChevronLeftIcon />
//             </IconButton>
//           </Toolbar>
//           <Divider />
//           <List component="nav">
//             {menuItems.map((item) => (
//               <ListItemButton
//                 key={item.text}
//                 selected={selectedItem === item.text}
//                 onClick={() => setSelectedItem(item.text)}
//                 sx={{
//                   backgroundColor: selectedItem === item.text ? grey[300] : "inherit",
//                   "&:hover": { backgroundColor: grey[400] },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             ))}
//           </List>
//         </Drawer>
//         <ContentContainer>
//           <Grid container justifyContent="center">
//             <Grid item xs={12} sm={8} md={6}>
//               <Paper sx={{ padding: 2, backgroundColor: "#d5ffed", borderRadius: 4 }}>
//                 {selectedItem === "Dashboard" && (
//                   <>
//                     <CardItems />
//                     <ExpenseBarChart />
//                   </>
//                 )}
//                 {selectedItem === "Expense" && <ExpenseManager />}
//                 {selectedItem === "Report" && <ExpenseReport />}
//               </Paper>
//             </Grid>
//           </Grid>
//         </ContentContainer>
//       </Box>
//     </ThemeProvider>
//   );
// }


import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {IconButton,Button} from "@mui/material";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Logout icon
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Paper, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom"; // For redirection
import CardItems from "./CardItems";
import ExpenseBarChart from "./ExpenseBarChart";
import ExpenseManager from "./ExpenseManager";
import ExpenseReport from "./ExpenseReport"; // Assuming you have this

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#2D6A4F",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#F0F4F8",
  minHeight: "100vh",
  width: "100%",
  paddingTop: theme.spacing(10),
  display: "flex",
  justifyContent: "center",
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState("Dashboard");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setSnackbarOpen(true); // Show logout success message

    setTimeout(() => {
      navigate("/login"); // Redirect to login after 1.5 seconds
    }, 1500);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Expense", icon: <ShoppingCartIcon /> },
    { text: "Report", icon: <BarChartIcon /> },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, textAlign: "center" }}>
              Expense Tracker
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* Logout Button */}
            <Button color="inherit" sx={{ml: 2,backgroundColor: '#c81d25'}} onClick={handleLogout}>
              <Typography sx={{ textTransform: 'none',mr:1 }}> LogOut</Typography>
              <ExitToAppIcon />
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {menuItems.map((item) => (
              <ListItemButton
                key={item.text}
                selected={selectedItem === item.text}
                onClick={() => setSelectedItem(item.text)}
                sx={{
                  backgroundColor: selectedItem === item.text ? grey[300] : "inherit",
                  "&:hover": { backgroundColor: grey[400] },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>
        <ContentContainer>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <Paper sx={{ padding: 2, backgroundColor: "#d5ffed", borderRadius: 4 }}>
                {selectedItem === "Dashboard" && (
                  <>
                    <CardItems />
                    <ExpenseBarChart />
                  </>
                )}
                {selectedItem === "Expense" && <ExpenseManager />}
                {selectedItem === "Report" && <ExpenseReport />}
              </Paper>
            </Grid>
          </Grid>
        </ContentContainer>

        {/* Snackbar for logout message */}
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
            Logout successful!
          </MuiAlert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}




{/* <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box> */}