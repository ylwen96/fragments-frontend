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
import { useDispatch, useSelector } from "react-redux";
import { setUserSignOut } from "../../redux/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const isUserSignedIn = useSelector((state) => state.auth.isUserSignedIn);
  const dispatch = useDispatch();

  const handleLogOff = () => {
    signOut().then(() => {
      navigate("/login");
      dispatch(setUserSignOut());
    });
  };

  const userSignedIn = () => {
    if (typeof isUserSignedIn !== "boolean") {
      return false;
    } else {
      if (isUserSignedIn) {
        return true;
      } else {
        return false;
      }
    }
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
              disabled={!userSignedIn()}
              href="/"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Fragments
            </Typography>
            {userSignedIn() && (
              <Button variant="outlined" color="inherit" onClick={handleLogOff}>
                Log off
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
