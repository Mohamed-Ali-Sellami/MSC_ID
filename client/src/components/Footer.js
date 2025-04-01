import React from 'react'
import './styles/Footer.css'

const Footer = () => {
  return (
    <div>
<footer class="footer">
    <div class="footer-container">
        <div class="legal-links">
            <a href="#">Privacy</a>
            <a href="#">Terms and Conditions</a>
            <a href="#">Cookies Settings</a>
            <a href="#">Cookie Notice</a>
            <a href="#">Modern Slavery Statement</a>
            <a href="#">Accessibility Statement</a>
        </div>
        
        <div class="social-links">
            <a href="#"> <i class="fa-brands fa-facebook"></i> </a>
            <a href="#"> <i class="fa-brands fa-instagram"></i> </a>
            <a href="#"> <i class="fa-brands fa-youtube"></i></a>
            <a href="#"> <i class="fa-brands fa-x-twitter"></i></a>
            <a href="#"> <i class="fa-brands fa-linkedin"></i></a>
        </div>

        <div className='foundername' >
           <p>© {new Date().getFullYear()} - Founded by Mohamed Ali Sellami</p>
        </div>
    </div>
</footer>
        
      
    </div>
  )
}

export default Footer
