import * as React from "react";
import "./styles.scss";
import {
  Typography,
  Toolbar,
  AppBar,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../util/auth";
import { useDispatch,useSelector } from "react-redux";
import { setUserSignOut } from "../../redux/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const handleLogOff = () => {
    signOut().then(() => {
      navigate("/login");
      dispatch(setUserSignOut())
    });
  };

  return (
    <div className="navbar-container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              disabled={!user}
              href="/"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Fragments
            </Typography>
            <Button color="inherit" onClick={handleLogOff}>
              Log off
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
