import React, { useState } from "react";
import './styles/Register.css';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../JS/userSlice/userSlice";
import imagelg from './images/logo.png';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Register = () => {
  const [register, setregister] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    dateOfBirth :"",
    mobile: "",
    company: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Action d'enregistrement
    dispatch(userRegister(register));
    
    // Afficher le message de succès
    setIsRegistered(true);

    // Rediriger après un délai (facultatif)
    setTimeout(() => {
      navigate("/profil");
    }, 3000); // Redirection après 3 secondes
  };

  return (
    <div>
      {/* Navbar avec les boutons masqués */}
      <Navbar hideAuthButtons={true} />
      <div className="register-container">
        <div className="register-content">
          {/* Partie gauche */}
          <div className="left-section">
            <Link to="/"><img src={imagelg} alt="logo" className="logo" /></Link>
            <h1>Automate, monetize and improve your guests’ experience.</h1>
            <p>
              MSC_checkID helps thousands of hosts to automate the entire check-in
              process with powerful features. <strong>Sign up free</strong> and
              see it by yourself.
            </p>
            <ul>
              <li>✅ Your ultimate Check-in solution: Trusted by Millions Worldwide</li>
              <li>✅ Effortless Check-ins Made Simple: With Police reporting in more than 20 countries</li>
              <li>✅ Connect with your property management systems. We have 35+ integrations!</li>
            </ul>
          </div>

          {/* Partie droite */}
          <div className="right-section">
            <div className="register-wrapper">
              {!isRegistered ? (
                <form onSubmit={handleSubmit} className="register-form">
                  <h2>Create an Account</h2>
                  <p>Fill out the form to create your free account</p>
                    

                   <div className="box-inputt">
                    <p> Name :</p>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={register.name}
                    onChange={(e) => setregister({ ...register, name: e.target.value })}
                  />
                     <p>Last Name :</p>
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={register.lastname}
                    onChange={(e) => setregister({ ...register, lastname: e.target.value })}
                  />
                     
                     <p>Email :</p>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={register.email}
                    onChange={(e) => setregister({ ...register, email: e.target.value })}
                  />
                    <p>Password :</p>
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={register.password}
                    onChange={(e) => setregister({ ...register, password: e.target.value })}
                  />
                    <p>Mobile Phone :</p>
                 <input
                    type="text"
                    placeholder="Mobile Phone"
                    required
                    value={register.mobile}
                    onChange={(e) => setregister({ ...register, mobile: e.target.value })}
                  />
                    <p>Date of Birthday :</p>
                  <input
                    type="date"
                    placeholder="Date de Naissance"
                    required
                    value={register.dateOfBirth}
                    onChange={(e) => setregister({ ...register, dateOfBirth: e.target.value })}
                  />
                   <p>Campany :</p>
                  <input
                    type="text"
                    placeholder="Company Name"
                    required
                    value={register.company}
                    onChange={(e) => setregister({ ...register, company: e.target.value })}
                  />
                </div>
                  <button type="submit" className="btn-primary">
                    Register
                  </button>
                  <p>
                    Already have an account? <Link to="/login">Sign in</Link>
                  </p>
                </form>
              ) : (
                <div className="success-message">
                  <h2>Registration Successful!</h2>
                  <p>Your account has been created successfully. Redirecting to your profile...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
