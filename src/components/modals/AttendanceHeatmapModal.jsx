import React, { useState } from 'react';
import { X, Calendar, Activity, CheckCircle2, Clock } from 'lucide-react';

export default function AttendanceHeatmapModal({ isOpen, onClose }) {
  const [selectedContractor, setSelectedContractor] = useState('David Salomon');

  if (!isOpen) return null;

  // Generate 52 weeks x 7 days mock heatmap data
  const weeks = 52;
  const daysPerWeek = 7;
  const heatmapData = [];
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const isWeekend = d === 0 || d === 6;
      if (isWeekend) {
        week.push({ hours: 0, status: 'weekend' });
      } else {
        const rand = Math.random();
        if (rand > 0.95) week.push({ hours: 0, status: 'absent' });
        else if (rand > 0.85) week.push({ hours: 4, status: 'half-day' });
        else week.push({ hours: 8, status: 'full-day' });
      }
    }
    heatmapData.push(week);
  }

  const getColor = (cell) => {
    if (cell.status === 'weekend') return '#f3f4f6';
    if (cell.status === 'absent') return '#fee2e2';
    if (cell.status === 'half-day') return '#86efac';
    return '#16a34a';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Activity size={20} className="icon-blue" />
            <div>
              <h3>Attendance & Activity Heatmap</h3>
              <p className="subtext">52-Week Attendance Consistency Matrix</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label>Select Contractor</label>
          <select value={selectedContractor} onChange={(e) => setSelectedContractor(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-medium)', width: '100%', fontSize: '13px' }}>
            <option>David Salomon (System Developer)</option>
            <option>Honey Jessa Abapo (Operations)</option>
            <option>Asif Ahmed Abir (Scribe Auditor)</option>
            <option>Andrea Mae Abuan (RAI Specialist)</option>
            <option>Mary Grace Acabo (Clinical Documentation Specialist)</option>
          </select>
        </div>

        {/* Heatmap Grid */}
        <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-light)', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {heatmapData.map((week, wIdx) => (
              <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {week.map((cell, dIdx) => (
                  <div
                    key={dIdx}
                    title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${cell.hours} hours (${cell.status})`}
                    style={{
                      width: '11px',
                      height: '11px',
                      borderRadius: '2px',
                      background: getColor(cell),
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--text-light)' }}>
            <span>Jan 2026</span>
            <span>Apr 2026</span>
            <span>Jul 2026</span>
            <span>Oct 2026</span>
            <span>Dec 2026</span>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '12px', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-medium)', fontWeight: 600 }}>Legend:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#16a34a' }}></span> Full Day (8h)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#86efac' }}></span> Partial Day (4h)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#fee2e2' }}></span> Unexcused Absent
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#f3f4f6' }}></span> Weekend / Off
          </div>
        </div>

        {/* Summary Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '20px' }}>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#f0fdf4' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#15803d' }}>98.4%</div>
            <div className="subtext">Attendance Score</div>
          </div>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#eff6ff' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#1d4ed8' }}>1,952 hrs</div>
            <div className="subtext">Total Worked Hours</div>
          </div>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#fef3c7' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#b45309' }}>2 days</div>
            <div className="subtext">Total Unexcused Absences</div>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => alert('Attendance report exported!')}>Export Report</button>
        </div>
      </div>
    </div>
  );
}
