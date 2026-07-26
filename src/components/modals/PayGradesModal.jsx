import React, { useState } from 'react';
import { DollarSign, X, Plus, Upload, Check } from 'lucide-react';

export default function PayGradesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [gradeName, setGradeName] = useState('');
  const [minPay, setMinPay] = useState('');
  const [maxPay, setMaxPay] = useState('');

  const handleAddBand = (e) => {
    e.preventDefault();
    alert(`Pay Band "${gradeName}" ($${minPay} - $${maxPay} / Month) created successfully!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <DollarSign size={20} className="icon-green" />
            <h3>Add Compensation Pay Grade / Band</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleAddBand}>
          <div className="form-group">
            <label>Pay Grade Name</label>
            <input type="text" placeholder="e.g. Grade 4 - Clinical Auditor" value={gradeName} onChange={e => setGradeName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Minimum Monthly Pay ($ USD)</label>
            <input type="number" placeholder="2500" value={minPay} onChange={e => setMinPay(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Maximum Monthly Pay ($ USD)</label>
            <input type="number" placeholder="4500" value={maxPay} onChange={e => setMaxPay(e.target.value)} required />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-success">
              <Check size={16} /> Save Pay Band
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
