import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound-container">
      <h3>Oops, Page Not Found... :(</h3>
      <Button variant="contained" onClick={() => navigate("/")}>
        Back to home page
      </Button>
    </div>
  );
};

export default NotFound;
