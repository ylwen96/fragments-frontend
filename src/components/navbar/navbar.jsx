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
import { Auth } from "../../util/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOff = async () => {
    try {
      await Auth.signOut();
      navigate("/login");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <div className="navbar-container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <div style={{"marginRight":"56px"}}> </div> */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              disabled
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
