import React from "react";
import "./styles.scss";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  return <div>Hello! {user?.username}</div>;
};

export default Home;
