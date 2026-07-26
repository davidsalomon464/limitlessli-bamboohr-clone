import React, { useState } from 'react';
import { Briefcase, X } from 'lucide-react';

export default function NewJobModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Renew');
  const [location, setLocation] = useState('Israel (Remote)');
  const [employmentType, setEmploymentType] = useState('Full-Time');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Job Opening "${title}" created and published to Limitlessli Careers website!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Briefcase size={18} className="icon-blue" />
            <h3>Create New Job Opening</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input type="text" placeholder="e.g. Senior Full-Stack Engineer" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option>Renew</option>
              <option>CASM Renew Auditors</option>
              <option>MDS Consulting Services</option>
              <option>Lumina Care</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Employment Type</label>
            <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
              <option>Full-Time</option>
              <option>Contractor</option>
              <option>Part-Time</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Publish Job Opening</button>
          </div>
        </form>
      </div>
    </div>
  );
}
