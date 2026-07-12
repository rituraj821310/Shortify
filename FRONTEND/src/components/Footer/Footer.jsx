import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Left */}

        <div className="footer-brand">

          <h2>🔗 Shortify</h2>

          <p>
            A modern URL shortener built using the MERN Stack.
            Fast, secure and reliable.
          </p>

        </div>

        {/* Links */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#">Home</a>

          <a href="#">Features</a>

          <a href="#">Dashboard</a>

          <a href="#">Contact</a>

        </div>

        {/* Contact */}

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>Email: support@shortify.com</p>

          <div className="social-icons">

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

            <a href="#">
              <FaXTwitter />
            </a>

            <a href="#">
              <FaEnvelope />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 Shortify. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;