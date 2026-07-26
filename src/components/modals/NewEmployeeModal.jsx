import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function NewEmployeeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('Renew');
  const [status, setStatus] = useState('Contractor');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`New Employee "${name}" added to Limitlessli directory!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Employee</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name (Last Name, First Name)</label>
            <input type="text" placeholder="e.g. Smith, Jane" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input type="text" placeholder="e.g. Scribe Auditor" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
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
            <label>Employment Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Contractor</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Intern</option>
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}
