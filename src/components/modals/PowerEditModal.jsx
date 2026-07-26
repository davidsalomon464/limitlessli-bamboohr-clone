import React, { useState } from 'react';
import { SlidersHorizontal, X, Layers } from 'lucide-react';

export default function PowerEditModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [fieldToEdit, setFieldToEdit] = useState('division');
  const [newValue, setNewValue] = useState('SASM');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Power Edit: Updated ${fieldToEdit} to "${newValue}" across selected contractors!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Layers size={18} className="icon-blue" />
            <h3>Power Edit Contractors (Bulk Transfer)</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Field to Bulk Update</label>
            <select value={fieldToEdit} onChange={e => setFieldToEdit(e.target.value)}>
              <option value="division">Division (CASM / SASM)</option>
              <option value="client">Client (Department)</option>
              <option value="manager">Manager</option>
              <option value="paySchedule">Pay Schedule (Monthly / Bi-Monthly)</option>
            </select>
          </div>

          <div className="form-group">
            <label>New Target Value</label>
            {fieldToEdit === 'division' ? (
              <select value={newValue} onChange={e => setNewValue(e.target.value)}>
                <option value="SASM">SASM</option>
                <option value="CASM">CASM</option>
              </select>
            ) : fieldToEdit === 'client' ? (
              <select value={newValue} onChange={e => setNewValue(e.target.value)}>
                <option value="Renew">Renew</option>
                <option value="CASM Renew Auditors">CASM Renew Auditors</option>
                <option value="MDS Consulting Services">MDS Consulting Services</option>
                <option value="Lumina Care">Lumina Care</option>
              </select>
            ) : (
              <input type="text" value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="Enter new value" required />
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Apply Power Edit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
