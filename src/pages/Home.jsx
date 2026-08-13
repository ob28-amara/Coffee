import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Coffee, Award, Sparkles, Flame, ShieldCheck, Heart, ChevronRight } from "lucide-react";
import "./Home.css";

export default function Home() {
  const { products, addToCart } = useApp();

  // Get popular items
  const popularItems = products.filter(item => item.popular).slice(0, 3);

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div className="hero-badge animate-slide-up">
            <Sparkles size={16} /> Premium Roasters
          </div>
          <h1 className="hero-title animate-slide-up">
            Crafting Extraordinary <br />
            <span className="accent-text">Coffee Experiences</span>
          </h1>
          <p className="hero-subtitle animate-slide-up">
            Experience small-batch artisanal coffees sourced ethically from high-altitude plantations, roasted precisely to release complex sensory notes.
          </p>
          <div className="hero-actions animate-slide-up">
            <Link to="/shop" className="btn btn-primary">
              <Coffee size={18} /> Shop Fresh Beans
            </Link>
            <Link to="/services" className="btn btn-secondary">
              Book a Tasting
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="pillars container">
        <div className="section-header text-center">
          <span className="section-subtitle">Our Promise</span>
          <h2 className="section-title">Why Brew &amp; Blend?</h2>
        </div>
        <div className="pillars-grid grid grid-3">
          <div className="card text-center">
            <div className="pillar-icon-wrapper">
              <Award className="pillar-icon" />
            </div>
            <h3>Ethical Direct Trade</h3>
            <p>We source directly from smallholder farms, paying 30% above Fair Trade prices to foster sustainable farming communities.</p>
          </div>
          <div className="card text-center">
            <div className="pillar-icon-wrapper">
              <Flame className="pillar-icon" />
            </div>
            <h3>Micro-Batch Roasting</h3>
            <p>Our roasters profile each batch in 15kg drums, developing optimal sweetness and clarifying distinct origin characteristics.</p>
          </div>
          <div className="card text-center">
            <div className="pillar-icon-wrapper">
              <ShieldCheck className="pillar-icon" />
            </div>
            <h3>Peak Freshness</h3>
            <p>All bags are printed with their roast date and shipped within 24 hours of roasting in degas-valve sealed packaging.</p>
          </div>
        </div>
      </section>

      {/* Popular Items Showcase */}
      <section className="popular-products">
        <div className="container">
          <div className="section-header-flex flex justify-between align-center">
            <div>
              <span className="section-subtitle">Specials</span>
              <h2 className="section-title">Customer Favorites</h2>
            </div>
            <Link to="/shop" className="view-all-link">
              View All Collection <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-3 mt-4">
            {popularItems.length > 0 ? (
              popularItems.map((item) => (
                <div key={item.id} className="card product-card">
                  <div className="product-image-container">
                    <img src={item.image} alt={item.name} className="product-image" />
                    <span className="product-category-badge">{item.category}</span>
                  </div>
                  <div className="product-info">
                    <h3>{item.name}</h3>
                    <p className="product-desc">{item.description}</p>
                    <div className="product-price-action flex justify-between align-center">
                      <span className="product-price">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="btn btn-primary btn-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-3">Loading special selection...</p>
            )}
          </div>
        </div>
      </section>

      {/* Experience / Experience CTA */}
      <section className="experience-cta container">
        <div className="card experience-card flex align-center">
          <div className="experience-image-side"></div>
          <div className="experience-content-side">
            <span className="section-subtitle">Workshops</span>
            <h2>Master the Craft of Brewing</h2>
            <p>
              Elevate your home-barista ritual. Join our sensory cupping classes, master the chemistry of pour-overs, or learn professional latte art on commercial espresso gear.
            </p>
            <Link to="/services" className="btn btn-primary mt-4">
              Explore Workshops &amp; Events
            </Link>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="quote-banner text-center container">
        <Heart className="quote-icon" />
        <blockquote>
          "Coffee is a language in itself. To brew is to share a story, a culture, and a moment of presence."
        </blockquote>
        <cite>— Head Roaster, Brew &amp; Blend</cite>
      </section>
    </div>
  );
}
