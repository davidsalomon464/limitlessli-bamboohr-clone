import React, { useState, useRef } from 'react';
import { FileCheck, X, Eraser, Check, Download } from 'lucide-react';

export default function ESignatureModal({ isOpen, onClose, documentTitle }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('draw'); // 'draw' | 'type'
  const [typedName, setTypedName] = useState('David Salomon');
  const [agreed, setAgreed] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#1b6cb8';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert('Please check the legal declaration box to complete signature.');
      return;
    }
    alert(`Document "${documentTitle || 'Non-Disclosure Agreement (NDA)_2026.pdf'}" electronically signed successfully by ${typedName}!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <FileCheck size={20} className="icon-blue" />
            <h3>Electronic Signature (E-Sign)</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <p className="subtext">Document: <strong>{documentTitle || 'Limitlessli Non-Disclosure Agreement (NDA)_2026.pdf'}</strong></p>

        {/* Signature Mode Switcher */}
        <div className="view-mode-tabs" style={{ margin: '16px 0' }}>
          <button className={`view-tab ${mode === 'draw' ? 'active' : ''}`} onClick={() => setMode('draw')}>Draw Signature</button>
          <button className={`view-tab ${mode === 'type' ? 'active' : ''}`} onClick={() => setMode('type')}>Type Signature</button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'draw' ? (
            <div className="signature-canvas-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="subtext">Draw your signature in the box below:</span>
                <button type="button" className="btn-text-blue" onClick={clearCanvas} style={{ fontSize: '12px' }}>
                  <Eraser size={12} /> Clear Canvas
                </button>
              </div>
              <canvas 
                ref={canvasRef}
                width={600}
                height={140}
                className="sig-canvas"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            </div>
          ) : (
            <div className="form-group">
              <label>Full Legal Name for E-Signature</label>
              <input type="text" value={typedName} onChange={(e) => setTypedName(e.target.value)} required />
              <div className="typed-signature-preview">
                {typedName || 'Your Digital Signature'}
              </div>
            </div>
          )}

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} required />
              <span>I confirm that this electronic signature is legally binding under the E-SIGN Act and Limitlessli policies.</span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-success">
              <Check size={16} /> Sign & Approve Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
