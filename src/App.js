import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/navbar/navbar";
import PrivateRoutes from "./util/privateRoutes";
import ConfirmSignUp from "./pages/signup/confirmSignUp/ConfirmSignUp";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const fetchUserFromSignUp = (user)=>{
    setUser(user)
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" >
          <Route index element={<SignUp onFetchUserFromSignUp = {fetchUserFromSignUp} />} />
          <Route path="confirm-signup" element={<ConfirmSignUp props={user} />} />
        </Route>
      </Routes>
    </>)
}

export default App;