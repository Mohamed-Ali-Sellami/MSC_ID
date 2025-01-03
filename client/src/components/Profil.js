import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles/Profil.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import passeportimg from "./images/passeport.jpg";
import cinimg from "./images/cin.png";
import { Link } from "react-router-dom";

// Fonction pour formater une date en YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  // Certifications initiales (exemple)
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "Certification Passeport Vérifié",
      date: formatDate(new Date()),
      status: "Obtenue",
    },
    {
      id: 2,
      name: "Certification Identité Vérifiée",
      date: formatDate(new Date()),
      status: "Obtenue",
    },
  ]);

  // Fonction pour demander une nouvelle certification
  const requestCertification = () => {
    const newCertification = {
      id: Date.now(),
      name: "Certification Permis de Conduire",
      date: formatDate(new Date()),
      status: "En cours",
    };
    setCertifications((prev) => [newCertification, ...prev]);
  };

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="header-content">
            <h1>Bienvenue, {user?.name || "Utilisateur"}!</h1>
            <p>Voici votre tableau de bord personnel. Vous pouvez faire vos Vérifications Ici !</p>
          </div>
          <button className="btn btn-edit">Modifier le Profil</button>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="avatar-container">
              <img
                src={
                  user?.avatar ||
                  "https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png"
                }
                alt="Profile"
                className="profile-avatar"
              />
            </div>
            <h2 className="profile-name">{`${user?.name || ""} ${user?.lastname || ""}`.trim()}</h2>
            <p className="profile-title">Client MSC</p>
            <p className="profile-location">Bay Area, San Francisco, CA</p>
            <div className="button-group">
              <button className="btn btn-primary">Suivre</button>
              <button className="btn btn-outline">Message</button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-card">
            <h3>Informations de Contact</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Nom Complet</label>
                <p>{`${user?.name || ""} ${user?.lastname || ""}`.trim()}</p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p>{user?.email || "example@example.com"}</p>
              </div>
              <div className="info-item">
                <label>Date de naissance</label>
                {/* Formatage de la date de naissance */}
                <p>{user?.dateOfBirth ? formatDate(user.dateOfBirth) : "Non disponible"}</p>
              </div>
              <div className="info-item">
                <label>Mobile</label>
                <p>{user?.mobile || "(098) 765-4321"}</p>
              </div>
              <div className="info-item">
                <label>Entreprise</label>
                <p>{user?.company || "Non disponible"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Section */}
        <div className="verification-section">
          <h3>Vérifications</h3>
          <div className="verification-cards">
            <button className="verification-card">
              <img src={passeportimg} alt="Passeport" />
              <Link to="/checkpasseport"><span>Vérification Passeport</span></Link>
            </button>

            <button className="verification-card">
              <img src={cinimg} alt="Carte d'identité" />
              <Link to="/checkcin"><span>Vérification Carte d'Identité</span></Link>
            </button>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="certification-section">
          <h3>Certifications</h3>
          <ul className="certification-list">
            {certifications.map((cert) => (
              <li key={cert.id} className="certification-item">
                <div>
                  <strong>{cert.name}</strong>
                  <p>Date : {cert.date}</p>
                  <p>Status : {cert.status}</p>
                </div>
                <div className="certification-actions">
                  {cert.status === "Obtenue" && (
                    <button className="btn btn-download">Télécharger</button>
                  )}
                  {cert.status === "En cours" && (
                    <button className="btn btn-disabled" disabled>
                      En cours...
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
