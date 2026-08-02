import React, { useState } from 'react';
import { Laptop, X, Check } from 'lucide-react';

export default function AssetManagementModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [assetName, setAssetName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Company Asset "${assetName}" (Serial #${serialNumber}) issued and recorded successfully!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Laptop size={20} className="icon-blue" />
            <h3>Issue Company Asset / Hardware</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Asset Description</label>
            <input type="text" placeholder="e.g. MacBook Pro 16' (M3 Max)" value={assetName} onChange={e => setAssetName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Serial Number / Asset Tag</label>
            <input type="text" placeholder="e.g. LM-9921-M3" value={serialNumber} onChange={e => setSerialNumber(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Issue Date</label>
            <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} required />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Check size={16} /> Issue Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
