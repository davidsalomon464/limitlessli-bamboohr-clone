import React, { useState } from 'react';
import { 
  Upload, 
  FolderPlus, 
  Folder, 
  FileText, 
  ChevronDown, 
  Download, 
  Trash2, 
  CheckSquare 
} from 'lucide-react';
import { fileCategories } from '../../data/mockData';

export default function FilesView({ onUploadFile }) {
  const [activeFolder, setActiveFolder] = useState('All Files');
  const [selectedFolder, setSelectedFolder] = useState(fileCategories[0].name);

  return (
    <div className="files-view">
      <div className="files-top-header">
        <h1 className="page-title">Files</h1>
        <div className="files-actions">
          <button className="btn-outline" onClick={onUploadFile}>
            <Upload size={16} />
            <span>Upload File</span>
          </button>
          <button className="icon-btn-border" title="New Folder">
            <FolderPlus size={16} />
          </button>
        </div>
      </div>

      <div className="files-layout-grid">
        {/* Left Folders Sidebar */}
        <div className="files-sidebar card">
          <div className="files-nav-tabs">
            <button 
              className={`files-tab ${activeFolder === 'All Files' ? 'active' : ''}`}
              onClick={() => setActiveFolder('All Files')}
            >
              <FileText size={16} />
              <span>All Files</span>
            </button>
            <button 
              className={`files-tab ${activeFolder === 'Signature Templates' ? 'active' : ''}`}
              onClick={() => setActiveFolder('Signature Templates')}
            >
              <FileText size={16} />
              <span>Signature Templates</span>
            </button>
          </div>

          <div className="folder-tree-list">
            {fileCategories.map((folder, index) => (
              <button 
                key={index}
                className={`folder-tree-item ${selectedFolder === folder.name ? 'selected' : ''}`}
                onClick={() => setSelectedFolder(folder.name)}
              >
                <Folder size={16} className="icon-folder" />
                <span className="folder-name">{folder.name}</span>
                <span className="folder-count">({folder.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Files Container */}
        <div className="files-main-card card">
          <div className="files-card-header">
            <div className="select-all-box">
              <input type="checkbox" id="selectAll" />
              <label htmlFor="selectAll">Select All Files</label>
            </div>

            <div className="files-toolbar">
              <div className="sort-box">
                <span className="sort-label">Sort by</span>
                <select className="select-sm">
                  <option>Name: A - Z</option>
                  <option>Name: Z - A</option>
                  <option>Date Modified</option>
                </select>
              </div>

              <button className="icon-btn-border" title="Download">
                <Download size={16} />
              </button>
              <button className="icon-btn-border" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {/* Files List Content */}
          <div className="files-list-content">
            <h3 className="current-folder-title">{selectedFolder}</h3>
            
            <div className="mock-files-grid">
              <div className="file-item-card">
                <FileText size={32} className="icon-file-pdf" />
                <div className="file-info">
                  <strong>Standard_Template_v1.pdf</strong>
                  <span>Updated Jun 15, 2026 • 245 KB</span>
                </div>
              </div>

              <div className="file-item-card">
                <FileText size={32} className="icon-file-doc" />
                <div className="file-info">
                  <strong>Compliance_Guidelines.docx</strong>
                  <span>Updated May 28, 2026 • 1.2 MB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
