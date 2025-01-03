import React from 'react'
import './styles/Pagesolutions.css'
import Footer from './Footer'
import Navbar from './Navbar'
import imgpasseport from './images/passeport.jpg';
import imgcin from './images/cin.png'

const Pagesolutions = () => {
  return (
    <div>
        <Navbar/>
    <div className="containersolution">
    <div className="flex-containersolution">
      
      
      <div className="content-sectionsolution">
        <h1 className="titlesolution">
          Our suite of reliable, fast solutions transforms onboarding into an amazing customer experience
        </h1>
        
        <p className="descriptionsolution">
          MSC check_id is a suite of fast, reliable and simple solutions that enable you 
          to automatically verify ID documents and make sure the uploader is who they claim to be.
        </p>

        <p className="descriptionsolution">
          With easy-to-use solutions, we protect you from unpleasant surprises, 
          simultaneously creating a smooth and enjoyable digital onboarding process 
          to enhance your customer experience. Our solutions are scalable across 
          markets and allow for seamless integration with your existing IT environment.
        </p>

        <button className="cta-buttonsolution">
          Get Started
        </button>
      </div>
      <div className="image-sectionsolution">
        <img 
          src="https://www.scrive.com/_next/image?url=https%3A%2F%2Fwwwscrive.cdn.triggerfish.cloud%2Fuploads%2F2024%2F06%2FTop_Block_Case_Netonnet.jpg&w=1920&q=75"
          alt="ID verification demo"
          className="main-image"
        />
      </div>
    </div>
  </div>

  <div className="containersection2solution">
    <h1>Online identity verification: Three Possible Solutions !</h1>
    
    <div className="steps-containersection2solution">
      <div className="stepsection2solution">
        <div className="iconsection2solution"> <img src={imgpasseport} alt='imgpasseport'  /> </div>
        <h2>Passeport verification</h2>
        <p>Our powerful document capture tools allow for the capture and storage of all types of ID documents, using a computer or smartphone. A quick, guided process enables users to capture perfectly sharp and uncropped images in real time, and with ease.</p>
        <a href="#" className="learn-moresection2solution">Learn more</a>
      </div>

      <div className="stepsection2solution">
        <div className="iconsection2solution"> <img src={imgcin} alt='imgcin'  /> </div>
        <h2>Carte_identity Verification</h2>
        <p>Our deep learning technology extracts and analyses document information in real time. This means that you obtain a verdict on the authenticity and validity of any document within less than 12 seconds. In case of an incomplete analysis, fraud experts take over.</p>
        <a href="#" className="learn-moresection2solution">Learn more</a>
      </div>

      <div className="stepsection2solution">
        <div className="iconsection2solution" >  <img src="https://cdn4.iconfinder.com/data/icons/web-and-seo-19/65/906-512.png"alt='imgsignature'  /> </div>
        <h2>signature verification</h2>
        <p>Gain a reliable and robust remote KYC process to combat identity theft effectively. Our facial recognition tools include selfie and video to verify the authenticity of ID documents, and to make sure the uploader is who they claim to be.</p>
        <a href="#" className="learn-moresection2solution">Learn more</a>
      </div>
    </div>
  </div>


  </div>
  )
}

export default Pagesolutions
