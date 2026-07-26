import React from 'react';
import { AlertTriangle, X, Mail, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function LicenseAlertsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const licenses = [
    {
      contractor: 'Mary Grace Acabo',
      role: 'Clinical Documentation Specialist',
      licenseType: 'US RN License (California)',
      licenseNum: 'RN-908241',
      expDate: 'Aug 15, 2026',
      daysLeft: 20,
      status: 'Expiring Soon'
    },
    {
      contractor: 'David Salomon',
      role: 'System Developer (Intern)',
      licenseType: 'Local RN License (Israel)',
      licenseNum: 'RN-884920',
      expDate: 'Dec 31, 2026',
      daysLeft: 158,
      status: 'Active'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <ShieldAlert size={20} className="icon-red" />
            <h3>RN License Expiration & Compliance Center</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <p className="subtext">Automated 30-day warning alerts for active US RN and Local RN licenses.</p>

        <div className="table-responsive" style={{ margin: '16px 0' }}>
          <table className="people-table">
            <thead>
              <tr>
                <th>Contractor Name</th>
                <th>License Type & Number</th>
                <th>Expiration Date</th>
                <th>Compliance Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((lic, idx) => (
                <tr key={idx}>
                  <td>
                    <strong>{lic.contractor}</strong>
                    <div className="subtext">{lic.role}</div>
                  </td>
                  <td>
                    {lic.licenseType}
                    <div className="subtext">#{lic.licenseNum}</div>
                  </td>
                  <td>{lic.expDate}</td>
                  <td>
                    {lic.status === 'Expiring Soon' ? (
                      <span className="badge-past-due">
                        <AlertTriangle size={12} /> Expiring in {lic.daysLeft} days
                      </span>
                    ) : (
                      <span className="status-badge-green">
                        <CheckCircle2 size={12} /> Active
                      </span>
                    )}
                  </td>
                  <td>
                    <button className="btn-outline-sm" onClick={() => alert(`Renewal reminder email sent to ${lic.contractor}!`)}>
                      <Mail size={12} /> Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-actions">
          <button className="btn-primary" onClick={onClose}>Close Compliance Center</button>
        </div>
      </div>
    </div>
  );
}
