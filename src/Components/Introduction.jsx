import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Introduction.css";
import dashboardImage from "../assets/Img contentt.png";
import vector89Logo from "../assets/Vector89.png";
import cmvLogo from "../assets/cmv_logo-removebg-preview 1.png";
import forestaLogo from "../assets/FORESTA LOGO-photoaidcom-cropped 1.png";
import groupLogo from "../assets/Group.png";
import himalyaLogo from "../assets/Himalya-Organic-India-Logo 1.png";
import fitfarmLogo from "../assets/FITFARM LOGO-01 1.png";
import sectionImage from "../assets/img section.png";
import vector00Icon from "../assets/Vector00.png";
import group1Icon from "../assets/Group (1).png";
import vector1Icon from "../assets/Vector (1).png";
import vector2Icon from "../assets/Vector (2).png";
import vector3Icon from "../assets/Vector (3).png";
import stepIcon from "../assets/step icon.png";
import stepIcon1 from "../assets/step icon (1).png";
import stepIcon2 from "../assets/step icon (2).png";

const Introduction = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  const handleDotClick = (index) => {
    setActiveTestimonial(index);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="introduction-container">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Navigation Bar */}
        <nav className="nav-bar">
          <div className="nav-content">
            <div className="nav-logo">
              <div className="logo-icon"></div>
              <span className="logo-text">Bricks CRM</span>
            </div>
            <div className="nav-links">
              <a href="#home" className="nav-link">Home</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#pricing" className="nav-link">Pricing</a>
            </div>
            <div className="nav-actions">
              <button className="login-btn" onClick={handleLoginClick}>Log In</button>
              <button className="get-started-btn">Get started Now</button>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Deliver Seamlessly Elegant Service with Bricks CRM
          </h1>
          <p className="hero-subtitle">
            Empower your team with a modern CRM that simplifies workflows, strengthens customer relationships, and scales effortlessly with your business.
          </p>
          <div className="hero-actions">
            <button className="hero-get-started-btn">Get started Now</button>
            <a href="#learn-more" className="learn-more-link">Learn more</a>
          </div>
          
          {/* Dashboard Previews */}
          <div className="dashboard-previews">
            <img 
              src={dashboardImage} 
              alt="Bricks CRM Dashboard Preview" 
              className="dashboard-image"
            />
          </div>
        </div>
      </section>

      {/* Trusted by Section */}
      <section className="trusted-section">
        <div className="trusted-content">
          <h2 className="trusted-title">Trusted by 500+ fast-growing businesses worldwide</h2>
          <div className="company-logos">
            <div className="company-logo">
              <img src={vector89Logo} alt="Baxter" className="logo-image" />
            </div>
            <div className="company-logo">
              <img src={cmvLogo} alt="Create My Venture" className="logo-image" />
            </div>
            <div className="company-logo">
              <img src={forestaLogo} alt="FORESTA DEHRADUN" className="logo-image" />
            </div>
            <div className="company-logo">
              <img src={groupLogo} alt="amcor" className="logo-image" />
            </div>
            <div className="company-logo">
              <img src={himalyaLogo} alt="Himalaya Organic India" className="logo-image" />
            </div>
            <div className="company-logo">
              <img src={fitfarmLogo} alt="FITFARM" className="logo-image" />
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Us Section */}
      <section className="drives-section">
        <div className="drives-content">
          <div className="drives-text">
            <h2 className="drives-title">What Drives Us</h2>
            <p className="drives-description">
              Bricks CRM is your intelligent customer management platform designed to make business simple and effective. With AI-powered automation, real-time insights, and a user-friendly dashboard, Bricks helps you streamline sales, track customer interactions, and close deals faster.
            </p>
          </div>
          <div className="drives-image">
            <img 
              src={sectionImage} 
              alt="Team collaboration in modern office" 
              className="section-image"
            />
          </div>
        </div>
      </section>

      {/* Core Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-content">
          <div className="benefits-layout">
            <div className="benefits-text">
              <h3 className="benefits-subtitle">OUR CORE BENEFITS</h3>
              <h2 className="benefits-title">Powering Smarter Customer Experiences</h2>
              <p className="benefits-description">
                We deliver tailored CRM solutions that drive growth, simplify workflows, and elevate customer experiences across every industry we serve.
              </p>
              
              {/* Scalable & Secure Card - Below Text */}
              <div className="benefit-card benefit-card-below-text">
                <div className="benefit-icon">
                  <img src={vector3Icon} alt="Scalable & Secure" className="benefit-icon-image" />
                </div>
                <h4 className="benefit-title">Scalable & Secure</h4>
                <p className="benefit-description">
                  Built to grow with your business, with enterprise-grade security at every step.
                </p>
              </div>
            </div>
            
            <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">
                <img src={vector00Icon} alt="Smart Insights" className="benefit-icon-image" />
              </div>
              <h4 className="benefit-title">Smart Insights & Reporting</h4>
              <p className="benefit-description">
                Track performance, analyze customer data, and make informed business decisions effortlessly.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <img src={group1Icon} alt="Streamlined Workflows" className="benefit-icon-image" />
              </div>
              <h4 className="benefit-title">Streamlined Workflows</h4>
              <p className="benefit-description">
                Automate repetitive tasks and free up your team's time to focus on building relationships.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <img src={vector1Icon} alt="Seamless Collaboration" className="benefit-icon-image" />
              </div>
              <h4 className="benefit-title">Seamless Collaboration</h4>
              <p className="benefit-description">
                Keep sales, marketing, and support teams connected in one unified platform.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">
                <img src={vector2Icon} alt="Customer Personalization" className="benefit-icon-image" />
              </div>
              <h4 className="benefit-title">Customer Personalization</h4>
              <p className="benefit-description">
                Deliver tailored interactions that strengthen customer loyalty and satisfaction.
              </p>
            </div>

            </div>
          </div>
        </div>
      </section>

      {/* Why Our CRM is the Right Fit Section */}
      <section className="why-crm-section">
        <div className="why-crm-content">
          <div className="why-crm-header">
            <h2 className="why-crm-title">Why Our CRM is the Right Fit for You</h2>
          </div>
          
          <div className="why-crm-layout">
            {/* Icons Row */}
            <div className="why-crm-icons">
              <div className="why-crm-icon-container">
                <div className="why-crm-icon">
                  <img src={stepIcon} alt="Capture Leads" className="why-crm-icon-image" />
                </div>
              </div>
              <div className="why-crm-icon-container">
                <div className="why-crm-icon">
                  <img src={stepIcon1} alt="Automate Workflows" className="why-crm-icon-image" />
                </div>
              </div>
              <div className="why-crm-icon-container">
                <div className="why-crm-icon">
                  <img src={stepIcon2} alt="Grow Relationships" className="why-crm-icon-image" />
                </div>
              </div>
            </div>

            {/* Text Boxes Row */}
            <div className="why-crm-text-boxes">
              <div className="why-crm-text-box">
                <h4 className="why-crm-card-title">Capture Leads</h4>
                <p className="why-crm-card-description">
                  Automatically capture and organize leads from multiple sources to never miss a potential customer.
                </p>
              </div>

              <div className="why-crm-text-box">
                <h4 className="why-crm-card-title">Automate Workflows</h4>
                <p className="why-crm-card-description">
                  Streamline your sales process with intelligent automation that saves time and increases efficiency.
                </p>
              </div>

              <div className="why-crm-text-box">
                <h4 className="why-crm-card-title">Grow Relationships</h4>
                <p className="why-crm-card-description">
                  Build stronger customer relationships with personalized interactions and data-driven insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="pricing-content">
          <div className="pricing-header">
            <h2 className="pricing-title">Choose the Right Plan to Grow</h2>
            <p className="pricing-description">
              Choose the plan that fits your business. Start free, scale with automation, and unlock powerful features as you grow.
            </p>
          </div>
          
          <div className="pricing-cards">
            {/* Free Plan */}
            <div className="pricing-card">
              <h3 className="pricing-card-title">Free Plan</h3>
              <div className="pricing-card-price">
                <span className="price-amount">$0</span>
                <span className="price-period">Per/Month</span>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Contact & Lead Management
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Task & Reminder Scheduling
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Email Integration (Basic)
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Basic Reporting Dashboard
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Mobile Access
                </li>
              </ul>
              <button className="pricing-btn pricing-btn-secondary">
                Choose Plan
                <span className="btn-arrow">→</span>
              </button>
            </div>

            {/* Professional Plan - Highlighted */}
            <div className="pricing-card pricing-card-featured">
              <h3 className="pricing-card-title">Professional Plan</h3>
              <div className="pricing-card-price">
                <span className="price-amount">$999</span>
                <span className="price-period">Per/Month</span>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Advanced Pipeline & Deal Tracking
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Team Collaboration Tools
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Marketing Automation
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Customizable Dashboards & Reports
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Priority Support
                </li>
              </ul>
              <button className="pricing-btn pricing-btn-primary">
                Choose Plan
                <span className="btn-arrow">→</span>
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card">
              <h3 className="pricing-card-title">Enterprise Plan</h3>
              <div className="pricing-card-price">
                <span className="price-amount">$2999</span>
                <span className="price-period">Per/Month</span>
              </div>
              <ul className="pricing-features">
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Unlimited Users & Data Storage
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  AI-Powered Analytics & Forecasting
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Role-Based Access & Security
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Multi-Channel Communication
                </li>
                <li className="pricing-feature">
                  <span className="checkmark">✓</span>
                  Dedicated Account Manager
                </li>
              </ul>
              <button className="pricing-btn pricing-btn-secondary">
                Choose Plan
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-content">
          <div className="testimonials-header">
            <h2 className="testimonials-title">What Our Clients Say About Us</h2>
          </div>
          
          <div className="testimonials-cards">
            {/* Testimonial 1 */}
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "Bricks CRM has transformed our sales process. The automation features save us hours every day, and the insights help us make better decisions. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                    alt="Rohan Malhotra" 
                    className="author-photo"
                  />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Rohan Malhotra</h4>
                  <p className="author-title">Founder of UrbanCraft</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "The team collaboration tools are fantastic. Our entire sales team stays connected and organized. Customer support is also top-notch!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                    alt="Karan Malhotra" 
                    className="author-photo"
                  />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Karan Malhotra</h4>
                  <p className="author-title">Manager at GreenHolden</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="testimonial-card">
              <div className="testimonial-stars">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "The AI-powered analytics have given us incredible insights into our customer behavior. Our conversion rates have improved by 40% since implementing Bricks CRM."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" 
                    alt="Ankit Verma" 
                    className="author-photo"
                  />
                </div>
                <div className="author-info">
                  <h4 className="author-name">Ankit Verma</h4>
                  <p className="author-title">CEO of TechVision</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="testimonials-pagination">
            <div 
              className={`pagination-dot ${activeTestimonial === 0 ? 'active' : ''}`}
              onClick={() => handleDotClick(0)}
            ></div>
            <div 
              className={`pagination-dot ${activeTestimonial === 1 ? 'active' : ''}`}
              onClick={() => handleDotClick(1)}
            ></div>
            <div 
              className={`pagination-dot ${activeTestimonial === 2 ? 'active' : ''}`}
              onClick={() => handleDotClick(2)}
            ></div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-social">
              <h3 className="footer-title">Bricks CRM</h3>
              <p className="footer-description">
                Empowering businesses with intelligent customer management solutions.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-nav">
                <h4 className="footer-nav-title">Quick Links</h4>
                <ul className="footer-nav-list">
                  <li><a href="#home" className="footer-nav-link">Home</a></li>
                  <li><a href="#about" className="footer-nav-link">About</a></li>
                  <li><a href="#features" className="footer-nav-link">Features</a></li>
                  <li><a href="#pricing" className="footer-nav-link">Pricing</a></li>
                </ul>
              </div>

              <div className="footer-nav">
                <h4 className="footer-nav-title">Support</h4>
                <ul className="footer-nav-list">
                  <li><a href="#help" className="footer-nav-link">Help Center</a></li>
                  <li><a href="#contact" className="footer-nav-link">Contact Us</a></li>
                  <li><a href="#privacy" className="footer-nav-link">Privacy Policy</a></li>
                  <li><a href="#terms" className="footer-nav-link">Terms of Service</a></li>
                </ul>
              </div>

              <div className="footer-cta">
                <h4 className="footer-cta-title">Ready to get started?</h4>
                <button className="footer-cta-btn">Get started Now</button>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              All rights reserved @Bricks Crm
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Introduction;
