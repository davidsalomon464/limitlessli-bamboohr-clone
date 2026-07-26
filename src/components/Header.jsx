import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Settings, MessageSquarePlus, Eye, ShieldAlert, Clock, Menu } from 'lucide-react';
import NotificationsPopover from './popovers/NotificationsPopover';
import HelpDrawer from './drawers/HelpDrawer';
import AskAIDrawer from './drawers/AskAIDrawer';
import SettingsModal from './modals/SettingsModal';
import LicenseAlertsModal from './modals/LicenseAlertsModal';
import TimeDoctorSyncModal from './modals/TimeDoctorSyncModal';

export default function Header({ searchFilter, setSearchFilter, viewAsUser, setViewAsUser, onToggleMobileSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAskAI, setShowAskAI] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLicenseAlerts, setShowLicenseAlerts] = useState(false);
  const [showTimeDoctor, setShowTimeDoctor] = useState(false);

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="icon-btn mobile-menu-btn" onClick={onToggleMobileSidebar} title="Toggle Navigation Menu">
          <Menu size={20} />
        </button>

        <a href="#home" className="brand-logo">
          {/* Limitlessli Swirling Logo SVG */}
          <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="40" r="14" fill="#1b6cb8" />
            <circle cx="70" cy="30" r="12" fill="#1b6cb8" opacity="0.8" />
            <circle cx="65" cy="70" r="16" fill="#1b6cb8" opacity="0.9" />
            <circle cx="35" cy="75" r="10" fill="#1b6cb8" opacity="0.75" />
            <path d="M30 40 Q 50 15, 70 30 T 65 70 T 35 75 Z" stroke="#1b6cb8" strokeWidth="6" fill="none" strokeLinecap="round" />
            <circle cx="50" cy="50" r="8" fill="#1b6cb8" />
          </svg>
        </a>

        {/* Admin "View as User" Impersonation Switcher */}
        <div className="impersonation-bar">
          <button 
            className={`btn-impersonate ${viewAsUser ? 'active-impersonate' : ''}`}
            onClick={() => setViewAsUser(!viewAsUser)}
            title="Toggle Admin View vs Contractor View"
          >
            <Eye size={14} />
            <span>{viewAsUser ? 'Viewing as: Contractor (David Salomon)' : 'Admin View (Full Access)'}</span>
          </button>
        </div>

        {/* Action Quick Badges */}
        <button className="btn-outline-sm desktop-only-btn" onClick={() => setShowLicenseAlerts(true)} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <ShieldAlert size={14} className="icon-red" />
          <span>RN Alerts (1)</span>
        </button>

        <button className="btn-outline-sm desktop-only-btn" onClick={() => setShowTimeDoctor(true)} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <Clock size={14} className="icon-blue" />
          <span>Time Doctor</span>
        </button>
      </div>

      <div className="header-search">
        <Search className="search-icon" size={16} />
        <input 
          type="text" 
          placeholder="Search contractors, files, reports..." 
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>

      <div className="header-right">
        <button 
          className="icon-btn" 
          title="Notifications"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell size={18} />
          <span className="notification-badge">1</span>
        </button>

        <button 
          className="icon-btn" 
          title="Help & Support"
          onClick={() => setShowHelp(true)}
        >
          <HelpCircle size={18} />
        </button>

        <button 
          className="icon-btn" 
          title="Settings"
          onClick={() => setShowSettings(true)}
        >
          <Settings size={18} />
        </button>

        <button 
          className="btn-ask"
          onClick={() => setShowAskAI(true)}
        >
          <MessageSquarePlus size={16} />
          <span>Ask</span>
        </button>
      </div>

      {/* Action Popovers & Modals */}
      <NotificationsPopover 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      <HelpDrawer 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
      />

      <AskAIDrawer 
        isOpen={showAskAI} 
        onClose={() => setShowAskAI(false)} 
      />

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

      <LicenseAlertsModal 
        isOpen={showLicenseAlerts} 
        onClose={() => setShowLicenseAlerts(false)} 
      />

      <TimeDoctorSyncModal 
        isOpen={showTimeDoctor} 
        onClose={() => setShowTimeDoctor(false)} 
      />
    </header>
  );
}
