import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TimeOffModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [category, setCategory] = useState('Paid NSD');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Time off request for ${category} submitted successfully!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Request Time Off</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Time Off Type</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Paid NSD</option>
              <option>Unpaid NSD</option>
              <option>Sick Leave</option>
              <option>Maternity / Paternity</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label>Note / Reason (Optional)</label>
            <textarea rows="3" placeholder="Add a message for your manager..." value={note} onChange={(e) => setNote(e.target.value)}></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}
