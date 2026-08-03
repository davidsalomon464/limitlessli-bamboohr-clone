import React, { useState } from 'react';
import { UserCheck, X, Star, Download, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CandidateDetailModal({ candidate, isOpen, onClose, onAdvanceStage }) {
  if (!isOpen || !candidate) return null;

  const [rating, setRating] = useState(candidate.rating || 4);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <UserCheck size={20} className="icon-blue" />
            <div>
              <h3>{candidate.name}</h3>
              <p className="subtext">Candidate for {candidate.jobTitle || 'Medical Scribe Auditor'}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="card" style={{ background: '#f9fafb', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
            <div><strong>Applied Date:</strong> {candidate.appliedDate || 'Jul 28, 2026'}</div>
            <div><strong>Current Stage:</strong> <span className="status-badge-green">{candidate.stage || 'Interview'}</span></div>
            <div><strong>Email:</strong> <a href={`mailto:${candidate.email || 'candidate@gmail.com'}`}>{candidate.email || 'candidate@gmail.com'}</a></div>
            <div><strong>Phone:</strong> {candidate.phone || '+972-50-111-2233'}</div>
          </div>
        </div>

        <div className="form-group">
          <label>Recruiter Candidate Evaluation Rating</label>
          <div style={{ display: 'flex', gap: '6px', cursor: 'pointer', marginTop: '6px' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                size={22} 
                fill={star <= rating ? '#f59e0b' : 'none'} 
                color={star <= rating ? '#f59e0b' : '#9ca3af'}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="training-item-row" style={{ marginTop: '16px' }}>
          <div>
            <strong>Candidate Resume / CV:</strong> {candidate.name}_Resume_2026.pdf
            <div className="subtext">Uploaded via limitlessly.bamboohr.com/careers</div>
          </div>
          <button className="btn-outline-sm" onClick={() => alert(`Downloading resume for ${candidate.name}...`)}>
            <Download size={14} /> Download Resume
          </button>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => { if (onAdvanceStage) onAdvanceStage(candidate.id); onClose(); }}>
            <span>Advance to Next Stage</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
