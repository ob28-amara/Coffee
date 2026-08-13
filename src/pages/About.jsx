import React from "react";
import { Coffee, Award, Heart, ShieldCheck } from "lucide-react";
import "./About.css";

export default function About() {
  return (
    <div className="about-page container animate-fade-in">
      {/* Page Header */}
      <div className="about-header text-center">
        <span className="section-subtitle">Our Story</span>
        <h1 className="section-title">About Our Coffee Shop</h1>
        <p className="about-intro">
          Welcome to our sanctuary for coffee lovers! We are dedicated to delivering ethically sourced, handcrafted coffee, roasted to perfection every single day.
        </p>
      </div>

      {/* Main Banner / Story Section */}
      <div className="about-story card flex align-center my-8">
        <div className="story-image-container">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop"
            alt="Coffee Shop Interior"
            className="story-image"
          />
        </div>
        <div className="story-content">
          <h2>Our Passion &amp; Mission</h2>
          <p>
            Our coffee shop was born out of a genuine love for the art of coffee brewing. We work directly with small farms worldwide to select 100% organic beans harvested with care and sustainability in mind.
          </p>
          <p>
            Whether you need a cozy space to study, work, or catch up with friends, our shop provides the perfect environment paired with the best brews in town.
          </p>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="about-features grid grid-4 my-8">
        <div className="feature-card card text-center">
          <Coffee size={40} className="feature-icon" />
          <h3>Single-Origin Beans</h3>
          <p>Hand-selected organic beans roasted in small batches to preserve unique flavor profiles.</p>
        </div>

        <div className="feature-card card text-center">
          <Award size={40} className="feature-icon" />
          <h3>Expert Craftsmanship</h3>
          <p>Brewed by passionate baristas with years of experience and dedication to the craft.</p>
        </div>

        <div className="feature-card card text-center">
          <Heart size={40} className="feature-icon" />
          <h3>Community Focus</h3>
          <p>Creating a warm, welcoming environment where friends and neighbors can connect.</p>
        </div>

        <div className="feature-card card text-center">
          <ShieldCheck size={40} className="feature-icon" />
          <h3>Quality Guaranteed</h3>
          <p>Strict quality control from sourcing to cup to ensure the best taste in every sip.</p>
        </div>
      </div>
    </div>
  );
}