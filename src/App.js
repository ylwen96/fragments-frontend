import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/navbar/navbar";
import Fragment from "./pages/fragment/Fragment";
import { useSelector } from 'react-redux';


function App() {
  const PrivateRoutes = () => {
    const isUserSignedIn = useSelector((state) => state.auth.isUserSignedIn);
    return (
      isUserSignedIn ? <Outlet /> : <Navigate to="/login" />
    )
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/fragments/:id" element={<Fragment />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>)
}

export default App;