import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/navbar/navbar";
import PrivateRoutes from "./util/privateRoutes.js";
import Fragment from "./pages/fragment/Fragment";



function App() {
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