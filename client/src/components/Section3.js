import React from 'react'
import './styles/Section3.css'
import { Link } from "react-router-dom";
const Section3 = () => {
  return (
    <div>
      <div className='bodys3'>
    <section className="featuress3">
        <h1 className="titles3">Why MSC ?</h1>
        <div className="cardss3">
            <div className="cards3">
                <div className="icons3"><i class="fa-solid fa-magnifying-glass"></i></div>
                <h3>Accurate</h3>
                <p>Industry-leading accuracy, in real-world applications</p>
            </div>
            <div className="cards3">
                <div className="icons3"><i class="fa-solid fa-rocket"></i></div>
                <h3>Efficient</h3>
                <p>Read the world without waiting, online and offline</p>
            </div>
            <div className="cards3">
                <div className="icons3"><i class="fa-regular fa-thumbs-up"></i></div>
                <h3>Reliable</h3>
                <p>Built for high availability, Face++ is always on</p>
            </div>
        </div>
    </section>

    <section className="cta-sections3">
        <h2>Ready to get started?</h2>
        <p>Sign up and keep going with free option of any service you want</p>
        <div className="buttonss3">
        <Link to="/register">  <a href="#" class="btns3 btn-primary">Start Free</a> </Link>
        <Link to="/contact"> <a href="#" class="btns3 btn-secondary">Contact Us</a> </Link>
        </div>
    </section>
</div>

    </div>
  )
}

export default Section3
