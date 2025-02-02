import React, { useState } from 'react';
import './styles/Contact.css';
import Navbar from './Navbar';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
    <Navbar/>
    <div className="contact-container">
      <h1 className="contact-title">Contactez-Nous</h1>
      <p className="contact-description">
      Vous avez une question, une demande spécifique ou besoin d'assistance ? Notre équipe est à votre disposition pour vous aider. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais. 
      Nous nous engageons à fournir un service rapide et efficace pour répondre à toutes vos attentes
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
          />
        </div>

        <button type="submit" className="submit-buttoncont">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default Contact;