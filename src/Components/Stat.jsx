import React, { useState, useEffect } from "react";
import { leadsAPI } from "../services/api";
import "./Stat.css";

const analyticsItems = [
  { label: "Win-Loss Analysis", path: "/stats" },
  { label: "Activity Log", path: "/activity-log" },
];

const verticalLabels = ["WITHIN STAGE", "ENTERED STAGE", "LOST"];

export default function Stat() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [statsData, setStatsData] = useState({
    newLeads: 0,
    pipelineStages: [],
    overallStats: {},
    pipelineSummary: []
  });

  useEffect(() => {
    fetchWinLossStats();
  }, []);

  useEffect(() => {
    // Animate the counter from 0 to 23648
    const targetValue = 23648;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    const animateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(targetValue * easeOutQuart);
      
      setAnimatedValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    };
    
    // Start animation after a delay
    const timer = setTimeout(() => {
      requestAnimationFrame(animateCounter);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const fetchWinLossStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await leadsAPI.getWinLossStats();
      setStatsData(response.data);
    } catch (err) {
      console.error('Error fetching win-loss stats:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const maxLeads = Math.max(...statsData.pipelineSummary.map(row => row.leads), 1);

  if (loading) {
    return (
      <div className="analytics-dashboard">
        <main className="analytics-main">
          <div className="stat-loading">
            <div className="stat-loading-spinner"></div>
            <div>Loading analytics...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-dashboard">
        <main className="analytics-main">
          <div className="stat-error">
            <div className="stat-error-icon">⚠️</div>
            <div>{error}</div>
            <button onClick={fetchWinLossStats} className="stat-retry-btn">
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      <main className="analytics-main">
        {/* Header Section */}
        <div className="analytics-header">
          <div className="analytics-welcome">
            <h1>Welcome back, John</h1>
            <p>Track your leads, manage opportunities, and boost sales performance.</p>
          </div>
          <div className="analytics-header-actions">
            <button className="add-lead-btn">+ Add Lead</button>
            <button className="assign-tasks-btn">Assign Tasks</button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="analytics-metrics-grid">
          <div className="analytics-metric-card">
            <div className="metric-label">Leads</div>
            <div className="metric-value">50.8K</div>
            <div className="metric-trend positive">18.4%↑</div>
          </div>
          <div className="analytics-metric-card">
            <div className="metric-label">Pipeline</div>
            <div className="metric-value">50.8K</div>
            <div className="metric-trend negative">10.4%↓</div>
          </div>
          <div className="analytics-metric-card">
            <div className="metric-label">Closed Deals</div>
            <div className="metric-value">125</div>
            <div className="metric-trend positive">18.4%↑</div>
          </div>
          <div className="analytics-metric-card">
            <div className="metric-label">Earning</div>
            <div className="metric-value">$85.6K</div>
            <div className="metric-trend positive">18.4%↑</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="analytics-charts-section">
          {/* Total Revenue Chart */}
          <div className="revenue-chart-container">
            <div className="chart-header">
              <div className="chart-title-section">
                <h3>Total revenue</h3>
                <div className="chart-value">$240.8K</div>
                <div className="chart-trend positive">18.4%↑</div>
              </div>
              <div className="chart-controls">
                <select className="chart-dropdown">
                  <option>Jan 2024 - Dec 2024</option>
                </select>
              </div>
            </div>
            <div className="revenue-chart">
              <svg width="100%" height="200" viewBox="0 0 800 200" className="revenue-line-chart">
                <defs>
                  <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0.1"/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff4444" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#ff4444" stopOpacity="0.1"/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Grid lines */}
                <g className="grid-lines">
                  <line x1="50" y1="20" x2="750" y2="20" stroke="#e0e0e0" strokeWidth="1" opacity="0.3"/>
                  <line x1="50" y1="60" x2="750" y2="60" stroke="#e0e0e0" strokeWidth="1" opacity="0.3"/>
                  <line x1="50" y1="100" x2="750" y2="100" stroke="#e0e0e0" strokeWidth="1" opacity="0.3"/>
                  <line x1="50" y1="140" x2="750" y2="140" stroke="#e0e0e0" strokeWidth="1" opacity="0.3"/>
                  <line x1="50" y1="180" x2="750" y2="180" stroke="#e0e0e0" strokeWidth="1" opacity="0.3"/>
                </g>
                
                {/* Y-axis labels */}
                <text x="20" y="20" className="y-axis-label">250K</text>
                <text x="20" y="60" className="y-axis-label">200K</text>
                <text x="20" y="100" className="y-axis-label">150K</text>
                <text x="20" y="140" className="y-axis-label">100K</text>
                <text x="20" y="180" className="y-axis-label">50K</text>
                <text x="20" y="200" className="y-axis-label">0K</text>
                
                {/* X-axis labels */}
                <text x="100" y="220" className="x-axis-label">Jan</text>
                <text x="200" y="220" className="x-axis-label">Feb</text>
                <text x="300" y="220" className="x-axis-label">Mar</text>
                <text x="400" y="220" className="x-axis-label">Apr</text>
                <text x="500" y="220" className="x-axis-label">May</text>
                <text x="600" y="220" className="x-axis-label">Jun</text>
                <text x="700" y="220" className="x-axis-label">Jul</text>
                <text x="800" y="220" className="x-axis-label">Aug</text>
                
                {/* Revenue area (animated) - Updated to match new line */}
                <path d="M50,160 L150,145 L250,130 L350,110 L450,95 L550,85 L650,75 L750,65 L750,200 L50,200 Z" 
                      fill="url(#revenueGradient)" className="revenue-area"/>
                
                {/* Revenue line (animated) - More realistic data */}
                <path d="M50,160 L150,145 L250,130 L350,110 L450,95 L550,85 L650,75 L750,65" 
                      stroke="#ff6b9d" strokeWidth="3" fill="none" className="revenue-line" filter="url(#glow)"/>
                
                {/* Revenue data points with realistic values */}
                <circle cx="50" cy="160" r="4" fill="#ff6b9d" className="data-point" data-value="180K"/>
                <circle cx="150" cy="145" r="4" fill="#ff6b9d" className="data-point" data-value="195K"/>
                <circle cx="250" cy="130" r="4" fill="#ff6b9d" className="data-point" data-value="210K"/>
                <circle cx="350" cy="110" r="4" fill="#ff6b9d" className="data-point" data-value="230K"/>
                <circle cx="450" cy="95" r="4" fill="#ff6b9d" className="data-point" data-value="245K"/>
                <circle cx="550" cy="85" r="4" fill="#ff6b9d" className="data-point" data-value="255K"/>
                <circle cx="650" cy="75" r="4" fill="#ff6b9d" className="data-point" data-value="265K"/>
                <circle cx="750" cy="65" r="4" fill="#ff6b9d" className="data-point" data-value="275K"/>
                
                {/* Expense area (animated) - Updated to match new line */}
                <path d="M50,170 L150,165 L250,155 L350,140 L450,125 L550,115 L650,105 L750,95 L750,200 L50,200 Z" 
                      fill="url(#expenseGradient)" className="expense-area"/>
                
                {/* Expense line (animated) - More realistic data */}
                <path d="M50,170 L150,165 L250,155 L350,140 L450,125 L550,115 L650,105 L750,95" 
                      stroke="#ff4444" strokeWidth="3" fill="none" className="expense-line" filter="url(#glow)"/>
                
                {/* Expense data points with realistic values */}
                <circle cx="50" cy="170" r="4" fill="#ff4444" className="data-point" data-value="120K"/>
                <circle cx="150" cy="165" r="4" fill="#ff4444" className="data-point" data-value="125K"/>
                <circle cx="250" cy="155" r="4" fill="#ff4444" className="data-point" data-value="135K"/>
                <circle cx="350" cy="140" r="4" fill="#ff4444" className="data-point" data-value="150K"/>
                <circle cx="450" cy="125" r="4" fill="#ff4444" className="data-point" data-value="165K"/>
                <circle cx="550" cy="115" r="4" fill="#ff4444" className="data-point" data-value="175K"/>
                <circle cx="650" cy="105" r="4" fill="#ff4444" className="data-point" data-value="185K"/>
                <circle cx="750" cy="95" r="4" fill="#ff4444" className="data-point" data-value="195K"/>
                
                {/* Legend */}
                <circle cx="100" cy="30" r="4" fill="#ff6b9d" className="legend-dot"/>
                <text x="115" y="35" className="legend-text">Revenue</text>
                <circle cx="200" cy="30" r="4" fill="#ff4444" className="legend-dot"/>
                <text x="215" y="35" className="legend-text">Expenses</text>
              </svg>
            </div>
          </div>

          {/* Right Side Section */}
          <div className="analytics-right-section">
            {/* Upcoming Tasks */}
            <div className="upcoming-tasks-container">
              <div className="tasks-header">
                <h3>Upcoming Tasks</h3>
                <button className="add-new-btn">+ Add New</button>
              </div>
              <div className="tasks-list">
                <div className="task-item">
                  <div className="task-title">Follow-up with Acme Corp</div>
                  <div className="task-details">
                    <div className="task-date">18-Jun-2025</div>
                    <div className="task-time">04:00 PM</div>
                  </div>
                  <div className="task-description">Discuss pricing options for new proposal.</div>
                </div>
                <div className="task-item">
                  <div className="task-title">Follow-up with Acme Corp</div>
                  <div className="task-details">
                    <div className="task-date">18-Jun-2025</div>
                    <div className="task-time">04:00 PM</div>
                  </div>
                  <div className="task-description">Discuss pricing options for new proposal.</div>
                </div>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="sales-chart-container">
              <div className="sales-chart">
                <svg width="200" height="200" viewBox="0 0 200 200" className="donut-chart">
                  {/* Background circle */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#e0e0e0" strokeWidth="20" className="donut-background"/>
                  
                  {/* Revenue segment (Green) - 40% */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#4caf50" strokeWidth="20" 
                          strokeDasharray="251.2 125.6" strokeDashoffset="251.2" transform="rotate(-90 100 100)" 
                          className="donut-segment donut-revenue"/>
                  
                  {/* Profit segment (Pink) - 30% */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#ff6b9d" strokeWidth="20" 
                          strokeDasharray="188.4 188.4" strokeDashoffset="-251.2" transform="rotate(-90 100 100)" 
                          className="donut-segment donut-profit"/>
                  
                  {/* Expense segment (Red) - 20% */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#ff4444" strokeWidth="20" 
                          strokeDasharray="125.6 125.6" strokeDashoffset="-439.6" transform="rotate(-90 100 100)" 
                          className="donut-segment donut-expense"/>
                  
                  {/* Center text with animations */}
                  <text x="100" y="95" textAnchor="middle" className="donut-center-text">{animatedValue.toLocaleString()}</text>
                  <text x="100" y="110" textAnchor="middle" className="donut-center-subtext">Sales</text>
                </svg>
              </div>
              <div className="sales-legend">
                <div className="legend-item">
                  <div className="legend-color" style={{backgroundColor: '#4caf50'}}></div>
                  <span>Revenue</span>
                  <span className="legend-value">$240.8K</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{backgroundColor: '#ff6b9d'}}></div>
                  <span>Profit</span>
                  <span className="legend-value">$160.8K</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{backgroundColor: '#ff4444'}}></div>
                  <span>Expense</span>
                  <span className="legend-value">$80.8K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
