import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Coffee, ShoppingBag, User, Menu, X, LogOut } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout, getCartCount } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <Coffee className="logo-icon animate-float" />
          <span className="logo-text">BOBO &amp; COFFEE</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive("/") ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className={isActive("/shop") ? "active" : ""}>
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={isActive("/services") ? "active" : ""}
            >
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive("/about") ? "active" : ""}>
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={isActive("/contact") ? "active" : ""}
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Action Controls */}
        <div className="nav-actions">
          <Link
            to="/cart"
            className="cart-indicator btn-icon"
            title="View Cart"
          >
            <ShoppingBag size={20} />
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>

          {user ? (
            <div className="nav-user-menu">
              <Link
                to="/dashboard"
                className="btn btn-secondary btn-sm align-center"
              >
                <User size={16} />
                <span className="user-name-desktop">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
              <button
                onClick={logout}
                className="btn-icon btn-logout"
                title="Log Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn btn-primary btn-sm align-center">
              <User size={16} />
              <span>Log In</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button className="mobile-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isOpen ? "open" : ""}`}>
        <ul className="mobile-links">
          <li>
            <Link
              to="/"
              className={isActive("/") ? "active" : ""}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className={isActive("/shop") ? "active" : ""}
              onClick={closeMenu}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={isActive("/services") ? "active" : ""}
              onClick={closeMenu}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={isActive("/about") ? "active" : ""}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={isActive("/contact") ? "active" : ""}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className={isActive("/dashboard") ? "active" : ""}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="btn btn-danger btn-sm w-full mt-4"
                >
                  <LogOut size={16} /> Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/auth"
                className="btn btn-primary w-full mt-4"
                onClick={closeMenu}
              >
                Log In / Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
