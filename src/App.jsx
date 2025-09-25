import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PipelineProvider } from './context/PipelineContext';
import Interface from './Components/Interface';
import Dashboard from './Components/Dashboard';
import Calendar from './Components/Calendar';
import Change from './Components/Change';
import Introduction from './Components/Introduction';

import Login from './Components/Login';

import Stat from './Components/Stat';
import ActivityLog from './Components/ActivityLog';
import Invoice from './Components/Lists';
import Mail from './Components/Mail';
import UserGuide from './Components/UserGuide';
import AdminDashboard from './Components/AdminDashboard';
import CompanyDashboard from './Components/CompanyDashboard';
import './Components/Change.css';
import './Components/Interface.css';
import dashboardIcon from './assets/dashboard.png';
import leadsIcon from './assets/user-engagement.png';
import chatsIcon from './assets/bubble-chat.png';
import whatsappIcon from './assets/whatsapp.png';
import calendarIcon from './assets/calendar.png';
import listsIcon from './assets/list.png';
import mailIcon from './assets/email.png';
import statsIcon from './assets/stats.png';
import settingsIcon from './assets/setting.png';
import { FiLogOut } from 'react-icons/fi';

// Component to redirect employees away from dashboard
const EmployeeDashboardRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/leads');
    }
  }, [user, navigate]);
  
  // Show dashboard only for admins
  if (user && user.role === 'admin') {
    return <Dashboard />;
  }
  
  // Show loading while redirecting
  return <div>Redirecting...</div>;
};

// Component to restrict access to admin-only routes
const AdminOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/leads');
    }
  }, [user, navigate]);
  
  // Show content only for admins
  if (user && user.role === 'admin') {
    return children;
  }
  
  // Show loading while redirecting
  return <div>Access Denied. Redirecting...</div>;
};

// Admin sidebar items
const adminSidebarItems = [
  { icon: dashboardIcon, label: "Dashboard", path: "/dashboard" },
  { icon: leadsIcon, label: "Leads", path: "/leads" },
  { icon: chatsIcon, label: "Chat", path: "/chat" },
  { icon: statsIcon, label: "Analytics", path: "/stats" },
  { icon: listsIcon, label: "Invoice", path: "/lists" },
  { icon: mailIcon, label: "Mail", path: "/mail" },
  { icon: calendarIcon, label: "Calendar", path: "/calendar" },
  { icon: settingsIcon, label: "Admin", path: "/admin" },
  { icon: settingsIcon, label: "Company dashboard", path: "/company" },
];

// Employee sidebar items (no dashboard, admin panel, or company dashboard)
const employeeSidebarItems = [
  { icon: leadsIcon, label: "Leads", path: "/leads" },
  { icon: chatsIcon, label: "Chat", path: "/chat" },
  { icon: statsIcon, label: "Analytics", path: "/stats" },
  { icon: listsIcon, label: "Invoice", path: "/lists" },
  { icon: mailIcon, label: "Mail", path: "/mail" },
  { icon: calendarIcon, label: "Calendar", path: "/calendar" },
];

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const currentPath = window.location.pathname;
  const isNoSidebar = ["/", "/login", "/signup"].includes(currentPath);
  
  // Choose sidebar items based on user role
  const sidebarItems = user && user.role === 'admin' ? adminSidebarItems : employeeSidebarItems;
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleWhatsAppClick = () => {
    window.open('https://crmwhatsapp-1.onrender.com/api/whatsapp/qr', '_blank');
  };
  
  return (
    <div style={{ display: 'flex', height: '100vh',  overflow: 'hidden'}}>
      {!isNoSidebar && (
        <aside className="crm-sidebar">
          <div className="crm-logo">
            MAYDIV CRM
          </div>
          
          <div className="crm-search-container">
            <div className="crm-search-bar">
              <span className="crm-search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Q Search for..." 
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  flex: 1,
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <nav className="crm-sidebar-nav">
            {sidebarItems.map((item) => (
              item.label === "Chat" ? (
                <div
                  key={item.label}
                  className={`crm-sidebar-item${currentPath.startsWith(item.path) ? ' active' : ''}`}
                  onClick={handleWhatsAppClick}
                >
                  <span className="crm-sidebar-icon">
                    {item.icon && <img src={item.icon} alt={item.label} style={{ width: 24, height: 24, objectFit: 'contain' }} />}
                  </span>
                  <span className="crm-sidebar-label">{item.label}</span>
                </div>
              ) : (
                <Link
                  to={item.path}
                  key={item.label}
                  className={`crm-sidebar-item${currentPath.startsWith(item.path) ? ' active' : ''}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span className="crm-sidebar-icon">
                    {item.icon && <img src={item.icon} alt={item.label} style={{ width: 24, height: 24, objectFit: 'contain' }} />}
                  </span>
                  <span className="crm-sidebar-label">{item.label}</span>
                </Link>
              )
            ))}
          </nav>

          <div className="crm-sidebar-user-section">
            <div className="crm-sidebar-user-info">
              <div className="crm-sidebar-user-avatar">
                {user && user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="crm-sidebar-user-name">
                {user && user.name ? user.name : 'John Carter'}
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="crm-sidebar-logout"
            >
              <FiLogOut style={{ fontSize: '1.1em' }} />
              Logout
            </button>
          </div>
        </aside>
      )}
      <div style={{ flex: 1, minWidth: 0, overflowY: 'auto'}}>
        <Routes>
          <Route path="/" element={
            <>
              <Introduction />
            
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <EmployeeDashboardRedirect />
            </ProtectedRoute>
          } />
          <Route path="/leads" element={
            <ProtectedRoute>
              <Interface navigate={navigate} />
            </ProtectedRoute>
          } />

          <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } />
          <Route path="/leads/:leadId" element={
            <ProtectedRoute>
              <Change />
            </ProtectedRoute>
          } />
          <Route path="/stats" element={
            <ProtectedRoute>
              <Stat />
            </ProtectedRoute>
          } />
          <Route path="/activity-log" element={
            <ProtectedRoute>
              <ActivityLog />
            </ProtectedRoute>
          } />
          <Route path="/lists" element={
            <ProtectedRoute>
              <Invoice />
            </ProtectedRoute>
          } />
          <Route path="/mail" element={
            <ProtectedRoute>
              <Mail />
            </ProtectedRoute>
          } />
          <Route path="/user-guide" element={
            <ProtectedRoute>
              <UserGuide />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminOnlyRoute>
                <AdminDashboard />
              </AdminOnlyRoute>
            </ProtectedRoute>
          } />
          <Route path="/company" element={
            <ProtectedRoute>
              <AdminOnlyRoute>
                <CompanyDashboard />
              </AdminOnlyRoute>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PipelineProvider>
        <Router>
          <AppLayout />
        </Router>
      </PipelineProvider>
    </AuthProvider>
  );
}
