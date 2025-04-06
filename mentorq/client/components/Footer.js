import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => (
  <footer>
    <div className="footer-content">
      <div className="footer-section">
        <h3>MentorQ</h3>
        <p>Elite Mentorship for JEE & NEET Success</p>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaLinkedin /></a>
        </div>
      </div>
      
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/test-portal">Test Portal</Link></li>
          <li><Link href="/become-mentor">Become a Mentor</Link></li>
          <li><Link href="/about">About Us</Link></li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h3>Support</h3>
        <ul>
          <li><Link href="/contact">Contact Us</Link></li>
          <li><Link href="/privacy">Privacy Policy</Link></li>
          <li><Link href="/terms">Terms of Service</Link></li>
          <li><Link href="/faq">FAQs</Link></li>
        </ul>
      </div>
      
      <div className="footer-section">
        <h3>Contact Info</h3>
        <p>Email: support@mentorq.com</p>
        <p>Phone: +91 9876543210</p>
        <p>Address: 123 Edu Street, Mumbai, India</p>
      </div>
    </div>
    
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} MentorQ. All rights reserved.</p>
    </div>

    <style jsx>{`
      footer {
        background: #1a1a2e;
        color: #d4d4d4;
        padding: 60px 20px 20px;
        border-top: 1px solid #333;
      }
      .footer-content {
        max-width: 1300px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
        padding-bottom: 40px;
      }
      .footer-section h3 {
        color: #ffd700;
        margin-bottom: 20px;
        font-size: 1.3em;
      }
      .footer-section p {
        margin-bottom: 15px;
        line-height: 1.6;
      }
      .social-icons {
        display: flex;
        gap: 15px;
        margin-top: 20px;
      }
      .social-icons a {
        color: #d4d4d4;
        font-size: 1.2em;
        transition: color 0.3s ease;
      }
      .social-icons a:hover {
        color: #ffd700;
      }
      .footer-section ul {
        list-style: none;
      }
      .footer-section ul li {
        margin-bottom: 10px;
      }
      .footer-section ul li a {
        color: #d4d4d4;
        transition: color 0.3s ease;
      }
      .footer-section ul li a:hover {
        color: #ffd700;
      }
      .footer-bottom {
        max-width: 1300px;
        margin: 0 auto;
        padding-top: 20px;
        border-top: 1px solid #333;
        text-align: center;
      }
      
      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;
          gap: 30px;
        }
      }
    `}</style>
  </footer>
);

export default Footer;