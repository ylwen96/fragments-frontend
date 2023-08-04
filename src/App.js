import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/navbar/navbar";
import PrivateRoutes from "./util/privateRoutes";
import ConfirmSignUp from "./pages/signup/confirmSignUp/ConfirmSignUp";

function App() {
  const [username, setUsername] = useState("");

  const usernameFromSignUp = (name) => {
    setUsername(name)
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes username={username} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" >
          <Route index element={<SignUp onDataFromSignUp={usernameFromSignUp} />} />
          <Route path="confirm-signup" element={<ConfirmSignUp username={username} />} />
        </Route>
      </Routes>
    </>)
}

export default App;