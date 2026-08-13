import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Trash2, Plus, Minus, CreditCard, ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react";
import "./Cart.css";

export default function Cart() {
  const { cart, user, getCartTotal, updateCartQty, removeFromCart, checkout } = useApp();
  const navigate = useNavigate();

  // Promo code states
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  // Checkout states
  const [address, setAddress] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "COFFEE10") {
      setDiscountPercent(10);
      setPromoMessage("10% discount applied!");
    } else {
      setDiscountPercent(0);
      setPromoMessage("Invalid promo code. Try 'COFFEE10'");
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/auth?redirect=cart");
      return;
    }

    if (!cardName || !cardNumber) {
      setCheckoutError("Please fill out all required payment fields.");
      return;
    }

    setIsProcessing(true);
    setCheckoutError("");

    // Simulate payment transaction check
    setTimeout(async () => {
      try {
        const order = await checkout(address);
        setPlacedOrder(order);
        setCheckoutSuccess(true);
      } catch (err) {
        setCheckoutError(err.message || "Checkout failed. Try again.");
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  // Calculations (Shipping removed)
  const subtotal = getCartTotal();
  const discountAmount = subtotal * (discountPercent / 100);
  const shipping = 0; // Shipping set to 0
  const finalTotal = subtotal - discountAmount; // No shipping added

  if (checkoutSuccess && placedOrder) {
    return (
      <div className="cart-page container text-center animate-fade-in">
        <div className="checkout-success-card card">
          <CheckCircle size={60} className="success-icon" />
          <h1>Order Placed Successfully!</h1>
          <p className="order-number">Order ID: <strong>#{placedOrder.id}</strong></p>
          <p className="success-msg">
            Thank you for your order, <strong>{user.name}</strong>! We've received your payment and our baristas are preparing your blend. You can track this order's progress in your dashboard.
          </p>
          <div className="success-actions flex justify-between mt-4">
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
            <Link to="/shop" className="btn btn-secondary">
              Keep Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container animate-fade-in">
      <div className="cart-header">
        <Link to="/shop" className="back-link flex align-center">
          <ArrowLeft size={16} /> Back to shop
        </Link>
        <h1 className="section-title">Your Coffee Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart text-center card">
          <ShoppingBag size={50} className="empty-cart-icon" />
          <h2>Your Cart is Empty</h2>
          <p>It looks like you haven't added any fresh blends or brewing gear yet.</p>
          <Link to="/shop" className="btn btn-primary mt-4">
            Browse Coffee &amp; Gear
          </Link>
        </div>
      ) : (
        <div className="cart-layout flex">
          {/* Cart items side */}
          <div className="cart-items-side flex-1">
            <div className="card">
              {cart.map((item) => (
                <div key={item.id} className="cart-item flex align-center justify-between">
                  <div className="cart-item-info flex align-center">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div>
                      <h3>{item.name}</h3>
                      <span className="cart-item-category">{item.category}</span>
                      <p className="cart-item-price-unit">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="cart-item-qty flex align-center">
                    <button
                      onClick={() => updateCartQty(item.id, item.quantity - 1)}
                      className="qty-btn"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQty(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="cart-item-subtotal">
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn-icon delete-btn"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Form */}
            <div className="card checkout-card mt-4">
              <h2>Payment Details</h2>
              {!user && (
                <div className="checkout-auth-alert card flex justify-between align-center">
                  <p>You must be logged in to check out.</p>
                  <Link to="/auth?redirect=cart" className="btn btn-primary btn-sm">
                    Log In / Register
                  </Link>
                </div>
              )}

              <form onSubmit={handleCheckoutSubmit} className="checkout-form">
                {checkoutError && <p className="error-text">{checkoutError}</p>}

                <div className="form-group">
                  <label htmlFor="card-name">Cardholder Name</label>
                  <input
                    type="text"
                    id="card-name"
                    required
                    disabled={!user}
                    placeholder="e.g. Amelia Stone"
                    className="form-input"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>

                <div className="form-row flex">
                  <div className="form-group flex-1 mr-2">
                    <label htmlFor="card-number">Credit Card Number</label>
                    <input
                      type="text"
                      id="card-number"
                      required
                      disabled={!user}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="form-input"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-group mr-2" style={{ width: "120px" }}>
                    <label htmlFor="card-expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="card-expiry"
                      required
                      disabled={!user}
                      placeholder="MM/YY"
                      className="form-input"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ width: "90px" }}>
                    <label htmlFor="card-cvv">CVV</label>
                    <input
                      type="password"
                      id="card-cvv"
                      required
                      disabled={!user}
                      maxLength="3"
                      placeholder="***"
                      className="form-input"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!user || isProcessing}
                  className="btn btn-primary w-full mt-4 flex align-center justify-center"
                >
                  <CreditCard size={18} />
                  {isProcessing ? "Processing Payment..." : `Complete Purchase (${finalTotal.toFixed(2)})`}
                </button>
              </form>
            </div>
          </div>

          {/* Cart summary side */}
          <div className="cart-summary-side">
            <div className="card">
              <h2>Order Summary</h2>
              
              <div className="summary-row flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="summary-row flex justify-between discount-row">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="summary-row flex justify-between total-row">
                <span>Grand Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code card */}
            <div className="card mt-4">
              <h3>Promo Code</h3>
              <form onSubmit={applyPromo} className="promo-form flex">
                <input
                  type="text"
                  placeholder="Enter code (COFFEE10)"
                  className="form-input mr-2"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button type="submit" className="btn btn-secondary btn-sm">
                  Apply
                </button>
              </form>
              {promoMessage && <p className="promo-message mt-2">{promoMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}