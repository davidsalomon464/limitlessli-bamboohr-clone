import React, { useState } from 'react';
import { X, Clock, Briefcase, TrendingUp, Award, Calendar, BookOpen, DollarSign, Palmtree } from 'lucide-react';

export default function ContractorTimelineModal({ isOpen, onClose, contractorName = 'David Salomon' }) {
  if (!isOpen) return null;

  const events = [
    { id: 1, date: 'Jun 22, 2026', icon: Briefcase, color: '#2563eb', title: 'Engaged by Limitlessli', description: 'Hired as System Developer (Intern) under CASM division. Client: Renew.', type: 'milestone' },
    { id: 2, date: 'Jun 22, 2026', icon: BookOpen, color: '#7c3aed', title: 'Welcome Orientation Completed', description: 'Attended virtual onboarding orientation with Culture team.', type: 'training' },
    { id: 3, date: 'Jun 30, 2026', icon: Award, color: '#059669', title: 'Training Completed', description: 'CASM: Harassment, Discrimination and Sexual Harassment Awareness', type: 'training' },
    { id: 4, date: 'Jul 7, 2026', icon: Clock, color: '#d97706', title: 'Probation Period — Week 2', description: 'First performance check-in with direct manager Yvonne Rickert.', type: 'review' },
    { id: 5, date: 'Jul 14, 2026', icon: Award, color: '#059669', title: 'Security Training Completed', description: 'KnowBe4 Security Awareness Training passed with 94% score.', type: 'training' },
    { id: 6, date: 'Jul 20, 2026', icon: TrendingUp, color: '#2563eb', title: 'First Performance Review', description: 'Exceeded expectations on system development deliverables. Rating: 4.5/5', type: 'review' },
    { id: 7, date: 'Jul 25, 2026', icon: DollarSign, color: '#16a34a', title: 'Pay Rate Adjustment', description: 'Monthly pay rate increased from $850 to $1,100 after probation evaluation.', type: 'compensation' },
    { id: 8, date: 'Aug 1, 2026', icon: Palmtree, color: '#0891b2', title: 'NSD Balance Updated', description: 'First Paid NSD accrual: 8 hours added to balance.', type: 'nsd' },
  ];

  const typeColors = {
    milestone: { bg: '#eff6ff', text: '#2563eb' },
    training: { bg: '#f5f3ff', text: '#7c3aed' },
    review: { bg: '#fef3c7', text: '#d97706' },
    compensation: { bg: '#f0fdf4', text: '#16a34a' },
    nsd: { bg: '#ecfeff', text: '#0891b2' }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={e => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Clock size={20} className="icon-blue" />
            <div>
              <h3>Engagement Timeline</h3>
              <p className="subtext">{contractorName}</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div style={{ position: 'relative', paddingLeft: '40px' }}>
          {/* Vertical Line */}
          <div style={{ position: 'absolute', left: '18px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--primary-blue), #e5e7eb)' }} />

          {events.map((event, i) => {
            const Icon = event.icon;
            const tc = typeColors[event.type] || typeColors.milestone;
            return (
              <div key={event.id} style={{
                position: 'relative', marginBottom: i < events.length - 1 ? '24px' : '0',
                transition: 'transform 0.2s ease',
              }}>
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute', left: '-30px', top: '4px',
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: event.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 0 3px white, 0 0 0 5px ' + event.color + '33'
                }}>
                  <Icon size={12} color="white" />
                </div>

                {/* Content Card */}
                <div style={{
                  background: tc.bg, border: `1px solid ${event.color}22`,
                  borderRadius: 'var(--radius-sm)', padding: '12px 16px',
                  borderLeft: `3px solid ${event.color}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: 600 }}>{event.date}</span>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: event.color + '15', color: event.color, fontWeight: 600, textTransform: 'uppercase' }}>
                      {event.type}
                    </span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '4px' }}>{event.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-medium)', lineHeight: 1.5 }}>{event.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-outline" onClick={() => alert('Timeline exported as PDF!')}>Export Timeline</button>
        </div>
      </div>
    </div>
  );
}
