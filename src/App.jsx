import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div
          className="app-shell flex"
          style={{ flexDirection: "column", minHeight: "100vh" }}
        >
          <Navbar />
          <div className="main-content" style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
