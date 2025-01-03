import React from 'react'
import './styles/Section1.css'
import image1 from './images/section1.svg'
import { Link } from 'react-router-dom'
const Section1 = () => {
  return (
    <div>
      <div className='body'>
    <div className="container">
        <div className="header">
            <h1>Digital identity<br/>
                <span class="purple-text">made simple</span>
            </h1>
            <p className="description">
                Create trust at onboarding and beyond with a complete, AI-powered digital identity solution built to help you know your customers online. Automation allows you to acquire new customers and reduce costs while meeting global KYC and AML compliance.
            </p>
            <div className="buttons-container">
            <Link to="/login"> <a href="#" className="get-in-touch">Get in touch</a> </Link>
                <a href="#" className="see-how">See how it works</a>
            </div>

            <div className="banner">
            We're proud to announce that Entrust has been recognized as a <a href="#">Leader in the 2024 Gartner® Magic Quadrant™</a> for Identity
        </div>
        
        </div>

        <div className="imgsection1">
            <img src={image1} alt='section1'/>
        </div>

        
    </div>
</div>
    </div>
  )
}

export default Section1
