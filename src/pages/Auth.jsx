import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { LogIn, UserPlus, HelpCircle, AlertTriangle } from "lucide-react";
import "./Auth.css";

export default function Auth() {
  const { login, register } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [mode, setMode] = useState("login"); // login, register, forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
        navigate(redirect);
      } else if (mode === "register") {
        await register(email, password, name);
        navigate(redirect);
      } else if (mode === "forgot") {
        // Mock forgot password
        setSuccessMsg(
          "If this email exists, a password reset link has been dispatched.",
        );
        setEmail("");
      }
    } catch (err) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container flex justify-center align-center animate-fade-in">
      <div className="auth-card card flex">
        {/* Branding Decor Column */}
        <div className="auth-decor-side flex">
          <div className="decor-overlay"></div>
          <div className="decor-content">
            <h2>Brew &amp; Blend</h2>
            <p>
              Welcome to our online roastery and cafe system. Log in to place
              fresh orders, customize subscriptions, and check order statuses.
            </p>
            <div className="decor-seed-accounts">
              <h5>Demo Accounts:</h5>
              <p>
                <span>Admin:</span> <code>admin@coffee.com</code> /{" "}
                <code>admin123</code>
              </p>
            </div>
          </div>
        </div>

        {/* Input Column */}
        <div className="auth-form-side">
          {mode === "login" && (
            <div className="form-container">
              <h2>Welcome Back</h2>
              <p className="subtitle">Sign in to your roasting account</p>

              <form onSubmit={handleSubmit} className="auth-form mt-4">
                {error && (
                  <div className="auth-alert error flex align-center">
                    <AlertTriangle size={16} /> <span>{error}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="form-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <div className="flex justify-between align-center">
                    <label htmlFor="password">Password</label>
                    <button
                      type="button"
                      className="forgot-btn"
                      onClick={() => setMode("forgot")}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    id="password"
                    required
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full mt-4 flex align-center justify-center"
                >
                  <LogIn size={18} />
                  {loading ? "Authenticating..." : "Sign In"}
                </button>
              </form>

              <p className="toggle-auth-msg text-center mt-4">
                Don't have an account?{" "}
                <button
                  className="text-link"
                  onClick={() => {
                    setMode("register");
                    setError("");
                  }}
                >
                  Register here
                </button>
              </p>
            </div>
          )}

          {mode === "register" && (
            <div className="form-container">
              <h2>Join the Club</h2>
              <p className="subtitle">
                Register to manage subscriptions &amp; orders
              </p>

              <form onSubmit={handleSubmit} className="auth-form mt-4">
                {error && (
                  <div className="auth-alert error flex align-center">
                    <AlertTriangle size={16} /> <span>{error}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="reg-name">Full Name</label>
                  <input
                    type="text"
                    id="reg-name"
                    required
                    className="form-input"
                    placeholder="Amelia Stone"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reg-email">Email Address</label>
                  <input
                    type="email"
                    id="reg-email"
                    required
                    className="form-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reg-pass">Create Password</label>
                  <input
                    type="password"
                    id="reg-pass"
                    required
                    className="form-input"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full mt-4 flex align-center justify-center"
                >
                  <UserPlus size={18} />
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <p className="toggle-auth-msg text-center mt-4">
                Already have an account?{" "}
                <button
                  className="text-link"
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                >
                  Sign In
                </button>
              </p>
            </div>
          )}

          {mode === "forgot" && (
            <div className="form-container">
              <h2>Reset Password</h2>
              <p className="subtitle">
                Enter your email to receive a recovery link
              </p>

              <form onSubmit={handleSubmit} className="auth-form mt-4">
                {error && (
                  <div className="auth-alert error flex align-center">
                    <AlertTriangle size={16} /> <span>{error}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="auth-alert success flex align-center">
                    <HelpCircle size={16} /> <span>{successMsg}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="for-email">Email Address</label>
                  <input
                    type="email"
                    id="for-email"
                    required
                    className="form-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full mt-4"
                >
                  Send Recovery Link
                </button>
              </form>

              <p className="toggle-auth-msg text-center mt-4">
                Remember your password?{" "}
                <button
                  className="text-link"
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setSuccessMsg("");
                  }}
                >
                  Go back to Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
