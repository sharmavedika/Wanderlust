import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
  <div className="f-info">
    {/* Icons */}
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

    {/* Links */}
    <div className="f-info-links">
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Service</a>
    </div>
  </div>
</footer>
  );
}