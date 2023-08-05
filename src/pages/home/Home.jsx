import React from "react";
import "./styles.scss";

const Home = (props) => {
  const { user } = props;
  return <div>Hello! {user.username}</div>;
};

export default Home;
