import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function RecordTrainingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Annual');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Training "${title}" recorded successfully!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Record a Training</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Training Course Name</label>
            <input type="text" placeholder="e.g. CASM Security Awareness" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Annual</option>
              <option>Compliance</option>
              <option>Technical Skills</option>
              <option>Management & Leadership</option>
            </select>
          </div>

          <div className="form-group">
            <label>Completion Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Training Record</button>
          </div>
        </form>
      </div>
    </div>
  );
}
