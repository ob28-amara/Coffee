import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle, Clock } from "lucide-react";
import "./Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("feedback");
  const [message, setMessage] = useState("");
  
  const [messages, setMessages] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Load message history from localStorage
  useEffect(() => {
    const storedMsg = localStorage.getItem("coffee_contact_messages");
    if (storedMsg) setMessages(JSON.parse(storedMsg));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newMsg = {
      id: "msg-" + Date.now(),
      name,
      email,
      subject,
      message,
      date: new Date().toLocaleDateString(),
      status: "received"
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem("coffee_contact_messages", JSON.stringify(updated));

    // Reset form
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // hide banner after 5s
  };

  return (
    <div className="contact-page container animate-fade-in">
      <div className="contact-header text-center">
        <span className="section-subtitle">Get In Touch</span>
        <h1 className="section-title">Visit Our Cafe or Write to Us</h1>
        <p className="contact-intro">
          Have feedback on our roasts, want to host an event, or simply want to say hello? Drop us a note or swing by our espresso bar.
        </p>
      </div>

      <div className="contact-grid grid grid-2">
        {/* Info Column */}
        <div className="contact-info-column flex">
          <div className="card info-card flex-1">
            <h2>Location &amp; Hours</h2>
            <div className="info-item flex align-center">
              <MapPin size={22} className="info-icon" />
              <div>
                <h4>Our Address</h4>
                <p>456 Espresso Blvd, Crema Heights, Suite 10</p>
              </div>
            </div>

            <div className="info-item flex align-center">
              <Phone size={22} className="info-icon" />
              <div>
                <h4>Call Us</h4>
                <p>+1 (555) 321-4321</p>
              </div>
            </div>

            <div className="info-item flex align-center">
              <Mail size={22} className="info-icon" />
              <div>
                <h4>Email inquiries</h4>
                <p>hello@brewandblend.com</p>
              </div>
            </div>

            <div className="hours-block mt-4">
              <h4>Opening Hours</h4>
              <p className="flex justify-between"><span>Mon - Fri</span> <span>6:30 AM - 7:00 PM</span></p>
              <p className="flex justify-between"><span>Saturday</span> <span>7:30 AM - 6:00 PM</span></p>
              <p className="flex justify-between"><span>Sunday</span> <span>8:00 AM - 5:00 PM</span></p>
            </div>
          </div>
          
          {/* Map placeholder */}
          <div className="card map-card">
            <div className="map-placeholder">
              <MapPin size={32} className="map-pin-icon" />
              <span>Espresso Bar Location Map</span>
              <p className="map-latlong">Lat: 34.0522, Long: -118.2437</p>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="contact-form-column">
          <div className="card">
            <h2>Send A Message</h2>
            
            {submitted && (
              <div className="success-inline flex align-center">
                <CheckCircle size={20} className="success-icon" />
                <p>Your message has been sent successfully! Our barista team will read it soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="c-name">Your Name</label>
                <input
                  type="text"
                  id="c-name"
                  required
                  className="form-input"
                  placeholder="e.g. Amelia Stone"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-email">Your Email Address</label>
                <input
                  type="email"
                  id="c-email"
                  required
                  className="form-input"
                  placeholder="e.g. amelia@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-subj">Inquiry Subject</label>
                <select
                  id="c-subj"
                  className="form-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="feedback">General Roast Feedback</option>
                  <option value="events">Private Event Bookings</option>
                  <option value="wholesale">Wholesale &amp; Office Supply</option>
                  <option value="careers">Career Opportunities</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="c-msg">Message Body</label>
                <textarea
                  id="c-msg"
                  required
                  className="form-input form-textarea"
                  placeholder="Tell us what's on your mind..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                <Send size={16} /> Send Inquiry
              </button>
            </form>
          </div>

          {/* Messages History List */}
          {messages.length > 0 && (
            <div className="card message-history-card mt-4">
              <h3>Your Sent Inquiries ({messages.length})</h3>
              <div className="msg-history-list">
                {messages.map((m) => (
                  <div key={m.id} className="msg-history-item">
                    <div className="flex justify-between align-center">
                      <span className="msg-subject">{m.subject.toUpperCase()}</span>
                      <span className="msg-date">{m.date}</span>
                    </div>
                    <p className="msg-body">"{m.message}"</p>
                    <div className="msg-status flex align-center">
                      <Clock size={12} />
                      <span>Status: Received (Barista Reviewing)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
