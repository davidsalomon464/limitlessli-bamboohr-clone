import React, { useState } from 'react';
import { DollarSign, X } from 'lucide-react';

export default function AddPayBandModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [gradeName, setGradeName] = useState('');
  const [minPay, setMinPay] = useState('');
  const [maxPay, setMaxPay] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pay Grade "${gradeName}" ($${minPay} - $${maxPay}) created successfully!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <DollarSign size={18} className="icon-blue" />
            <h3>Add Pay Grade & Band</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Grade Level / Name</label>
            <input type="text" placeholder="e.g. Grade 4 - Senior Developer" value={gradeName} onChange={(e) => setGradeName(e.target.value)} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Minimum Salary ($)</label>
              <input type="number" placeholder="60,000" value={minPay} onChange={(e) => setMinPay(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Maximum Salary ($)</label>
              <input type="number" placeholder="110,000" value={maxPay} onChange={(e) => setMaxPay(e.target.value)} required />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Pay Band</button>
          </div>
        </form>
      </div>
    </div>
  );
}
