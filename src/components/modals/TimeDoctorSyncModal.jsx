import React, { useState } from 'react';
import { Clock, RefreshCw, X, CheckCircle2 } from 'lucide-react';

export default function TimeDoctorSyncModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert('Time Doctor attendance hours & NSD reconciliation synced successfully!');
    }, 1200);
  };

  const records = [
    { name: 'Honey Jessa Abapo', tdHours: '160.0 hrs', nsdHours: '0.0 hrs', status: 'Reconciled' },
    { name: 'Asif Ahmed Abir', tdHours: '152.0 hrs', nsdHours: '8.0 hrs (Paid NSD)', status: 'Reconciled' },
    { name: 'David Salomon', tdHours: '160.0 hrs', nsdHours: '0.0 hrs', status: 'Reconciled' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Clock size={20} className="icon-blue" />
            <h3>Time Doctor API Integration & Attendance Sync</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="card" style={{ background: '#f9fafb', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>Time Doctor API Integration: <span className="status-badge-green"><CheckCircle2 size={12} /> Connected</span></strong>
              <p className="subtext">Automatically reconciles logged hours against Paid & Unpaid NSD requests before payroll cutoff.</p>
            </div>
            <button className="btn-primary" onClick={handleSync} disabled={syncing}>
              <RefreshCw size={14} className={syncing ? 'spin-icon' : ''} />
              <span>{syncing ? 'Syncing...' : 'Sync Time Doctor Now'}</span>
            </button>
          </div>
        </div>

        <table className="people-table">
          <thead>
            <tr>
              <th>Contractor Name</th>
              <th>Time Doctor Logged Hours</th>
              <th>NSD Leave Applied</th>
              <th>Payroll Reconciliation</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, idx) => (
              <tr key={idx}>
                <td><strong>{r.name}</strong></td>
                <td>{r.tdHours}</td>
                <td>{r.nsdHours}</td>
                <td><span className="status-badge-green"><CheckCircle2 size={12} /> {r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal-actions">
          <button className="btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
