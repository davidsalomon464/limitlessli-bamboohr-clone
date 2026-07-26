import React, { useState } from 'react';
import { Code2, X, Copy, Check } from 'lucide-react';

export default function EmbedCodeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const snippet = `<iframe src="https://limitlessli.bamboohr.com/careers/embed" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Code2 size={18} className="icon-blue" />
            <h3>Get Careers Embed Code</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <p className="subtext">Paste this snippet into your corporate website HTML to display active job listings.</p>

        <div className="code-snippet-box">
          <code>{snippet}</code>
          <button className="btn-outline-sm" onClick={handleCopy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="modal-actions">
          <button className="btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
