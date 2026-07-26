import React, { useState } from 'react';
import { Briefcase, X, Check } from 'lucide-react';

export default function CreateJobOpeningModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('CASM');
  const [location, setLocation] = useState('Tel Aviv, Israel');
  const [employmentType, setEmploymentType] = useState('Full-Time Contractor');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`New Job Opening "${title}" for ${department} created successfully and added to ATS pipeline!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Briefcase size={20} className="icon-blue" />
            <h3>Create New Job Opening (ATS)</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" placeholder="e.g. Senior Medical Scribe Auditor" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Client / Department</label>
            <select value={department} onChange={e => setDepartment(e.target.value)}>
              <option>CASM</option>
              <option>Renew</option>
              <option>CASM Renew Auditors</option>
              <option>MDS Consulting</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" value={location} onChange={e => setLocation(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Engagement Type</label>
            <select value={employmentType} onChange={e => setEmploymentType(e.target.value)}>
              <option>Full-Time Contractor</option>
              <option>Part-Time Contractor</option>
              <option>Per-Diem RN</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Check size={16} /> Publish Job Opening
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
