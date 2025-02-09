import React from 'react';
import { Link } from 'react-router-dom';
import "./styles/Verif.css";
import Navbar from './Navbar';
import Footer from './Footer';

const Verif = () => {
  return (

    <div>

<Navbar/>
    <div className="containerverif">
      <div className="main-contentverif">
      <h1>Vérifiez et authentifiez les passeports</h1>
<p>
  Vérifiez automatiquement l'authenticité des passeports et évitez les fraudes grâce à des notifications en temps réel.
</p>
<ul>
  <li><span>✔</span> Accédez aux bases de données officielles</li>
  <li><span>✔</span> Effectuez une vérification en continu</li>
  <li><span>✔</span> Détectez les documents falsifiés</li>
  <li><span>✔</span> Utilisez une API pour l'authentification des passeports</li>
</ul>
<Link to="/checkpasseport"><button className="btnveriff">Verifiez votre Passeport →</button></Link>
      </div>

      <div className="imageverif">
        <img 
          src="https://www.businessnews.com.tn/images/album/IMGBN96094passeport-tunisie.jpg" 
          alt="Verification"
        />
      </div>
    </div>

    <div className="containerverif2">
      <div className="main-contentverif">
      <h1>Vérifiez et authentifiez les cartes d’identité</h1>
<p>
  Vérifiez automatiquement l’authenticité des cartes d’identité et prévenez les fraudes grâce à des notifications en temps réel.
</p>
<ul>
  <li><span>✔</span> Accédez aux bases de données officielles</li>
  <li><span>✔</span> Effectuez une vérification en continu</li>
  <li><span>✔</span> Détectez les documents falsifiés</li>
  <li><span>✔</span> Utilisez une API pour l’authentification des cartes d’identité</li>
</ul>
<Link to="/checkcin"><button className="btnveriff">Vérifiez votre carte d’identité →</button></Link>
      </div>

      <div className="imageverif">
        <img 
          src="https://www.businessnews.com.tn/images/album/IMGBN102770CIN-biometrique.jpg" 
          alt="Verification"
        />
      </div>
    </div>
<Footer/>
    </div>
    
  );
}

export default Verif;
