import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';

export default function AccrualCalcModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [asOfDate, setAsOfDate] = useState('2026-12-31');
  const [calculatedHours, setCalculatedHours] = useState(40);

  const handleCalculate = (e) => {
    e.preventDefault();
    setCalculatedHours(80);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Calculator size={18} className="icon-blue" />
            <h3>Time Off Calculator</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleCalculate}>
          <div className="form-group">
            <label>Calculate balance projected as of:</label>
            <input type="date" value={asOfDate} onChange={(e) => setAsOfDate(e.target.value)} />
          </div>

          <div className="calc-result-box">
            <span className="result-label">Projected Paid NSD Balance:</span>
            <span className="result-value">{calculatedHours} Hours</span>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Close</button>
            <button type="submit" className="btn-primary">Recalculate Projections</button>
          </div>
        </form>
      </div>
    </div>
  );
}
