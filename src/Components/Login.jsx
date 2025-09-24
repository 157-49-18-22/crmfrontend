import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import mailIcon from "../assets/mail.svg";
import eyeIcon from "../assets/eye.svg";
import eyeOffIcon from "../assets/eye-off.svg";
import { validators } from "../utils/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Validation states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Validation handlers
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError) setEmailError("");
    
    // Real-time validation
    if (value && !validators.validateEmail(value).isValid) {
      setEmailError("Please enter a valid email address (e.g., admin@company.com)");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    // Clear error when user starts typing
    if (passwordError) setPasswordError("");
    
    // Real-time validation
    if (value && !validators.validatePassword(value).isValid) {
      setPasswordError("Password should be at least 6 characters long");
    }
  };

  const handleEmailBlur = () => {
    if (email) {
      const validation = validators.validateEmail(email);
      if (!validation.isValid) {
        setEmailError("Please enter a valid email address (e.g., admin@company.com)");
      }
    }
  };

  const handlePasswordBlur = () => {
    if (password) {
      const validation = validators.validatePassword(password);
      if (!validation.isValid) {
        setPasswordError(validation.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Validate email
    const emailValidation = validators.validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      setLoading(false);
      return;
    }

    // Validate password
    const passwordValidation = validators.validatePassword(password);
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.message);
      setLoading(false);
      return;
    }

    try {
      const result = await login({ email, password });
      if (result.success) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'admin') {
          navigate("/dashboard");
        } else {
          navigate("/leads");
        }
      } else {
        // Show specific error messages based on the error
        const errorMessage = result.message || "Login failed";
        
        if (errorMessage.includes("Invalid credentials") || errorMessage.includes("incorrect")) {
          setError("❌ Wrong email or password. Please check your credentials.");
        } else if (errorMessage.includes("User not found") || errorMessage.includes("email")) {
          setError("❌ Email not found. Please check your email address.");
        } else if (errorMessage.includes("password")) {
          setError("❌ Incorrect password. Please try again.");
        } else if (errorMessage.includes("network") || errorMessage.includes("connection")) {
          setError("❌ Network error. Please check your internet connection.");
        } else {
          setError(`❌ ${errorMessage}`);
        }
        
        setPassword("");
        setPasswordError("");
      }
    } catch (err) {
      setError("❌ Login failed. Please try again later.");
      setPassword("");
      setPasswordError("");
    }
    setLoading(false);
  };

  return (
    <div className="login-split-container">
      {/* Left Panel - Sign In Form */}
      <div className="login-left-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Sign In</h2>
          {error && <div className="login-error">{error}</div>}

          {/* Social Login Buttons */}
          <div className="social-login-buttons">
            <button type="button" className="social-btn google-btn">
              <span className="social-icon">G</span>
            </button>
            <button type="button" className="social-btn facebook-btn">
              <span className="social-icon">f</span>
            </button>
            <button type="button" className="social-btn apple-btn">
              <span className="social-icon">🍎</span>
            </button>
          </div>

          {/* Or Separator */}
          <div className="login-separator">
            <span className="separator-text">Or</span>
          </div>

          {/* Email Input */}
          <div className="login-input-group">
            <input
              type="email"
              placeholder="Enter your email id"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              className={`login-input ${emailError ? 'login-input-error' : ''}`}
              required
              disabled={loading}
            />
          </div>
          {emailError && <div className="login-field-error">{emailError}</div>}

          {/* Password Input */}
          <div className="login-input-group" style={{position: 'relative'}}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              className={`login-input ${passwordError ? 'login-input-error' : ''}`}
              required
              disabled={loading}
              style={{paddingRight: '2.5rem'}}
            />
            <img
              src={showPassword ? eyeOffIcon : eyeIcon}
              alt={showPassword ? "Hide password" : "Show password"}
              className="login-eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
              style={{position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', width: '22px', height: '22px', opacity: 0.7}}
              tabIndex={0}
            />
          </div>
          {passwordError && <div className="login-field-error">{passwordError}</div>}

          {/* Forgot Password Link */}
          <div className="forgot-password-container">
            <span className="login-forgot" onClick={() => alert('Forgot Password?')}>Forgot Password?</span>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-btn-blue" disabled={loading}>
            {loading ? "LOGGING IN..." : "Login"}
          </button>

        </form>
      </div>

      {/* Right Panel - Promotional Section */}
      <div className="login-right-panel">
        <div className="promotional-content">
          <div className="promotional-text">
            <h1 className="promotional-title">
              Welcome to Smarter Business Management 🚀
            </h1>
            <p className="promotional-description">
              Manage clients, track sales, and boost performance—all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
