import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Calendar, User, Clock, CheckCircle } from "lucide-react";
import "./Services.css";

export default function Services() {
  const { services } = useApp();
  const [activeTab, setActiveTab] = useState("workshops");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  
  // Workshop booking form state
  const [bookingName, setBookingName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("10:00");
  const [bookingAttendees, setBookingAttendees] = useState("1");

  // Subscription customizer state
  const [subFrequency, setSubFrequency] = useState("monthly");
  const [subBags, setSubBags] = useState("2");
  const [subRoast, setSubRoast] = useState("medium");
  const [subSuccess, setSubSuccess] = useState(false);

  // Catering form state
  const [cateringSubmitted, setCateringSubmitted] = useState(false);

  const handleBookClass = (service) => {
    setSelectedService(service);
    setBookingSuccess(false);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    if (!bookingName || !bookingDate) return;
    setBookingSuccess(true);
    // Clear form
    setBookingName("");
    setBookingDate("");
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubSuccess(true);
  };

  const getSubscriptionPrice = () => {
    const baseBagPrice = 14.50;
    const count = parseInt(subBags);
    let freqMultiplier = 1;
    if (subFrequency === "weekly") freqMultiplier = 4;
    if (subFrequency === "biweekly") freqMultiplier = 2;
    
    return baseBagPrice * count * freqMultiplier;
  };

  return (
    <div className="services-page container animate-fade-in">
      <div className="services-header text-center">
        <span className="section-subtitle">Excellence in Brewing</span>
        <h1 className="section-title">Experiences &amp; Subscriptions</h1>
        <p className="services-intro">
          Join our curated roasting sessions, subscribe to freshly harvested seasonal crops, or commission our baristas for your private corporate event.
        </p>
      </div>

      {/* Tabs */}
      <div className="services-tabs flex align-center">
        <button
          className={activeTab === "workshops" ? "active" : ""}
          onClick={() => { setActiveTab("workshops"); setBookingSuccess(false); setSelectedService(null); }}
        >
          Barista Workshops
        </button>
        <button
          className={activeTab === "subscriptions" ? "active" : ""}
          onClick={() => { setActiveTab("subscriptions"); setSubSuccess(false); }}
        >
          Coffee Subscription
        </button>
        <button
          className={activeTab === "catering" ? "active" : ""}
          onClick={() => { setActiveTab("catering"); setCateringSubmitted(false); }}
        >
          Cafe Catering
        </button>
      </div>

      {/* workshops tab content */}
      {activeTab === "workshops" && (
        <div className="tab-content workshops-tab animate-slide-up">
          {!selectedService ? (
            <div className="grid grid-3">
              {services.map((srv) => (
                <div key={srv.id} className="card service-card">
                  <div className="service-img-container">
                    <img src={srv.image} alt={srv.name} className="service-img" />
                    <span className="service-duration">{srv.duration}</span>
                  </div>
                  <div className="service-info">
                    <h3>{srv.name}</h3>
                    <p>{srv.description}</p>
                    <div className="service-price-row flex justify-between align-center">
                      <span className="service-price">${srv.price.toFixed(2)} <span className="price-unit">/ person</span></span>
                      <button
                        onClick={() => handleBookClass(srv)}
                        className="btn btn-primary btn-sm"
                      >
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="booking-form-area card">
              <button onClick={() => setSelectedService(null)} className="btn btn-secondary btn-sm mb-4">
                &larr; Back to workshops
              </button>
              
              {bookingSuccess ? (
                <div className="success-banner text-center">
                  <CheckCircle size={48} className="success-icon" />
                  <h2>Booking Confirmed!</h2>
                  <p>
                    Thank you, your spot for the <strong>{selectedService.name}</strong> has been reserved for {bookingDate} at {bookingTime}. We have sent a calendar invite to your email.
                  </p>
                  <button onClick={() => setSelectedService(null)} className="btn btn-primary mt-4">
                    View Other Classes
                  </button>
                </div>
              ) : (
                <div className="booking-flex flex">
                  <div className="booking-info-side">
                    <img src={selectedService.image} alt={selectedService.name} className="booking-info-img" />
                    <h2>{selectedService.name}</h2>
                    <p className="description">{selectedService.description}</p>
                    <div className="booking-details">
                      <p><Clock size={16} /> <strong>Duration:</strong> {selectedService.duration}</p>
                      <p><User size={16} /> <strong>Price:</strong> ${selectedService.price.toFixed(2)} per attendee</p>
                    </div>
                  </div>

                  <form onSubmit={submitBooking} className="booking-form-side">
                    <h3>Reserve Your Spot</h3>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="form-input"
                        placeholder="Enter your name"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Select Date</label>
                      <input
                        type="date"
                        id="date"
                        required
                        className="form-input"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                      />
                    </div>
                    <div className="form-row flex">
                      <div className="form-group flex-1 mr-2">
                        <label htmlFor="time">Time Slot</label>
                        <select
                          id="time"
                          className="form-input"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                        >
                          <option value="10:00">10:00 AM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                        </select>
                      </div>
                      <div className="form-group flex-1">
                        <label htmlFor="attendees">Attendees</label>
                        <input
                          type="number"
                          id="attendees"
                          min="1"
                          max="10"
                          className="form-input"
                          value={bookingAttendees}
                          onChange={(e) => setBookingAttendees(e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-4">
                      Confirm Reservation (${(selectedService.price * parseInt(bookingAttendees || 1)).toFixed(2)})
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* subscriptions tab content */}
      {activeTab === "subscriptions" && (
        <div className="tab-content subscriptions-tab animate-slide-up">
          {subSuccess ? (
            <div className="success-banner text-center card">
              <CheckCircle size={48} className="success-icon" />
              <h2>Subscribed Successfully!</h2>
              <p>
                Welcome to the Brew &amp; Blend family! Your custom subscription (<strong>{subBags} Bags</strong> of <strong>{subRoast} Roast</strong> delivered <strong>{subFrequency}</strong>) has been activated. Your first order is being prepared and will ship tomorrow.
              </p>
              <button onClick={() => setSubSuccess(false)} className="btn btn-primary mt-4">
                Customize Settings
              </button>
            </div>
          ) : (
            <div className="sub-builder flex">
              <div className="sub-description-side card">
                <h2>The Fresh Roast Club</h2>
                <p>
                  Never run out of freshly roasted beans again. Our roastmasters select single-origin coffees that are roasted and dispatched directly to your mailbox on your schedule.
                </p>
                <div className="sub-benefits">
                  <p>&bull; Save 10% on every bag compared to retail</p>
                  <p>&bull; Exclusive access to micro-lot, limited batches</p>
                  <p>&bull; Cancel, pause, or adjust frequency anytime</p>
                  <p>&bull; Free carbon-neutral shipping</p>
                </div>
              </div>

              <form onSubmit={handleSubscribe} className="sub-customizer-side card">
                <h3>Build Your Coffee Plan</h3>
                
                <div className="form-group">
                  <label>How many bags? (12oz / 340g per bag)</label>
                  <div className="radio-group flex">
                    <label className={subBags === "1" ? "radio-label active" : "radio-label"}>
                      <input type="radio" name="bags" value="1" checked={subBags === "1"} onChange={(e) => setSubBags(e.target.value)} />
                      1 Bag
                    </label>
                    <label className={subBags === "2" ? "radio-label active" : "radio-label"}>
                      <input type="radio" name="bags" value="2" checked={subBags === "2"} onChange={(e) => setSubBags(e.target.value)} />
                      2 Bags
                    </label>
                    <label className={subBags === "4" ? "radio-label active" : "radio-label"}>
                      <input type="radio" name="bags" value="4" checked={subBags === "4"} onChange={(e) => setSubBags(e.target.value)} />
                      4 Bags
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Roast Profile Preference</label>
                  <div className="radio-group flex">
                    <label className={subRoast === "light" ? "radio-label active" : "radio-label"}>
                      <input type="radio" name="roast" value="light" checked={subRoast === "light"} onChange={(e) => setSubRoast(e.target.value)} />
                      Light (Floral/Bright)
                    </label>
                    <label className={subRoast === "medium" ? "radio-label active" : "radio-label"}>
                      <input type="radio" name="roast" value="medium" checked={subRoast === "medium"} onChange={(e) => setSubRoast(e.target.value)} />
                      Medium (Sweet/Balanced)
                    </label>
                    <label className={subRoast === "dark" ? "radio-label active" : "radio-label"}>
                      <input type="radio" name="roast" value="dark" checked={subRoast === "dark"} onChange={(e) => setSubRoast(e.target.value)} />
                      Dark (Bold/Smoky)
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Delivery Frequency</label>
                  <select className="form-input" value={subFrequency} onChange={(e) => setSubFrequency(e.target.value)}>
                    <option value="weekly">Every Week (4 deliveries/month)</option>
                    <option value="biweekly">Every 2 Weeks (2 deliveries/month)</option>
                    <option value="monthly">Every Month (1 delivery/month)</option>
                  </select>
                </div>

                <div className="sub-pricing-block flex justify-between align-center">
                  <div>
                    <span className="label">Estimated Total:</span>
                    <span className="price">${getSubscriptionPrice().toFixed(2)}</span>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Activate Subscription
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* catering tab content */}
      {activeTab === "catering" && (
        <div className="tab-content catering-tab animate-slide-up">
          {cateringSubmitted ? (
            <div className="success-banner text-center card">
              <CheckCircle size={48} className="success-icon" />
              <h2>Catering Inquiry Received!</h2>
              <p>
                Thanks for considering us for your event! Our events coordinator will review your request and get back to you with pricing details and custom barista bar layouts within 24 hours.
              </p>
              <button onClick={() => setCateringSubmitted(false)} className="btn btn-primary mt-4">
                New Request
              </button>
            </div>
          ) : (
            <div className="catering-form-area card">
              <div className="catering-header text-center">
                <h2>Mobile Espresso Bar &amp; Catering</h2>
                <p>
                  Bring a complete premium coffee shop setup to your wedding, office party, or gallery launch. Equipped with professional La Marzocco machinery and staffed by award-winning baristas.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setCateringSubmitted(true); }} className="catering-form">
                <div className="form-row flex">
                  <div className="form-group flex-1 mr-2">
                    <label>Event Type</label>
                    <select className="form-input">
                      <option>Corporate Gathering</option>
                      <option>Wedding Celebration</option>
                      <option>Private Birthday Party</option>
                      <option>Art Exhibition / Launch</option>
                    </select>
                  </div>
                  <div className="form-group flex-1">
                    <label>Estimated Guests Count</label>
                    <input type="number" min="20" max="1000" className="form-input" placeholder="e.g. 150" required />
                  </div>
                </div>

                <div className="form-row flex">
                  <div className="form-group flex-1 mr-2">
                    <label>Requested Event Date</label>
                    <input type="date" className="form-input" required />
                  </div>
                  <div className="form-group flex-1">
                    <label>Event Location / Venue City</label>
                    <input type="text" className="form-input" placeholder="e.g. Crema City Center" required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Special Requests / Menu customization preferences</label>
                  <textarea className="form-input form-textarea" placeholder="Describe any custom syrup requests, vegan milk options, or branded cup options..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Submit Event Inquiry
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
