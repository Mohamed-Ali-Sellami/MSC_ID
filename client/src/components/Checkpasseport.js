import React, { useState } from "react";
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

  const handleImageUpload = (e) => {
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

  const handleCheckPassport = async () => {
    if (!image) {
      setError("Veuillez télécharger une image.");
      return;
    }

    setLoading(true);
    setError("");
    setVerificationResult(null);
    setPassportDetails(null);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("apikey", API_KEY);
    formData.append("language", "eng" );
    formData.append('OCREngine', '2'); // This is to use Engine 2
    formData.append('scale', true); // This is to use Engine 2
    formData.append('detectOrientation', true); // This is to use Engine 2
    formData.append('isTable', true); // This is to use Engine 2

    try {
      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      const parsedText = data.ParsedResults?.[0]?.ParsedText || "";
      setRecognizedText(parsedText);

      if (parsedText) {
        analyzePassportData(parsedText);
      } else {
        setError("Aucun texte valide trouvé dans l'image.");
      }
    } catch {
      setError("Une erreur est survenue lors de l'analyse de l'image.");
    } finally {
      setLoading(false);
    }
  };

  const analyzePassportData = (text) => {
    const lines = text.split("\n").map((line) => line.trim());
    const mrzLines = lines.filter((line) => /^[A-Z0-9<]{44,88}$/.test(line));

    if (mrzLines.length < 2) {
      setVerificationResult("MRZ non détectée ou invalide.");
      return;
    }

    const [line1, line2] = mrzLines.length === 2 ? mrzLines : [mrzLines[0].slice(0, 44), mrzLines[0].slice(44)];
    const details = decodeMRZ(line1, line2);

    setPassportDetails(details);
    setVerificationResult(details.isValid ? "Passeport valide ✅" : "Passeport invalide ❌");
  };

  const decodeMRZ = (line1, line2) => {
    const surnameAndGivenName = line1.slice(5).split("<<");
    const surname = surnameAndGivenName[0].replace(/</g, " ").trim();
    const givenName = surnameAndGivenName[1]?.replace(/</g, " ").trim() || "";
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
  };

  const validateMRZ = (line) => {
    const computeCheckDigit = (data) => {
      const weights = [7, 3, 1];
      return data.split("").reduce((sum, char, i) => {
        const value = char >= "0" && char <= "9" ? +char : char === "<" ? 0 : char.charCodeAt(0) - 55;
        return sum + value * weights[i % 3];
      }, 0) % 10;
    };

    return (
      computeCheckDigit(line.slice(0, 9)) === +line[9] &&
      computeCheckDigit(line.slice(13, 19)) === +line[19] &&
      computeCheckDigit(line.slice(21, 27)) === +line[27]
    );
  };

  const formatDate = (date) => `20${date.slice(0, 2)}/${date.slice(2, 4)}/${date.slice(4, 6)}`;

  return (
    <div className="boxpass">
      <Navbar />
      <div className="boxpasseportt">
        <div className="containercheckpasseport">
          <h1>Vérifiez Votre Passeport</h1>

          <div className="content-wrapper">
            <div className="import-section">
              <h3>Importez ou Glissez-Déposez votre Image (jpg, png)</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} />

              {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-image" />}
              <button onClick={handleCheckPassport} disabled={loading} className="btn-verifpass">
                {loading ? "Traitement en cours..." : "Vérifier Votre Passeport"}
              </button>
            </div>

            <div className="details-section">
              {recognizedText && (
                <div className="result-box">
                  <h3>Texte Reconnu :</h3>
                  <p>{recognizedText}</p>
                </div>
              )}

              {passportDetails && (
                <div className="result-box">
                  <h3>Détails du Passeport :</h3>
                  <p>Nom : {passportDetails.surname}</p>
                  <p>Prénom : {passportDetails.givenName}</p>
                  <p>Numéro : {passportDetails.passportNumber}</p>
                  <p>Date de Naissance : {passportDetails.dob}</p>
                  <p>Date d'Expiration : {passportDetails.expirationDate}</p>
                  <p>Nationalité : {passportDetails.nationality}</p>
                </div>
              )}

              {verificationResult && (
                <div className="result-box">
                  <h3>Résultat :</h3>
                  <p style={{ color: passportDetails?.isValid ? "green" : "red" }}>{verificationResult}</p>
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


























