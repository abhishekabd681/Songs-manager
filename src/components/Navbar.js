import React, { memo } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default memo(function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const linkStyle = (to) => ({
    color: "#fff",
    textDecoration: "none",
    marginRight: 12,
    fontWeight: location.pathname === to ? 700 : 400,
  });
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ maxWidth: 1200, width: "100%", margin: "0 auto" }}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          component={Link}
          to="/"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          Songs Manager
        </Typography>
        <Link to="/" style={linkStyle("/")}>
          Dashboard
        </Link>
        <Link to="/page" style={linkStyle("/page")}>
          Songs List Page
        </Link>
        {user ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
});
