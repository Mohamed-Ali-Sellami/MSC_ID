import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './styles/Login.css'
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../JS/userSlice/userSlice";
import imagelg from './images/logo.png'

const Login = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  /*exemple loginClient ( mail: ahmed123@gmail.com / password: ahmed123)*/
  /*exemple loginAdmin (mail:medalisel@gmail.com /password:medalisel)*/


  const dispatch = useDispatch();
  const isAuth = localStorage.getItem("token");
  let navigate = useNavigate();

  return (
    <div className="login-container">
      <Link to="/"> <img src={imagelg} alt="logo"/></Link>
      <div className="form-wrapper">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="form-signin styled-form"
        >
          <h2 className="form-heading">Sign in to MSC_checkID</h2>
          <p>
            New to MSC.tn? <Link to="/register">Create an MSC_ account</Link>
          </p>
          <label htmlFor="email" className="input-label">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className="form-control input-field"
            name="email"
            placeholder="Enter your email address"
            required
            onChange={(e) => setlogin({ ...login, email: e.target.value })}
          />
          <label htmlFor="password" className="input-label">
            Password *
          </label>
          <input
            id="password"
            type="password"
            className="form-control input-field"
            name="password"
            placeholder="Enter password"
            required
            onChange={(e) => setlogin({ ...login, password: e.target.value })}
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="remember-checkbox"
            />
            <label htmlFor="rememberMe" className="remember-label">
              Remember me
            </label>
          </div>
          <button
            className="btn btn-primary btn-login"
            onClick={() => {
              dispatch(userLogin(login));
              setTimeout(() => {
                navigate("/profil");
              }, 1000);
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
          >
            Sign in
          </button>
          <Link to="/forgot-password" className="forgot-link">
            Forgot password?
          </Link>
          <div className="social-login">
            <p>OR</p>
            <div className="social-icons">
              <button className="social-button facebook">  <i class="fa-brands fa-facebook"></i> </button>
              <button className="social-button google">    <i class="fa-brands fa-google"></i></button>
              <button className="social-button apple">     <i class="fa-brands fa-apple"></i></button>
              <button className="social-button linkedin">  <i class="fa-brands fa-linkedin"></i></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;






















