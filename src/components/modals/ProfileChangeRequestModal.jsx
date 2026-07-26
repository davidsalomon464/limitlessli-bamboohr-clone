import React, { useState } from 'react';
import { Edit3, X } from 'lucide-react';

export default function ProfileChangeRequestModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [fieldToChange, setFieldToChange] = useState('Address');
  const [newValue, setNewValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Change request for "${fieldToChange}" to "${newValue}" submitted to HR/Culture for review!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Edit3 size={20} className="icon-blue" />
            <h3>Request Profile Info Change</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Field to Change</label>
            <select value={fieldToChange} onChange={e => setFieldToChange(e.target.value)}>
              <option>Home Address</option>
              <option>WhatsApp / Phone Number</option>
              <option>Personal Email</option>
              <option>Bank Direct Deposit Details</option>
            </select>
          </div>

          <div className="form-group">
            <label>Requested New Value</label>
            <input type="text" placeholder="Enter updated information" value={newValue} onChange={e => setNewValue(e.target.value)} required />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Submit Change Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}
