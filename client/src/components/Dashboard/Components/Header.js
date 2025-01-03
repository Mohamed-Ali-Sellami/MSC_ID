import React from 'react';
import image from './images/Profil.png'

function Header() {
  return (
    <div className="headerdash">
        <div className='welcomedashdash'>
      <h1>Welcome back, Mr.Mohamed Ali !</h1>
      <p>Everything You Need, All in One Place.Stay Informed. Stay Ahead. </p>
      </div>

<div className='profildash'>
 <img src={image} alt="profil"/>
 <h3>Admin</h3>
 </div>

    </div>


  );
}

export default Header;