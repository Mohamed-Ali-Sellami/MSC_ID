import React, { useState } from "react";
import "./styles/Checkcin.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Quagga from "quagga";

const Checkcin = () => {
  const [rectoImage, setRectoImage] = useState(null);
  const [versoImage, setVersoImage] = useState(null);
  const [recognizedText1, setRecognizedText1] = useState("");
  const [recognizedText2, setRecognizedText2] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "K85598953388957"; // Remplacez par votre clé API OCR.Space

  const handleRectoUpload = async (file) => {
    setLoading(true);
    setError("");
    setVerificationResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("apikey", API_KEY);
    formData.append("OCREngine", "2");
    formData.append("scale", true);
    formData.append("detectOrientation", true);
    formData.append("isTable", true);

    try {
      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      const parsedText = data.ParsedResults?.[0]?.ParsedText || "";
      const first8Digits = parsedText.match(/\d{8}/)?.[0] || "";

      if (first8Digits) {
        setRecognizedText1(first8Digits);
      } else {
        setError("Aucun texte valide détecté dans l'image recto.");
      }
    } catch {
      setError("Une erreur est survenue lors de l'analyse de l'image recto.");
    } finally {
      setLoading(false);
    }
  };

  const handleVersoUpload = async (file) => {
    setLoading(true);
    setError("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgData = event.target.result;

      Quagga.decodeSingle(
        {
          src: imgData,
          numOfWorkers: 0,
          inputStream: {
            size: 1280,
          },
          locator: {
            halfSample: true,
            patchSize: "medium",
          },
          decoder: {
            readers: ["code_128_reader", "ean_reader", "upc_reader", "i2of5_reader"],
          },
          locate: true,
          debug: true,
        },
        (result) => {
          if (result && result.codeResult) {
            const first8Digits = result.codeResult.code.match(/\d{8}/)?.[0] || "";
            if (first8Digits) {
              setRecognizedText2(first8Digits);
            } else {
              setError("Aucun code-barres valide détecté.");
            }
          } else {
            setError("Impossible de lire le code-barres.");
          }
          setLoading(false);
        }
      );
    };

    reader.readAsDataURL(file);
  };

  const verifyData = () => {
    if (recognizedText1 && recognizedText2) {
      setVerificationResult(
        recognizedText1 === recognizedText2
          ? "Votre Carte d'identité est Valide ✅"
          : "Votre Carte d'identité est Invalide ❌"
      );
    } else {
      setError("Veuillez compléter les étapes pour valider les données.");
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (type === "recto") {
        setRectoImage(file);
        handleRectoUpload(file);
      } else if (type === "verso") {
        setVersoImage(file);
        handleVersoUpload(file);
      }
      setError("");
    } else {
      setError("Veuillez télécharger une image valide.");
    }
  };

  return (
    <div className="boxcin">
      <Navbar />
      <div className="boxcheckcin">
        <div className="containercheckcin">
          <h1>Vérifiez Votre Carte d'Identité</h1>
          <p>Suivez les instructions ci-dessous pour télécharger les images :</p>
          <div className="renseignement-upluod">
            <li>Assurez-vous que les deux images sont bien éclairées et nettes.</li>
            <li> placez le code-barres bien au centre de l'image.</li>
          </div>
          <div className="content-wrapper">
            <div className="upload-section">
              <h3>Importez la Photo Recto (Coté Image)</h3>
              <label className="upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "recto")}
                  style={{ display: "none" }}
                />
                <div className="upload-icon"><i class="fa-solid fa-file-import"></i></div>
                <div className="upload-text">
                  Importez votre image ici
                </div>
              </label>
              {rectoImage && (
                <img
                  src={URL.createObjectURL(rectoImage)}
                  alt="Recto"
                  className="uploaded-image"
                />
              )}
              {recognizedText1 && (
                <div className="result-box">
                  <h3>Texte Reconnu (Recto)</h3>
                  <p>{recognizedText1}</p>
                </div>
              )}
            </div>

            <div className="upload-section">
              <h3>Importez la Photo Verso (Coté Code-barres)</h3>
              <label className="upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "verso")}
                  style={{ display: "none" }}
                />
                <div className="upload-icon"><i class="fa-solid fa-file-import"></i></div>
                <div className="upload-text">
                Importez votre image ici
                </div>
              </label>
              {versoImage && (
                <img
                  src={URL.createObjectURL(versoImage)}
                  alt="Verso"
                  className="uploaded-image"
                />
              )}
              {recognizedText2 && (
                <div className="result-box">
                  <h3>Texte Reconnu (Verso)</h3>
                  <p>{recognizedText2}</p>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={verifyData}
            disabled={loading}
            className="btn-verify"
          >
            {loading ? "Traitement en cours..." : "Vérifier les Données"}
          </button>

          {verificationResult && (
            <div className="result-box">
              <h3>Résultat :</h3>
              <p>
                {verificationResult}
              </p>
            </div>
          )}

          {error && <p className="error">{error}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkcin;
