import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";
import {
  Typography
} from "@mui/material";
import TableComponent from "../../components/table/Table";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)

  return (
    <div className="home-container">
      <Typography variant="h5" component="div" className="home-title">
        Welcome! {user && user.username}
      </Typography>
      <div className="table-container">
        <TableComponent />
      </div>
    </div>
  );
};

export default Home;
