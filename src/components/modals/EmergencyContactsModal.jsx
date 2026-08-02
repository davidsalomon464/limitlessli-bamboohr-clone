import React, { useState } from 'react';
import { Users, X, Plus, Check } from 'lucide-react';

export default function EmergencyContactsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Spouse');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Emergency Contact "${name}" (${relationship} - ${phone}) added successfully to profile!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Users size={20} className="icon-blue" />
            <h3>Add Emergency Contact</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Contact Full Name</label>
            <input type="text" placeholder="e.g. Sarah Salomon" value={name} onChange={e => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Relationship</label>
            <select value={relationship} onChange={e => setRelationship(e.target.value)}>
              <option>Spouse</option>
              <option>Parent</option>
              <option>Sibling</option>
              <option>Friend / Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Phone Number (WhatsApp / Mobile)</label>
            <input type="tel" placeholder="+972-50-000-1122" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Check size={16} /> Save Emergency Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
