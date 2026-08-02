import React, { useState } from 'react';
import { 
  Folder, 
  FolderPlus, 
  Upload, 
  FileText, 
  ChevronRight, 
  SlidersHorizontal,
  Download,
  Trash2,
  FileCheck
} from 'lucide-react';
import { fileCategories } from '../../data/mockData';
import NewFolderModal from '../modals/NewFolderModal';

export default function FilesView({ onUploadFile }) {
  const [folders, setFolders] = useState(
    fileCategories.map((c, idx) => ({ id: idx + 1, name: c.name, count: c.count }))
  );
  const [selectedFolder, setSelectedFolder] = useState({ id: 1, name: "Appraisal & Promotion Letter Templates", count: 18 });
  const [files, setFiles] = useState([
    { id: 1, name: 'Standard Contractor NDA Template_2026.pdf', size: '245 KB', uploadedDate: 'Jun 22, 2026' },
    { id: 2, name: 'CASM Engagement Agreement Master.docx', size: '180 KB', uploadedDate: 'Jul 10, 2026' }
  ]);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);

  const handleFolderCreated = (name) => {
    const newF = { id: Date.now(), name: name, count: 0 };
    setFolders([...folders, newF]);
    setSelectedFolder(newF);
  };

  return (
    <div className="files-view">
      <div className="files-top-header">
        <h1 className="page-title">Company Files & Vault</h1>
        <div className="files-actions">
          <button className="btn-outline" onClick={() => setShowNewFolderModal(true)}>
            <FolderPlus size={16} />
            <span>New Folder</span>
          </button>
          <button className="btn-primary" onClick={onUploadFile}>
            <Upload size={16} />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      <div className="files-layout-grid">
        {/* Left Folder Tree Panel */}
        <div className="card folder-tree-card">
          <h3 className="section-title">Categories ({folders.length})</h3>
          <div className="folder-tree-list">
            {folders.map((folder) => (
              <button
                key={folder.id}
                className={`folder-tree-item ${selectedFolder.id === folder.id ? 'selected' : ''}`}
                onClick={() => setSelectedFolder(folder)}
              >
                <Folder size={16} className="icon-blue" />
                <span>{folder.name}</span>
                <span className="folder-count">({folder.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Documents Grid */}
        <div className="card files-content-card">
          <div className="files-card-header">
            <h2 className="current-folder-title">{selectedFolder.name}</h2>
            <div className="files-toolbar">
              <div className="sort-box">
                <span className="subtext">Sort:</span>
                <select className="select-sm">
                  <option>Name (A-Z)</option>
                  <option>Date Modified</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mock-files-grid" style={{ marginTop: '16px' }}>
            {files.map((file) => (
              <div key={file.id} className="file-item-card">
                <FileText size={24} className="icon-blue" />
                <div className="file-info" style={{ flex: 1 }}>
                  <strong>{file.name}</strong>
                  <span className="subtext">{file.size} • {file.uploadedDate}</span>
                </div>
                <button className="icon-btn-sm" title="Download" onClick={() => alert(`Downloading file "${file.name}"...`)}>
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NewFolderModal 
        isOpen={showNewFolderModal} 
        onClose={() => setShowNewFolderModal(false)} 
        onFolderCreated={handleFolderCreated}
      />
    </div>
  );
}
