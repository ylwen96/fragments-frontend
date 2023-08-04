import React from "react";
import "./styles.scss";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/Footer";

const Home = (props) => {
  const { user, signOut } = props;
  console.log(user);

  return (
    <div>
      <Navbar signOut={signOut} />
      Home page
      <span>Hello {user.username}</span>
      <Footer />
    </div>
  );
};

export default Home;
