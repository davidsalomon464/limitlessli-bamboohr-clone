import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, MessageSquare, Users } from 'lucide-react';

export default function NSDApprovalQueueModal({ isOpen, onClose }) {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Honey Jessa Abapo', date: 'Aug 10-11, 2026', type: 'Paid NSD', days: 2, reason: 'Personal appointment', status: 'pending' },
    { id: 2, name: 'Andrea Mae Abuan', date: 'Aug 18, 2026', type: 'Unpaid NSD', days: 1, reason: 'Family event', status: 'pending' },
    { id: 3, name: 'Kelvin Jaspher Acuba', date: 'Aug 22-23, 2026', type: 'Paid NSD', days: 2, reason: 'Medical follow-up', status: 'pending' },
    { id: 4, name: 'Mary Grace Acabo', date: 'Aug 25, 2026', type: 'Paid NSD', days: 1, reason: 'Moving day', status: 'pending' },
    { id: 5, name: 'Ifechukwu Adabanya', date: 'Sep 1-3, 2026', type: 'Unpaid NSD', days: 3, reason: 'Travel', status: 'pending' },
  ]);
  const [selected, setSelected] = useState(new Set());

  if (!isOpen) return null;

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  const handleAction = (id, action) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n; });
  };

  const handleBulkApprove = () => {
    setRequests(prev => prev.map(r => selected.has(r.id) ? { ...r, status: 'approved' } : r));
    setSelected(new Set());
  };

  const toggleSelect = (id) => {
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const toggleAll = () => {
    const pendingIds = requests.filter(r => r.status === 'pending').map(r => r.id);
    if (selected.size === pendingIds.length) setSelected(new Set());
    else setSelected(new Set(pendingIds));
  };

  const statusBadge = (status) => {
    const styles = {
      pending: { bg: '#fef9c3', color: '#a16207', label: 'Pending' },
      approved: { bg: '#dcfce7', color: '#15803d', label: 'Approved' },
      denied: { bg: '#fee2e2', color: '#dc2626', label: 'Denied' },
      info_requested: { bg: '#e0f2fe', color: '#0369a1', label: 'Info Requested' }
    };
    const s = styles[status] || styles.pending;
    return <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, background: s.bg, color: s.color }}>{s.label}</span>;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Users size={20} className="icon-blue" />
            <h3>NSD Approval Queue</h3>
            {pendingCount > 0 && <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700 }}>{pendingCount} pending</span>}
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {selected.size > 0 && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', padding: '8px 12px', background: '#eff6ff', borderRadius: 'var(--radius-sm)', alignItems: 'center', fontSize: '13px' }}>
            <strong>{selected.size} selected</strong>
            <button className="btn-outline-sm" style={{ marginLeft: 'auto', background: '#dcfce7', borderColor: '#22c55e', color: '#15803d' }} onClick={handleBulkApprove}>
              <CheckCircle2 size={14} /> Approve Selected
            </button>
          </div>
        )}

        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', background: '#f9fafb' }}>
                <th style={{ padding: '10px', width: '30px' }}>
                  <input type="checkbox" checked={selected.size === requests.filter(r => r.status === 'pending').length && selected.size > 0} onChange={toggleAll} />
                </th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Contractor</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Dates</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Days</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Reason</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '10px' }}>
                    {r.status === 'pending' && <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleSelect(r.id)} />}
                  </td>
                  <td style={{ padding: '10px', fontWeight: 500 }}>{r.name}</td>
                  <td style={{ padding: '10px' }}>{r.date}</td>
                  <td style={{ padding: '10px' }}>{r.type}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontWeight: 600 }}>{r.days}</td>
                  <td style={{ padding: '10px', color: 'var(--text-medium)' }}>{r.reason}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{statusBadge(r.status)}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    {r.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <button style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                onClick={() => handleAction(r.id, 'approved')} title="Approve">
                          <CheckCircle2 size={14} color="#15803d" />
                        </button>
                        <button style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                onClick={() => handleAction(r.id, 'denied')} title="Deny">
                          <XCircle size={14} color="#dc2626" />
                        </button>
                        <button style={{ background: '#e0f2fe', border: '1px solid #7dd3fc', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                onClick={() => handleAction(r.id, 'info_requested')} title="Request Info">
                          <MessageSquare size={14} color="#0369a1" />
                        </button>
                      </div>
                    ) : <span className="subtext">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-actions" style={{ marginTop: '16px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
