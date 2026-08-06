import React, { useState } from 'react';
import { Target, Star, Award, CheckCircle2, Plus, X, TrendingUp, Calendar, ChevronRight, MessageSquare } from 'lucide-react';

export default function PerformanceReviewsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('okrs');
  const [selectedContractor, setSelectedContractor] = useState('David Salomon');

  if (!isOpen) return null;

  const okrs = [
    {
      id: 1,
      title: 'Q3 2026: Elevate Scribe Audit Accuracy & EMR Efficiency',
      category: 'Quality & Compliance',
      progress: 78,
      status: 'On Track',
      keyResults: [
        { title: 'Audit 120 clinical charts with >98% accuracy score', current: 95, target: 120, unit: 'charts', progress: 79 },
        { title: 'Reduce documentation discrepancy resolution time to <2 hours', current: 1.8, target: 2.0, unit: 'hours', progress: 90 },
        { title: 'Complete Advanced HIPAA Refresher Certification', current: 1, target: 1, unit: 'cert', progress: 100 },
      ]
    },
    {
      id: 2,
      title: 'Q3 2026: Automation & System Workflow Enhancements',
      category: 'System Development',
      progress: 65,
      status: 'On Track',
      keyResults: [
        { title: 'Deliver 10 new automated HR workflow modals', current: 7, target: 10, unit: 'modals', progress: 70 },
        { title: 'Achieve 100% Time Doctor API auto-reconciliation pass rate', current: 94, target: 100, unit: '%', progress: 94 },
      ]
    }
  ];

  const pastReviews = [
    { period: 'Q2 2026 Review', date: 'Jun 30, 2026', reviewer: 'Yvonne Rickert (COO)', score: 4.8, status: 'Completed', notes: 'Exceeded expectations across all audit metrics. Outstanding commitment to HIPAA standards.' },
    { period: 'Q1 2026 Review', date: 'Mar 31, 2026', reviewer: 'Yvonne Rickert (COO)', score: 4.5, status: 'Completed', notes: 'Strong start to engagement. Consistently accurate chart reviews.' },
    { period: 'Q4 2025 Review', date: 'Dec 28, 2025', reviewer: 'Kevin (Ops Lead)', score: 4.2, status: 'Completed', notes: 'Solid performance in onboarding phase.' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Target size={20} className="icon-blue" />
            <div>
              <h3>Performance Reviews & OKR Goals</h3>
              <p className="subtext">Quarterly Objectives & Performance Evaluations</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Contractor Selector */}
        <div className="form-group" style={{ marginBottom: '16px' }}>
          <label>Contractor Profile</label>
          <select value={selectedContractor} onChange={(e) => setSelectedContractor(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-medium)', width: '100%', fontSize: '13px' }}>
            <option>David Salomon (System Developer)</option>
            <option>Honey Jessa Abapo (Operations)</option>
            <option>Asif Ahmed Abir (Scribe Auditor)</option>
            <option>Andrea Mae Abuan (RAI Specialist)</option>
          </select>
        </div>

        {/* View Mode Tabs */}
        <div className="view-mode-tabs" style={{ marginBottom: '20px' }}>
          <button className={`view-tab ${activeTab === 'okrs' ? 'active' : ''}`} onClick={() => setActiveTab('okrs')}>🎯 Quarterly OKRs (Goals)</button>
          <button className={`view-tab ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>⭐ 360° Reviews & History</button>
        </div>

        {activeTab === 'okrs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '14px', margin: 0 }}>Active Q3 2026 Goals</h4>
              <button className="btn-outline-sm" onClick={() => alert('Add New Objective Wizard launched!')}>
                <Plus size={14} /> Add Objective
              </button>
            </div>

            {okrs.map(okr => (
              <div className="card" key={okr.id} style={{ marginBottom: '16px', borderLeft: '4px solid var(--primary-blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontSize: '11px', background: '#ebf3fb', color: 'var(--primary-blue)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>{okr.category}</span>
                    <h4 style={{ margin: '6px 0 0 0', fontSize: '15px' }}>{okr.title}</h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--primary-blue)' }}>{okr.progress}%</span>
                    <div className="subtext" style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>{okr.status}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ height: '6px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ height: '100%', width: `${okr.progress}%`, background: 'linear-gradient(90deg, #1b6cb8, #3ea635)', borderRadius: '3px' }} />
                </div>

                {/* Key Results */}
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-medium)' }}>Key Results (KRs):</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {okr.keyResults.map((kr, idx) => (
                    <div key={idx} style={{ background: '#f9fafb', padding: '10px 12px', borderRadius: '6px', border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '12px', flex: 1, paddingRight: '12px' }}>
                        <span style={{ fontWeight: 500 }}>{kr.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
                        <span style={{ fontWeight: 600 }}>{kr.current} / {kr.target} {kr.unit}</span>
                        <span style={{ padding: '2px 6px', borderRadius: '4px', background: kr.progress === 100 ? '#dcfce7' : '#eff6ff', color: kr.progress === 100 ? '#15803d' : '#1d4ed8', fontSize: '11px', fontWeight: 700 }}>
                          {kr.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '14px', margin: 0 }}>Past Performance Reviews</h4>
              <button className="btn-primary" onClick={() => alert('New Performance Review Assessment launched!')}>
                + Start New Evaluation
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pastReviews.map((rev, idx) => (
                <div className="card" key={idx} style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div>
                      <strong style={{ fontSize: '15px' }}>{rev.period}</strong>
                      <div className="subtext" style={{ fontSize: '12px' }}>Evaluated on {rev.date} by {rev.reviewer}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#fef3c7', padding: '4px 10px', borderRadius: '12px', border: '1px solid #fcd34d' }}>
                      <Star size={16} fill="#f59e0b" color="#f59e0b" />
                      <strong style={{ fontSize: '14px', color: '#92400e' }}>{rev.score} / 5.0</strong>
                    </div>
                  </div>

                  <div style={{ background: '#f9fafb', padding: '10px 12px', borderRadius: '6px', fontSize: '13px', color: 'var(--text-medium)', fontStyle: 'italic', display: 'flex', gap: '8px' }}>
                    <MessageSquare size={16} className="icon-blue" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>"{rev.notes}"</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-outline" onClick={() => alert('Performance report exported as PDF!')}>Export Performance Report</button>
        </div>
      </div>
    </div>
  );
}
