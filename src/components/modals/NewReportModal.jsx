import React, { useState } from 'react';
import { PieChart, X } from 'lucide-react';

export default function NewReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [reportName, setReportName] = useState('');
  const [category, setCategory] = useState('Headcount & Turnover');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Custom Report "${reportName}" created and added to Favorites!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <PieChart size={18} className="icon-blue" />
            <h3>Create Custom Report</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Report Name</label>
            <input type="text" placeholder="e.g. 2026 Q3 Turnover Analysis" value={reportName} onChange={(e) => setReportName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Report Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Headcount & Turnover</option>
              <option>Time Off & Attendance</option>
              <option>Compensation & Payroll</option>
              <option>Compliance & Training</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Generate Report</button>
          </div>
        </form>
      </div>
    </div>
  );
}
