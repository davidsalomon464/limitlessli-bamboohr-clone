import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { fileCategories } from '../../data/mockData';

export default function UploadFileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [folder, setFolder] = useState(fileCategories[0].name);
  const [fileName, setFileName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`File "${fileName}" uploaded successfully to "${folder}"!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Upload Document / File</h3>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Target Category / Folder</label>
            <select value={folder} onChange={(e) => setFolder(e.target.value)}>
              {fileCategories.map((cat, idx) => (
                <option key={idx} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>File Name</label>
            <input type="text" placeholder="e.g. Employee_Contract_2026.pdf" value={fileName} onChange={(e) => setFileName(e.target.value)} required />
          </div>

          <div className="upload-dropzone">
            <UploadCloud size={36} className="icon-blue" />
            <p>Drag and drop your file here, or browse files</p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Upload File</button>
          </div>
        </form>
      </div>
    </div>
  );
}
