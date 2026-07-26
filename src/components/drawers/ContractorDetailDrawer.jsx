import React from 'react';
import { X, Mail, Phone, MapPin, Briefcase, Building, Calendar, CheckCircle2, FileText, Award } from 'lucide-react';

export default function ContractorDetailDrawer({ contractor, isOpen, onClose }) {
  if (!isOpen || !contractor) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()} style={{ margin: '0 0 0 auto', height: '100vh', borderRadius: '0' }}>
        <div className="modal-header">
          <div className="title-box">
            <img src={contractor.photo} alt={contractor.name} className="employee-row-photo" />
            <div>
              <h3>{contractor.name}</h3>
              <p className="subtext">{contractor.jobTitle}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="card" style={{ background: '#f9fafb', marginBottom: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
            <div><Building size={14} className="icon-blue" /> <strong>Client:</strong> {contractor.department}</div>
            <div><Briefcase size={14} className="icon-blue" /> <strong>Status:</strong> {contractor.status}</div>
            <div><Calendar size={14} className="icon-blue" /> <strong>Hire Date:</strong> {contractor.hireDate}</div>
            <div><MapPin size={14} className="icon-blue" /> <strong>Location:</strong> Tel Aviv / Manila</div>
          </div>
        </div>

        <h4 className="section-title" style={{ marginBottom: '8px' }}>Engagement Details</h4>
        <div className="training-item-row">
          <div>
            <strong>Division:</strong> CASM Limitlessli LLC
            <div className="subtext">Pay Schedule: Bi-Monthly • Domain: @limitlessly.com</div>
          </div>
          <span className="status-badge-green"><CheckCircle2 size={12} /> Active Engagement</span>
        </div>

        <h4 className="section-title" style={{ margin: '16px 0 8px 0' }}>Licenses & Compliance</h4>
        <div className="training-item-row">
          <div>
            <strong>RN License Status:</strong> Valid
            <div className="subtext">US RN License (California) #RN-908241 • Expiration: Aug 2026</div>
          </div>
          <button className="btn-outline-sm" onClick={() => alert('Sending license renewal verification email...')}>Verify</button>
        </div>

        <div className="modal-actions" style={{ marginTop: '32px' }}>
          <button className="btn-secondary" onClick={onClose}>Close Drawer</button>
          <button className="btn-primary" onClick={() => { alert(`Directing to ${contractor.name}'s full My Info profile...`); onClose(); }}>
            Open Full Profile
          </button>
        </div>
      </div>
    </div>
  );
}
