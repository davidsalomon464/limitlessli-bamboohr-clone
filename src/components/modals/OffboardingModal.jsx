import React, { useState } from 'react';
import { UserX, X, AlertTriangle, Check } from 'lucide-react';

export default function OffboardingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [reason, setReason] = useState('Resignation');
  const [lastDay, setLastDay] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Offboarding process initiated for contractor. Exit interview scheduled and IT access revocation queued.`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <UserX size={20} className="icon-red" />
            <h3>Initiate Offboarding / Engagement Exit</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Reason for Offboarding</label>
            <select value={reason} onChange={e => setReason(e.target.value)}>
              <option>Resignation</option>
              <option>Contract Expiration</option>
              <option>Performance Termination</option>
              <option>Client Shift Restructure</option>
            </select>
          </div>

          <div className="form-group">
            <label>Last Service Day</label>
            <input type="date" value={lastDay} onChange={e => setLastDay(e.target.value)} required />
          </div>

          <div className="card" style={{ background: '#fef2f2', border: '1px solid #fca5a5', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: '#991b1b' }}>
              <AlertTriangle size={16} />
              <span>Initiating offboarding will automatically queue IT asset recovery, Time Doctor account deactivation, and exit document signing.</span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ background: '#dc2626' }}>
              <Check size={16} /> Start Offboarding Checklist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
