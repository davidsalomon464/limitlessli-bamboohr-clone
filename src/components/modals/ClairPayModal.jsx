import React from 'react';
import { CreditCard, X, CheckCircle2 } from 'lucide-react';

export default function ClairPayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <CreditCard size={20} className="icon-blue" />
            <h3>Clair On-Demand Pay Setup</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="card" style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <CheckCircle2 size={24} className="icon-green" />
            <div>
              <strong>On-Demand Pay Status: Eligible</strong>
              <p className="subtext">Access your earned pay immediately after your shift with zero fees.</p>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Linked Bank Account / Debit Card</label>
          <input type="text" defaultValue="•••• •••• •••• 4910 (Chase Bank)" readOnly />
        </div>

        <div className="form-group">
          <label>Available Earned Advance Balance</label>
          <input type="text" defaultValue="$450.00 USD" readOnly style={{ fontWeight: 'bold', fontSize: '16px', color: '#047857' }} />
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-success" onClick={() => { alert('On-demand pay advance of $450.00 transferred to your debit card!'); onClose(); }}>
            Transfer Pay Advance Now
          </button>
        </div>
      </div>
    </div>
  );
}
