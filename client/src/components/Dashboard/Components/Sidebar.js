import React from 'react';
import { Link } from 'react-router-dom';
import imglogo from './images/logo.png'

function Sidebar() {
  return (
    <div className="sidebardash">
      <img src={imglogo} alt='logo'/>
      <ul>
      <Link to="/dashboard"> <li>  <i class="fa-solid fa-house"></i>  Home </li> </Link>       
      <Link to="/gestionusers"><li>  <i class="fa-regular fa-user"></i>Gestion des users </li></Link>
        <li> <i class="fa-solid fa-chart-simple"></i>Statistiques</li>
        <Link to="/"><li> <i class="fa-solid fa-person-walking-arrow-right"></i>exit</li> </Link>
      </ul>
    </div>
  );
}

export default Sidebar;