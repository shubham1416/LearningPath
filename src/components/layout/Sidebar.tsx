import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, ShieldAlert, LayoutDashboard, Terminal } from 'lucide-react';
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-box">
          <BookOpen className="logo-icon" />
        </div>
        <div className="logo-text">
          <span className="logo-title">DevOps Mastery</span>
          <span className="logo-subtitle">Learning Portal</span>
        </div>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section-title">SPACES</div>
        
        <NavLink 
          to="/general" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <BookOpen size={18} />
          <span>DevOps Roadmap</span>
        </NavLink>

        <NavLink 
          to="/cds-devsecops" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <ShieldAlert size={18} />
          <span>CDS DevSecOps Triage</span>
        </NavLink>

        <div className="nav-section-title" style={{ marginTop: '24px' }}>PRACTICE</div>
        <NavLink 
          to="/practice-labs" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Practice Labs</span>
        </NavLink>

        <NavLink 
          to="/playground" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Terminal size={18} />
          <span>Terminal Playground</span>
        </NavLink>
      </div>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <div className="pulse-dot"></div>
          <span>System Online</span>
        </div>
      </div>
    </div>
  );
};
