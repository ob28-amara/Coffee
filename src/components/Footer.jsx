import React from "react";
import { Coffee, Mail, Phone, MapPin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container grid">
        {/* Brand Info */}
        <div className="footer-brand">
          <div className="footer-logo">
            <Coffee className="logo-icon" />
            <span>BREW &amp; BLEND</span>
          </div>
          <p className="brand-description">
            Sourcing the finest single-origin coffee beans from around the globe. Roasted by hand, brewed with passion, served with love.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Sitemap</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Shop Coffee</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/about">The Roastery</a></li>
            <li><a href="/contact">Say Hello</a></li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div className="footer-hours">
          <h3>Cafe Hours</h3>
          <p><span>Monday - Friday</span> <span>6:30 AM - 7:00 PM</span></p>
          <p><span>Saturday</span> <span>7:30 AM - 6:00 PM</span></p>
          <p><span>Sunday</span> <span>8:00 AM - 5:00 PM</span></p>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><MapPin size={16} /> 456 Espresso Blvd, Crema Heights</p>
          <p><Phone size={16} /> +1 (555) 321-4321</p>
          <p><Mail size={16} /> hello@brewandblend.com</p>
        </div>
      </div>

      <div className="footer-bottom text-center">
        <p>&copy; {new Date().getFullYear()} Brew &amp; Blend Coffee Roasters. All rights reserved.</p>
      </div>
    </footer>
  );
}
