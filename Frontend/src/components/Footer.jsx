import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="f-info">
        {/* Social Icons */}
        <div className="f-info-socials">
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-linkedin-in"></i>
        </div>

        {/* Brand */}
        <div className="f-brand-section">
          <span className="f-brand-name">WanderLust</span>
          <span className="f-copyright">© 2026 Private Limited</span>
        </div>

        {/* Links — use Link, NOT <a>, so React Router handles navigation */}
        <div className="f-info-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}