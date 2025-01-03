import React, { useState } from 'react';
import './styles/Checkpasseport.css';
import Tesseract from 'tesseract.js';
import Navbar from './Navbar';
import Footer from './Footer';

const Checkpasseport = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [passportDetails, setPassportDetails] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    } else {
      alert('Veuillez télécharger un fichier image valide.');
    }
  };

  const preprocessImage = (imageSrc, callback) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const grayscale = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
        data[i] = data[i + 1] = data[i + 2] = grayscale;
      }

      ctx.putImageData(imageData, 0, 0);
      callback(canvas.toDataURL());
    };
  };

  const performOCR = () => {
    if (!image) {
      alert('Veuillez charger une image avant de continuer.');
      return;
    }

    setLoading(true);
    setText('');
    setVerificationResult(null);
    setPassportDetails(null);

    preprocessImage(image, (processedImage) => {
      Tesseract.recognize(processedImage, 'eng', {
        logger: (info) => console.log(info),
      })
        .then(({ data: { text } }) => {
          if (!text.trim()) {
            setVerificationResult("Aucun texte détecté. Assurez-vous que l'image est claire et lisible.");
          } else {
            setText(text);
            processMRZText(text);
          }
        })
        .catch(() => {
          setVerificationResult("Erreur : Impossible de lire l'image. Vérifiez la qualité du passeport.");
        })
        .finally(() => setLoading(false));
    });
  };

  const processMRZText = (rawText) => {
    const lines = rawText.split('\n').map((line) => line.trim());
    const mrzLines = lines.filter((line) => /^[A-Z0-9<]{44,88}$/.test(line));

    if (mrzLines.length < 2) {
      setVerificationResult('MRZ non détectée ou invalide.');
      return;
    }

    const [line1, line2] = mrzLines.length === 2 ? mrzLines : [mrzLines[0].slice(0, 44), mrzLines[0].slice(44)];
    const details = decodeMRZ(line1, line2);

    setPassportDetails(details);
    setVerificationResult(details.isValid ? 'Passeport valide ✅' : 'Passeport invalide ❌');
  };

  const decodeMRZ = (line1, line2) => {
    const surnameAndGivenName = line1.slice(5).split('<<');
    const surname = surnameAndGivenName[0].replace(/</g, ' ').trim();
    const givenName = surnameAndGivenName[1]?.replace(/</g, ' ').trim() || '';
    const passportNumber = line2.slice(0, 9).replace(/</g, '');
    const dob = formatDate(line2.slice(13, 19));
    const expirationDate = formatDate(line2.slice(21, 27));
    const nationality = line2.slice(10, 13).replace(/</g, '');

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
      return data.split('').reduce((sum, char, i) => {
        const value = char >= '0' && char <= '9' ? +char : char === '<' ? 0 : char.charCodeAt(0) - 55;
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
              <div className="section-box">
                <h3>Téléchargez votre Image (jpg, png)</h3>
                <p className="advice">
                  Assurez-vous que :
                  <ul>
                    <li>L'image est nette et bien cadrée.</li>
                    <li>Les informations sur le passeport sont bien visibles.</li>
                    <li>Aucun reflet ou ombre n'obstrue les données.</li>
                  </ul>
                </p>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
                <button onClick={performOCR} disabled={loading}>
                  {loading ? 'Traitement en cours...' : 'Vérifier Votre Passeport'}
                </button>
              </div>
            </div>

            <div className="details-section">
              {passportDetails && passportDetails.isValid && (
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
                  <p style={{ color: passportDetails?.isValid ? 'green' : 'red' }}>
                    {verificationResult}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkpasseport;
