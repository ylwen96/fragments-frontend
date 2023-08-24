import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/navbar/navbar";
// import PrivateRoutes from "./util/privateRoutes.js";
import Fragment from "./pages/fragment/Fragment";
import { useSelector } from 'react-redux';


function App() {
  const isUserSignedIn = useSelector((state) => state.auth.isUserSignedIn);
  return (
    <>
      <Navbar />
      {isUserSignedIn ? (<Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/fragments/:id" element={<Fragment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>) : (<Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>)}

    </>)
}

export default App;