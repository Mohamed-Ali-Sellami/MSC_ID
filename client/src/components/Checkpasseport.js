import React, { useState } from "react";
import { createWorker } from 'tesseract.js';
import { RotateCw, Loader } from "react-feather"; // Icônes pour le spinner et le bouton "Réessayer"
import "./styles/Checkpasseport.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Checkpasseport = () => {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [passportDetails, setPassportDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "K85598953388957"; // Remplacez par votre clé API OCR.Space

  // Gestion du changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setRecognizedText("");
      setVerificationResult(null);
      setPassportDetails(null);
      setError("");
    } else {
      setError("Veuillez télécharger une image valide.");
    }
  };

  // Réinitialiser l'image
  const handleRetry = () => {
    setImage(null);
    setRecognizedText("");
    setVerificationResult(null);
    setPassportDetails(null);
    setError("");
  };

  // Gestion du glisser-déposer
  const allowDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setRecognizedText("");
      setVerificationResult(null);
      setPassportDetails(null);
      setError("");
    } else {
      setError("Veuillez télécharger une image valide.");
    }
  };

  // Nettoyage du texte extrait
  const cleanMRZ = (text) => {
    if (!text || typeof text !== 'string') return "";
    return text
      .toUpperCase()
      .replace(/[^A-Z0-9<\n]/g, '')
      .replace(/[\n\s]+/g, '\n')
      .trim();
  };

  // OCR avec Tesseract.js
  const tesseractOCR = async (imageFile) => {
    try {
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<',
      });
      const result = await worker.recognize(imageFile);
      await worker.terminate();
      if (result && result.data && typeof result.data.text === 'string') {
        return cleanMRZ(result.data.text);
      } else {
        console.error("Format de résultat Tesseract inattendu:", result);
        return "";
      }
    } catch (err) {
      console.error("Erreur Tesseract OCR:", err);
      return "";
    }
  };

  // Décodage et validation du MRZ
  const decodeMRZ = (line1, line2) => {
    try {
      if (!line1 || !line2 || line1.length < 44 || line2.length < 44) {
        return {
          surname: "",
          givenName: "",
          passportNumber: "",
          dob: "",
          expirationDate: "",
          nationality: "",
          isValid: false,
        };
      }

      const surnameAndGivenName = (line1.length >= 44 ? line1.substring(5, 44) : line1.slice(5)).split("<<");
      let surname = surnameAndGivenName[0]?.replace(/</g, " ").trim() || "";
      let givenName = surnameAndGivenName[1]?.replace(/</g, " ").trim() || "";

      // Vérifier la longueur du nom et du prénom
      if (surname.length > 14 || surname.length === 0) {
        surname = "Non reconnu";
      }
      if (givenName.length > 14 || givenName.length === 0) {
        givenName = "Non reconnu";
      }

      const passportNumber = line2.slice(0, 9).replace(/</g, "");
      const dob = formatDate(line2.slice(13, 19));
      const expirationDate = formatDate(line2.slice(21, 27));
      const nationality = line2.slice(10, 13).replace(/</g, "");

      return {
        surname,
        givenName,
        passportNumber,
        dob,
        expirationDate,
        nationality,
        isValid: validateMRZ(line2),
      };
    } catch (err) {
      console.error("Erreur de décodage MRZ:", err);
      return {
        surname: "",
        givenName: "",
        passportNumber: "",
        dob: "",
        expirationDate: "",
        nationality: "",
        isValid: false,
      };
    }
  };

  // Validation du MRZ
  const validateMRZ = (line) => {
    if (!line || line.length < 44) return false;
    try {
      const computeCheckDigit = (data) => {
        if (!data || typeof data !== 'string') return -1;
        const weights = [7, 3, 1];
        return data.split("").reduce((sum, char, i) => {
          const value = char >= "0" && char <= "9" ? +char : char === "<" ? 0 : char.charCodeAt(0) - 55;
          return sum + value * weights[i % 3];
        }, 0) % 10;
      };

      if (!/^\d$/.test(line[9]) || !/^\d$/.test(line[19]) || !/^\d$/.test(line[27])) {
        return false;
      }

      return (
        computeCheckDigit(line.slice(0, 9)) === parseInt(line[9]) &&
        computeCheckDigit(line.slice(13, 19)) === parseInt(line[19]) &&
        computeCheckDigit(line.slice(21, 27)) === parseInt(line[27])
      );
    } catch (err) {
      console.error("Erreur de validation MRZ:", err);
      return false;
    }
  };

  // Formatage de la date
  const formatDate = (date) => {
    if (!date || date.length !== 6 || !/^\d{6}$/.test(date)) {
      return "Date invalide";
    }
    return `20${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4, 6)}`;
  };

  // Analyse des données du passeport
  const analyzePassportData = (text) => {
    if (!text) return false;
    
    const lines = text.split("\n").filter(line => line.trim().length > 0);
    const mrzLines = lines.filter((line) => /^[A-Z0-9<]{44,}$/.test(line));

    if (mrzLines.length !== 2) {
      setVerificationResult("MRZ non détectée ou invalide.");
      return false;
    }

    const [line1, line2] = mrzLines;
    const details = decodeMRZ(line1, line2);

    setPassportDetails(details);
    setVerificationResult(details.isValid ? "Passeport valide ✅" : "Passeport invalide ❌");
    return details.isValid;
  };

  // Vérification du passeport
  const handleCheckPassport = async () => {
    if (!image) {
      setError("Veuillez télécharger une image.");
      return;
    }

    setLoading(true);
    setError("");
    setVerificationResult(null);
    setPassportDetails(null);

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("apikey", API_KEY);
      formData.append("language", "eng");
      formData.append("OCREngine", "2");
      formData.append("scale", "true");
      formData.append("detectOrientation", "true");
      formData.append("isTable", "false");
      formData.append("isOverlayRequired", "false");

      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      let parsedText = "";
      
      if (data && data.ParsedResults && Array.isArray(data.ParsedResults) && data.ParsedResults.length > 0) {
        parsedText = cleanMRZ(data.ParsedResults[0].ParsedText || "");
      }
      
      setRecognizedText(parsedText);

      let isValidMRZ = false;
      if (parsedText) {
        isValidMRZ = analyzePassportData(parsedText);
      }
      
      if (!isValidMRZ) {
        console.log("MRZ non détecté par OCR.space, utilisation de Tesseract...");
        parsedText = await tesseractOCR(image);
        setRecognizedText(parsedText);
        if (!parsedText) {
          setVerificationResult("MRZ non détectée ou invalide.");
        } else {
          analyzePassportData(parsedText);
        }
      }
    } catch (error) {
      console.error("Erreur de vérification du passeport:", error);
      setError("Une erreur est survenue lors de l'analyse de l'image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="boxpass">
      <Navbar />
      <div className="boxpasseportt">
        <div className="containercheckpasseport">
          <h1>Vérifiez Votre Passeport</h1>
          <div className="content-wrapper">
            <div 
              className="section-box drop-zone" 
              onDragOver={allowDragOver} 
              onDrop={handleDrop}
            >
              <h3>Importez ou Glissez-Déposez votre Image (jpg, png)</h3>
              <p className="advice">
                <i className="fa-solid fa-circle-info"></i> 
                Assurez-vous que :
                <ul>
                  <li>L'image est nette et bien cadrée.</li>
                  <li>Les informations sur le passeport sont bien visibles.</li>
                  <li>Aucun reflet ou ombre n'obstrue les données.</li>
                </ul>
              </p>
              <label className="upload-label" htmlFor="file-upload">
                <i className="fas fa-upload"></i> Importer un fichier
              </label>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: "none" }}
              />
              {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-image" />}
              {image && !verificationResult && (
                <button 
                  onClick={handleCheckPassport} 
                  disabled={loading} 
                  className="btn-verifpass"
                >
                  {loading ? <Loader className="spinner" size={20} /> : "Vérifier Votre Passeport"}
                </button>
              )}
            </div>
            {/* {recognizedText && (
              <div className="recognized-text">
                <h2>Texte Reconnu</h2>
                <pre>{recognizedText}</pre>
              </div>
            )} */}
            <div className="details-section">
              {passportDetails && (
                <div className="result-box">
                <h3>Détails du Passeport :</h3>
                <p><strong>Nom :</strong> {passportDetails.surname}</p>
                <p><strong>Prénom :</strong> {passportDetails.givenName}</p>
                <p><strong>Numéro :</strong> {passportDetails.passportNumber}</p>
                <p><strong>Date d'Expiration :</strong> {passportDetails.expirationDate}</p>
                <p><strong>Nationalité :</strong> {passportDetails.nationality}</p>
              </div>
              )}
              {verificationResult && (
                <div className="result-box">
                  <h3>Résultat :</h3>
                  <p style={{ color: passportDetails?.isValid ? "green" : "red" }}>{verificationResult}</p>
                  {passportDetails?.isValid && (
                    <button className="btn-certificate">Obtenir Votre Certificat</button>
                  )}
                  <button onClick={handleRetry} className="btn-retry">
                    <RotateCw size={16} /> Réessayer
                  </button>
                </div>
              )}
              {error && <p className="error">{error}</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkpasseport;