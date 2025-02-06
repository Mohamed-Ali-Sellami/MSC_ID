import React from 'react'
import logo from "./images/logo.png"
import { Link } from 'react-router-dom'
import '../../styles/Navbardash.css';
const Navbardash = () => {
  return (
    <div className='navbardash'>

        <div className="logo">
                    <Link to="/">
                      <img src={logo} alt="Logo" className="logo-img" />
                    </Link>
                  </div>
      <div className="nav-content">
                  <div className="nav-links">
                    <Link to="/dashboard"> <div className="nav-item">  <a href="#"> <i class="fa-solid fa-house"></i> Home </a></div></Link>
                    <div className="nav-item"><a href="#"> <i class="fa-solid fa-chart-simple"></i>Statistiques</a></div>
                    <Link to="/"> <div className="nav-item"><a href="#"> <i class="fa-solid fa-person-walking-arrow-right"></i>exit</a></div> </Link>
      
    </div>
    </div>
    </div>
  )
}

export default Navbardash
