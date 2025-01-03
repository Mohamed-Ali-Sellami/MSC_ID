import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./styles/Checkcin.css";
import Navbar from "./Navbar";

const Checkcin = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [isCINValid, setIsCINValid] = useState(null);

  // Vérification du CIN
  const verifyCIN = (cin) => {
    if (!/^\d{8}$/.test(cin)) {
      return false; // Le CIN doit contenir exactement 8 chiffres
    }

    let checksum = 0;
    for (let i = 0; i < 7; i++) {
      const digit = parseInt(cin[i], 10);
      checksum += digit * (8 - i);
    }
    const checkDigit = checksum % 10 === 0 ? 0 : 10 - (checksum % 10);
    return checkDigit === parseInt(cin[7], 10);
  };

  // Gérer le téléchargement du fichier
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setDetectedText("");
    setIsCINValid(null);
  };

  // Traiter l'image avec Tesseract.js
  const handleProcessFile = () => {
    if (!selectedFile) {
      alert("Veuillez télécharger une image !");
      return;
    }

    setLoading(true);
    setDetectedText("");
    setIsCINValid(null);

    Tesseract.recognize(selectedFile, "fra", {
      logger: (m) => console.log(m), // Suivi du traitement OCR
    })
      .then(({ data: { text } }) => {
        console.log("Texte détecté :", text); // Vérifier tout le texte extrait
        setDetectedText(text);

        // Vérification du CIN
        const cinMatch = text.match(/\b\d{8}\b/); // CIN est une séquence de 8 chiffres
        if (cinMatch) {
          const cin = cinMatch[0];
          setIsCINValid(verifyCIN(cin));
        } else {
          alert("Numéro de CIN introuvable !");
        }
      })
      .catch((error) => {
        console.error("Erreur lors du traitement OCR :", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar/>
    <div className="containercin">
      <h1>Vérification de CIN</h1>
      <p> Upload une image de votre CIN Tunisian pour vérifier son existence et sa validité.</p>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <button onClick={handleProcessFile} disabled={loading}>
        {loading ? "Traitement en cours..." : "Vérifier"}
      </button>

      {detectedText && (
        <div>
          <h3>Texte détecté :</h3>
          <pre>{detectedText}</pre>
        </div>
      )}

      {isCINValid !== null && (
        <div className={`result ${isCINValid ? "valid" : "invalid"}`}>
          {isCINValid ? "CIN Valide ✅" : "CIN Invalide ❌"}
        </div>
      )}
    </div>
    </div>
  );
};

export default Checkcin;
