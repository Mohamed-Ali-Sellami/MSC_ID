import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout, userCurrent } from "./JS/userSlice/userSlice";
import Profil from "./components/Profil";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";
import Checkpasseport from "./components/Checkpasseport";
import Checkcin from "./components/Checkcin";
import Pagesolutions from "./components/Pagesolutions";
import HomeAdmin from "./components/Dashboard/Components/HomeAdmin";
import GestionUser from "./components/Dashboard/Components/GestionUser";
import { getclient } from "./JS/clientSlice";
import Contact from "./components/Contact";
import Company from "./components/Company";
import Verif from "./components/Verif";

function App() {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth) {
      dispatch(userCurrent());
    }
    dispatch(getclient());
  }, []);
  return (
    <div className="App">
      {/* <div className="header">
        <h1>Auth workshop</h1>
        {isAuth ? (
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : null}
      </div> */}

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/solutions" element={<Pagesolutions />} />
        <Route path="/company" element={<Company />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verification" element={<Verif />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/checkpasseport" element={<Checkpasseport />} />
        <Route path="/checkcin" element={<Checkcin />} />


        {/* dashboard */}
        
        <Route path="/dashboard" element={<HomeAdmin/>} />
        <Route path="/gestionusers"  element={<GestionUser/>} />
        

        
        <Route element={<PrivateRoute />}>
          <Route path="/profil" element={<Profil />} />
          <Route path="/checkpasseport" element={<Checkpasseport />} />
          <Route path="/checkcin" element={<Checkcin />} />
          <Route path="/dashboard" element={<HomeAdmin/>} /> 
        </Route>{" "}
      </Routes>
    </div>
  );
}

export default App;
