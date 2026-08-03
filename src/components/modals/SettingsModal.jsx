import React, { useState } from 'react';
import { Settings, X, Building, ShieldCheck, Mail, Check, Trash2, RotateCcw, Sparkles } from 'lucide-react';
import { isBlankModeActive, clearAllDataToBlank, restoreDemoData } from '../../services/storageService';

export default function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('company');
  const [companyName, setCompanyName] = useState('CASM Limitlessli LLC');
  const [domain, setDomain] = useState('limitlessly.com');
  const [isBlank, setIsBlank] = useState(isBlankModeActive());

  const handleSave = (e) => {
    e.preventDefault();
    alert('Limitlessli Admin Settings updated successfully!');
    onClose();
  };

  const handleClearToBlank = () => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק את כל נתוני ההדגמה ולהתחיל מלוח חלק (Blank Slate)? לפעולה זו אין דרך חזרה אלא על ידי שחזור הדגמה.')) {
      clearAllDataToBlank();
      setIsBlank(true);
      alert('כל הנתונים אופסו בהצלחה! התוכנה כעת בלוח חלק ומוכנה להזנת נתוני החברה המקורית שלכם.');
      window.location.reload();
    }
  };

  const handleRestoreDemo = () => {
    if (window.confirm('האם שחזור נתוני ההדגמה המקוריים? (זה ימלא מחדש 399 עובדים ונתונים לדוגמה)')) {
      restoreDemoData();
      setIsBlank(false);
      alert('נתוני ההדגמה שוחזרו בהצלחה!');
      window.location.reload();
    }
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
          <button className={`view-tab ${activeTab === 'data' ? 'active' : ''}`} onClick={() => setActiveTab('data')}>✨ Data & Blank Slate</button>
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

          {activeTab === 'data' && (
            <div>
              <div className="card" style={{ background: isBlank ? '#fef2f2' : '#f0fdf4', border: `1px solid ${isBlank ? '#fca5a5' : '#86efac'}`, marginBottom: '20px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={24} color={isBlank ? '#dc2626' : '#16a34a'} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px' }}>
                      {isBlank ? 'התוכנה במצב לוח חלק (Blank Slate Active)' : 'התוכנה מציגה נתוני הדגמה (Demo Data Active)'}
                    </h4>
                    <p className="subtext" style={{ marginTop: '4px', fontSize: '13px' }}>
                      {isBlank 
                        ? 'כל התוכן ריק לחלוטין. תוכל להתחיל להזין את הקבלנים, המשרה, והמסמכים של החברה שלכם מאפס.' 
                        : 'כרגע המערכת טעונה עם 399 עובדים ונתוני הדגמה. תוכל לאפס ללוח חלק בלחיצת כפתור.'}
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', background: '#fafafa' }}>
                  <h4 style={{ color: '#dc2626', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Trash2 size={18} /> איפוס ללוח חלק (Blank Slate)
                  </h4>
                  <p className="subtext" style={{ marginBottom: '12px', fontSize: '13px' }}>
                    מוחק את כל עובדי ההדגמה, ההודעות, והמשימות מהמערכת ומכין אותה להזנת הנתונים האמיתיים של החברה.
                  </p>
                  <button type="button" className="btn-outline" style={{ borderColor: '#dc2626', color: '#dc2626', background: '#fef2f2' }} onClick={handleClearToBlank}>
                    <Trash2 size={16} /> מחק הכל והתחל מלוח חלק (Clear All to Blank)
                  </button>
                </div>

                <div style={{ padding: '16px', border: '1px solid var(--border-light)', borderRadius: '8px', background: '#fafafa' }}>
                  <h4 style={{ color: '#2563eb', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RotateCcw size={18} /> שחזור נתוני הדגמה (Restore Demo Data)
                  </h4>
                  <p className="subtext" style={{ marginBottom: '12px', fontSize: '13px' }}>
                    אם תרצה לחזור לנתוני ההדגמה של BambooHR בכל עת, תוכל לשחזר אותם כאן.
                  </p>
                  <button type="button" className="btn-outline" style={{ borderColor: '#2563eb', color: '#2563eb', background: '#eff6ff' }} onClick={handleRestoreDemo}>
                    <RotateCcw size={16} /> שחזר נתוני הדגמה (Restore Demo Data)
                  </button>
                </div>
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

          <div className="modal-actions" style={{ marginTop: '24px' }}>
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
