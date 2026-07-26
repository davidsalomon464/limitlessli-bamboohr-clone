import React, { useState } from 'react';
import { Settings, X, Shield, Palette, Users, Globe, Database } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('company');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Settings size={20} className="icon-blue" />
            <h3>Portal Settings</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="settings-grid">
          <div className="settings-nav">
            <button className={`settings-tab ${activeTab === 'company' ? 'active' : ''}`} onClick={() => setActiveTab('company')}>
              <Globe size={16} /> Company Profile
            </button>
            <button className={`settings-tab ${activeTab === 'branding' ? 'active' : ''}`} onClick={() => setActiveTab('branding')}>
              <Palette size={16} /> Branding & Theme
            </button>
            <button className={`settings-tab ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => setActiveTab('roles')}>
              <Users size={16} /> User Roles & Access
            </button>
            <button className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
              <Shield size={16} /> Security & SSO
            </button>
          </div>

          <div className="settings-content">
            {activeTab === 'company' && (
              <div>
                <h4 className="settings-title">Company Profile Settings</h4>
                <div className="form-group">
                  <label>Company Legal Name</label>
                  <input type="text" defaultValue="CASM Limitlessli LLC" />
                </div>
                <div className="form-group">
                  <label>Domain</label>
                  <input type="text" defaultValue="limitlessli.bamboohr.com" readOnly />
                </div>
                <button className="btn-primary" onClick={() => { alert('Settings saved successfully!'); onClose(); }}>Save Changes</button>
              </div>
            )}

            {activeTab === 'branding' && (
              <div>
                <h4 className="settings-title">Branding & Logo</h4>
                <div className="form-group">
                  <label>Primary Theme Color</label>
                  <input type="color" defaultValue="#1b6cb8" />
                </div>
                <button className="btn-primary" onClick={() => { alert('Branding updated!'); onClose(); }}>Apply Branding</button>
              </div>
            )}

            {(activeTab === 'roles' || activeTab === 'security') && (
              <div>
                <h4 className="settings-title">Security & SSO Authentication</h4>
                <p className="subtext">SAML 2.0 Single Sign-On enabled via Google Workspace & Okta.</p>
                <button className="btn-success" onClick={onClose}>Status: Active</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
