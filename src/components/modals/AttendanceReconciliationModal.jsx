import React, { useState } from 'react';
import { Clock, CheckCircle2, AlertTriangle, Download, RefreshCw, X, Shield, Calendar } from 'lucide-react';

export default function AttendanceReconciliationModal({ isOpen, onClose }) {
  const [reconciling, setReconciling] = useState(false);
  const [records, setRecords] = useState([
    { id: 1, name: 'Honey Jessa Abapo', client: 'Renew', scheduled: 160, timeDoctor: 164, variance: '+4.0', status: 'overtime', notes: 'Weekend audit shift approved' },
    { id: 2, name: 'Asif Ahmed Abir', client: 'CASM Renew Auditors', scheduled: 160, timeDoctor: 160, variance: '0.0', status: 'reconciled', notes: 'Exact match' },
    { id: 3, name: 'Andrea Mae Abuan', client: 'MDS Consulting', scheduled: 160, timeDoctor: 152, variance: '-8.0', status: 'discrepancy', notes: '1 day Unpaid NSD pending' },
    { id: 4, name: 'Mary Grace Acabo', client: 'Lumina Care', scheduled: 160, timeDoctor: 160, variance: '0.0', status: 'reconciled', notes: 'Exact match' },
    { id: 5, name: 'Kelvin Jaspher Acuba', client: 'Lumina Care', scheduled: 160, timeDoctor: 156, variance: '-4.0', status: 'discrepancy', notes: 'Half-day partial shift' }
  ]);

  if (!isOpen) return null;

  const handleSyncNow = () => {
    setReconciling(true);
    setTimeout(() => {
      setReconciling(false);
      alert('Time Doctor live reconciliation completed! 5 contractor records updated.');
    }, 1500);
  };

  const handleApproveVariance = (id) => {
    setRecords(prev => prev.map(r => r.id === id ? { ...r, status: 'reconciled', notes: 'Variance approved by admin' } : r));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Clock size={20} className="icon-blue" />
            <div>
              <h3>Time Doctor Attendance Reconciliation</h3>
              <p className="subtext">Reconcile Time Doctor Logged Hours vs Schedule Contracts</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Sync Controls Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#eff6ff', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #bfdbfe' }}>
          <div>
            <strong style={{ fontSize: '13px', color: '#1e40af' }}>Time Doctor API Direct Sync</strong>
            <div className="subtext" style={{ fontSize: '12px' }}>Last Synced: Today at 17:45 • Status: Connected</div>
          </div>
          <button className="btn-primary" onClick={handleSyncNow} disabled={reconciling} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <RefreshCw size={14} className={reconciling ? 'spin-icon' : ''} />
            <span>{reconciling ? 'Syncing...' : 'Sync Time Doctor Now'}</span>
          </button>
        </div>

        {/* Attendance Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#f0fdf4' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#15803d' }}>796 hrs</div>
            <div className="subtext">Total Reconciled Hours</div>
          </div>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#fef3c7' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#b45309' }}>2 Flagged</div>
            <div className="subtext">Hour Discrepancies</div>
          </div>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#eff6ff' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#1d4ed8' }}>+4 hrs</div>
            <div className="subtext">Approved Overtime</div>
          </div>
        </div>

        {/* Reconciliation Table */}
        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid var(--border-light)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Contractor</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Client</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Scheduled</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Time Doctor</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Variance</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{r.name}</td>
                  <td style={{ padding: '10px' }}>{r.client}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{r.scheduled} hrs</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 600 }}>{r.timeDoctor} hrs</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 700, color: r.variance.startsWith('+') ? '#16a34a' : r.variance.startsWith('-') ? '#dc2626' : 'var(--text-dark)' }}>
                    {r.variance} hrs
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    {r.status === 'reconciled' && <span className="status-badge-green">✓ Reconciled</span>}
                    {r.status === 'overtime' && <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600 }}>+ Overtime</span>}
                    {r.status === 'discrepancy' && <span className="badge-past-due">⚠️ Review Needed</span>}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    {r.status === 'discrepancy' ? (
                      <button className="btn-outline-sm" onClick={() => handleApproveVariance(r.id)} style={{ fontSize: '11px' }}>
                        Approve Variance
                      </button>
                    ) : (
                      <span className="subtext" style={{ fontSize: '11px' }}>{r.notes}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => alert('Attendance audit report exported to CSV!')}>
            <Download size={14} /> Export Audit Report (CSV)
          </button>
        </div>
      </div>
    </div>
  );
}
