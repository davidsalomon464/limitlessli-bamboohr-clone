import React, { useState } from 'react';
import { Settings, X, Building, ShieldCheck, Mail, Check } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('company');
  const [companyName, setCompanyName] = useState('CASM Limitlessli LLC');
  const [domain, setDomain] = useState('limitlessly.com');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Limitlessli Admin Settings updated successfully!');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Settings size={20} className="icon-blue" />
            <h3>Limitlessli Platform Settings</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="view-mode-tabs" style={{ marginBottom: '20px' }}>
          <button className={`view-tab ${activeTab === 'company' ? 'active' : ''}`} onClick={() => setActiveTab('company')}>Company Profile</button>
          <button className={`view-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>SSO & 2FA Security</button>
          <button className={`view-tab ${activeTab === 'email' ? 'active' : ''}`} onClick={() => setActiveTab('email')}>Email Branding</button>
        </div>

        <form onSubmit={handleSave}>
          {activeTab === 'company' && (
            <div>
              <div className="form-group">
                <label>Company Legal Name</label>
                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required />
              </div>

              <div className="form-group">
                <label>Default Work Email Domain</label>
                <input type="text" value={domain} onChange={e => setDomain(e.target.value)} required />
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Enforce Two-Factor Authentication (2FA) for all Culture & Admin accounts</span>
                </label>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Single Sign-On (SSO) Google Workspace Integration</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div>
              <div className="form-group">
                <label>Welcome Email Sender Name</label>
                <input type="text" defaultValue="Limitlessli Onboarding Team" />
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Check size={16} /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
