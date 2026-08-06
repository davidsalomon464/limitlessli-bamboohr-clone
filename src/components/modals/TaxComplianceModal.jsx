import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, Download, Send, X, Globe, Mail } from 'lucide-react';

export default function TaxComplianceModal({ isOpen, onClose }) {
  const [activeRegion, setActiveRegion] = useState('us');
  const [contractors, setContractors] = useState([
    { id: 1, name: 'David Salomon', region: 'il', form: 'Form 101 (Israel)', status: 'verified', updated: 'Jan 10, 2026' },
    { id: 2, name: 'Honey Jessa Abapo', region: 'ph', form: 'BIR Form 1901 (Philippines)', status: 'verified', updated: 'Feb 14, 2026' },
    { id: 3, name: 'Asif Ahmed Abir', region: 'us', form: 'W-9 & 1099-NEC (United States)', status: 'verified', updated: 'Jan 05, 2026' },
    { id: 4, name: 'Andrea Mae Abuan', region: 'ph', form: 'BIR Form 1901 (Philippines)', status: 'pending', updated: 'Overdue 12 days' },
    { id: 5, name: 'Mary Grace Acabo', region: 'uk', form: 'HMRC UTR Self-Assessment (UK)', status: 'verified', updated: 'Mar 01, 2026' }
  ]);

  if (!isOpen) return null;

  const filtered = contractors.filter(c => activeRegion === 'all' || c.region === activeRegion);

  const handleSendReminder = (name) => {
    alert(`Tax compliance reminder email sent to ${name}!`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <ShieldCheck size={20} className="icon-blue" />
            <div>
              <h3>Multi-Region Tax & Compliance Center</h3>
              <p className="subtext">Track International Tax Forms (W-9, Form 101, BIR, HMRC)</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Region Filter Tabs */}
        <div className="view-mode-tabs" style={{ marginBottom: '20px' }}>
          <button className={`view-tab ${activeRegion === 'us' ? 'active' : ''}`} onClick={() => setActiveRegion('us')}>🇺🇸 United States (W-9 / 1099)</button>
          <button className={`view-tab ${activeRegion === 'il' ? 'active' : ''}`} onClick={() => setActiveRegion('il')}>🇮🇱 Israel (טופס 101)</button>
          <button className={`view-tab ${activeRegion === 'ph' ? 'active' : ''}`} onClick={() => setActiveRegion('ph')}>🇵🇭 Philippines (BIR 1901)</button>
          <button className={`view-tab ${activeRegion === 'uk' ? 'active' : ''}`} onClick={() => setActiveRegion('uk')}>🇬🇧 UK (HMRC UTR)</button>
          <button className={`view-tab ${activeRegion === 'all' ? 'active' : ''}`} onClick={() => setActiveRegion('all')}>🌐 All Regions</button>
        </div>

        {/* Status Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#f0fdf4' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#15803d' }}>98.2%</div>
            <div className="subtext">Global Tax Compliance Rate</div>
          </div>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#eff6ff' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#1d4ed8' }}>392 Verified</div>
            <div className="subtext">Tax Documents On File</div>
          </div>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#fef3c7' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#b45309' }}>7 Pending</div>
            <div className="subtext">Action Required</div>
          </div>
        </div>

        {/* Tax Table */}
        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid var(--border-light)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Contractor Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Tax Document Type</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Last Verified</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: '10px' }}>{c.form}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{c.updated}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    {c.status === 'verified' ? (
                      <span className="status-badge-green">✓ Verified</span>
                    ) : (
                      <span className="badge-past-due">⚠️ Action Required</span>
                    )}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    {c.status === 'pending' ? (
                      <button className="btn-primary" onClick={() => handleSendReminder(c.name)} style={{ fontSize: '11px', padding: '4px 8px', display: 'flex', gap: '4px', alignItems: 'center', margin: '0 auto' }}>
                        <Mail size={12} /> Send Reminder
                      </button>
                    ) : (
                      <button className="btn-outline-sm" onClick={() => alert(`Downloading tax document for ${c.name}...`)} style={{ fontSize: '11px' }}>
                        Download PDF
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => alert('Tax compliance summary exported to CSV!')}>
            <Download size={14} /> Export Tax Compliance Report
          </button>
        </div>
      </div>
    </div>
  );
}
