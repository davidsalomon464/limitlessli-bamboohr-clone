import React, { useState } from 'react';
import { FolderPlus, X, Check } from 'lucide-react';

export default function NewFolderModal({ isOpen, onClose, onFolderCreated }) {
  if (!isOpen) return null;

  const [folderName, setFolderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFolderCreated) onFolderCreated(folderName);
    alert(`Category Folder "${folderName}" created successfully!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <FolderPlus size={20} className="icon-blue" />
            <h3>Create New Document Category Folder</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Folder Name</label>
            <input type="text" placeholder="e.g. Compliance Certificates 2026" value={folderName} onChange={e => setFolderName(e.target.value)} required />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              <Check size={16} /> Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
