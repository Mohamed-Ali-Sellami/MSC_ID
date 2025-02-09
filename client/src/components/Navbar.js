import React, { useState } from 'react';
import './styles/Navbar.css';
import logo from './images/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../JS/userSlice/userSlice';

const Navbar = ({ hideAuthButtons }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const isAuth = localStorage.getItem('token');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
          </div>

          {/* Liens principaux */}
          <div className="nav-content">
            <div className="nav-links">
              <Link to="/"> <div className="nav-item"><a href="#">Acceuil</a></div></Link>
              <Link to="/solutions"><div className="nav-item"><a href="#">Solutions</a></div></Link>
              <div className="nav-item"><a href="#">MSC ID app</a></div>
              <div className="nav-item"><a href="#">Company</a></div>
              <Link to="/verification"><div className="nav-item"><a href="#">Try for Free</a></div></Link>
              <Link to="/contact"> <div className="nav-item"><a href="#">Contact</a></div> </Link>

              {isAuth && (
                <>
                  {user?.isAdmin ? (
                    <div className="nav-item"><Link to="/dashboard">Dashboard</Link></div>
                  ) : (
                    <div className="nav-item"><Link to="/profil">Profil</Link></div>
                  )}
                  <div className="nav-item">
                    <a
                      href="#"
                      onClick={() => {
                        dispatch(logout());
                        localStorage.removeItem('token');
                      }}
                    >
                      Déconnexion
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Boutons Login/Register */}
          {!isAuth && !hideAuthButtons && (
            <div className="nav-buttons">
              <Link to="/login">
                <a href="#" className="loginbtnnavbar">Login</a>
              </Link>
              <Link to="/Register">
                <button className="btnrg ">Register</button>
              </Link>
            </div>
          )}

          {/* Menu Mobile */}
          <div className="bars-mobile">
            <button
              className={`mobile-menu-btn11 ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>

            <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
              <div className="nav-links">
              <Link to="/"> <div className="nav-item"><a href="#">Acceuil</a></div></Link>
              <Link to="/solutions"> <div className="nav-item"><a href="#">Solutions</a></div></Link>
                <div className="nav-item"><a href="#">MSC ID app</a></div>
                <Link to="/verification"><div className="nav-item"><a href="#">Try for Free</a></div></Link>
                <div className="nav-item"><a href="#">Company</a></div>
                <div className="nav-item"><a href="#">Contact</a></div>
                

                {isAuth ? (
                  <>
                    {user?.isAdmin ? (
                      <div className="nav-item"><Link to="/dashboard">Dashboard</Link></div>
                    ) : (
                      <div className="nav-item"><Link to="/profil">Profil</Link></div>
                    )}
                    <div className="nav-item">
                      <a
                        href="#"
                        onClick={() => {
                          dispatch(logout());
                          localStorage.removeItem('token');
                        }}
                      >
                        Déconnexion
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    {!hideAuthButtons && (
                      <>
                        <div className="nav-item">
                          <Link to="/login"><a href="#">Login</a></Link>
                        </div>
                        <div className="nav-item">
                          <Link to="/Register"><a href="#">Register</a></Link>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
