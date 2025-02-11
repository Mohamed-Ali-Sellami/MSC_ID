import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./styles/Profil.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import passeportimg from "./images/passeport.jpg";
import cinimg from "./images/cin.png";
import { Link } from "react-router-dom";

const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

const Profile = () => {
  const user = useSelector((state) => state.user.user);

  const [certifications, setCertifications] = useState([
    { id: 1, name: "Passeport Vérifié", date: formatDate(new Date()), status: "Obtenue" },
    { id: 2, name: "Identité Vérifiée", date: formatDate(new Date()), status: "Obtenue" },
  ]);

  const requestCertification = () => {
    setCertifications((prev) => [
      {
        id: Date.now(),
        name: "Certification Permis de Conduire",
        date: formatDate(new Date()),
        status: "En cours",
      },
      ...prev,
    ]);
  };

  return (
    <div className="profile-page">
      <Navbar />
      <header className="profile-header">
        <h1>Bienvenue, {user?.name || "Chez MSC ! "}!</h1>
        <p>Gérez vos certifications et vos vérifications en toute simplicité.</p>
      </header>

      <main className="profile-main">
        {/* Profile Section */}
        <section className="profile-card">
          <img
            src={
              user?.avatar ||
              "https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png"
            }
            alt="Profile"
            className="profile-avatar"
          />
          <h2>{`${user?.name || ""} ${user?.lastname || ""}`.trim()}</h2>
          <p className="profile-role">Client MSC</p>
          <p className="profile-location">Tunisia Country</p>
          <div className="button-group">
            <button className="buttonpr">Modifier Profile</button>
            <Link to="/contact"> <button className="buttonpr">Contactez-Nous</button></Link>
          </div>
        </section>

        {/* Contact Information */}
        <section className="contact-card">
          <h3>Informations de Contact</h3>
          <div className="info-grid">
            <div className="info-item">
              <span>Nom :</span>
              <p>{`${user?.name || ""} ${user?.lastname || ""}`.trim()}</p>
            </div>
            <div className="info-item">
              <span>Email :</span>
              <p>{user?.email || "example@example.com"}</p>
            </div>
            <div className="info-item">
              <span>Date de naissance :</span>
              <p>{user?.dateOfBirth ? formatDate(user.dateOfBirth) : "Non disponible"}</p>
            </div>
            <div className="info-item">
              <span>Téléphone :</span>
              <p>{user?.mobile || "(098) 765-4321"}</p>
            </div>
          </div>
        </section>

        {/* Verification Section */}
        <section className="verification-section">
          <h3>Vérifications</h3>
          <div className="verification-cards">
            <Link to="/checkpasseport" className="verification-card">
              <img src={passeportimg} alt="Passeport" />
              <span>Vérification Passeport</span>
            </Link>
            <Link to="/checkcin" className="verification-card">
              <img src={cinimg} alt="Carte d'identité" />
              <span>Vérification Carte d'Identité</span>
            </Link>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="certification-section">
          <h3>Certifications</h3>
          <ul className="certification-list">
            {certifications.map((cert) => (
              <li key={cert.id} className="certification-item">
                <div>
                  <strong>{cert.name}</strong>
                  <p>Date : {cert.date}</p>
                  <p>Status : {cert.status}</p>
                </div>
                <div>
                  {cert.status === "Obtenue" ? (
                    <button className="buttontelechargpr">Télécharger</button>
                  ) : (
                    <button className="btn-disabled" disabled>En cours...</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;