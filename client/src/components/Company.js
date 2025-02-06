import React from 'react';
import './styles/Company.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Company = () => {
  return (
    <div>
        <Navbar/>
    <div className="company-container">
      <h1>About Our Company MSC_id</h1>
      <p className="founded-year">Founded in 2024</p>

      <div className="company-info">
        <h2>Who We Are</h2>
        <p>We are a leading company specializing in online identity verification. Our mission is to provide secure and efficient identity authentication services to businesses worldwide.</p>
      </div>

      <div className="company-info">
        <h2>Our Mission</h2>
        <p>Our goal is to combat identity fraud by leveraging cutting-edge technologies such as AI and biometric verification.</p>
      </div>

      <div className="company-info">
        <h2>Our Services</h2>
        <ul>
          <li>Passport Verification</li>
          <li>National ID Verification</li>
          <li>Signature Authentication (Soon)</li>
        </ul>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Company;
