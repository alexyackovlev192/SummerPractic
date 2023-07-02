import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import List from "@mui/material/List";
import { CssBaseline } from "@mui/material";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#2057B0" }}
      >
        <Toolbar>
          {!isLoginPage && (
            <IconButton
              onClick={toggleDrawer}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Конструктор РПД
          </Typography>
          <Button color="inherit"></Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        BackdropProps={{ invisible: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar /> {/* IMPORTANT LINE */}
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/directions"
            >
              <ListItemButton onClick={toggleDrawer}>
                <ListItemIcon sx={{ minWidth: 0, paddingRight: "8px" }}>
                  <TaskRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Направления" />
              </ListItemButton>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/working-programms"
            >
              <ListItemButton onClick={toggleDrawer}>
                <ListItemIcon sx={{ minWidth: 0, paddingRight: "8px" }}>
                  <TaskRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Рабочие программы" />
              </ListItemButton>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/working-programms"
            ></Link>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
