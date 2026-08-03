import React, { useState } from 'react';
import { X, Star, Plus, Grid3X3 } from 'lucide-react';

export default function SkillsMatrixModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const skills = ['Medical Scribing', 'EMR Systems', 'HIPAA Compliance', 'Clinical Auditing', 'Data Entry', 'Communication'];
  const [contractors, setContractors] = useState([
    { name: 'Honey Jessa Abapo', levels: [3, 2, 4, 2, 3, 4] },
    { name: 'Asif Ahmed Abir', levels: [4, 3, 3, 4, 3, 3] },
    { name: 'Andrea Mae Abuan', levels: [2, 4, 4, 4, 2, 3] },
    { name: 'Mary Grace Acabo', levels: [3, 3, 3, 2, 4, 4] },
    { name: 'Kelvin Jaspher Acuba', levels: [1, 2, 2, 1, 4, 3] },
  ]);

  const levelLabels = ['', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const levelColors = ['', '#fee2e2', '#fef9c3', '#dcfce7', '#bbf7d0'];
  const levelTextColors = ['', '#dc2626', '#a16207', '#15803d', '#166534'];

  const cycleLevel = (cIdx, sIdx) => {
    setContractors(prev => prev.map((c, i) => {
      if (i !== cIdx) return c;
      const newLevels = [...c.levels];
      newLevels[sIdx] = (newLevels[sIdx] % 4) + 1;
      return { ...c, levels: newLevels };
    }));
  };

  const avgPerSkill = skills.map((_, sIdx) => {
    const sum = contractors.reduce((a, c) => a + c.levels[sIdx], 0);
    return (sum / contractors.length).toFixed(1);
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Grid3X3 size={20} className="icon-blue" />
            <h3>Skills & Competency Matrix</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid var(--border-light)', minWidth: '160px' }}>Contractor</th>
                {skills.map(s => (
                  <th key={s} style={{ padding: '10px', textAlign: 'center', borderBottom: '2px solid var(--border-light)', fontSize: '11px', minWidth: '100px' }}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contractors.map((c, cIdx) => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '10px', fontWeight: 500 }}>{c.name}</td>
                  {c.levels.map((level, sIdx) => (
                    <td key={sIdx} style={{ padding: '6px', textAlign: 'center' }}>
                      <div
                        onClick={() => cycleLevel(cIdx, sIdx)}
                        style={{
                          cursor: 'pointer', padding: '6px 10px', borderRadius: '6px',
                          background: levelColors[level], color: levelTextColors[level],
                          fontWeight: 600, fontSize: '11px', transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px'
                        }}
                      >
                        {Array.from({ length: level }, (_, i) => (
                          <Star key={i} size={10} fill={levelTextColors[level]} color={levelTextColors[level]} />
                        ))}
                        <span style={{ marginLeft: '4px' }}>{levelLabels[level]}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              {/* Average Row */}
              <tr style={{ background: '#f0f9ff', fontWeight: 600 }}>
                <td style={{ padding: '10px' }}>Team Average</td>
                {avgPerSkill.map((avg, i) => (
                  <td key={i} style={{ padding: '10px', textAlign: 'center', color: 'var(--primary-blue)' }}>{avg}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '11px' }}>
          {[1, 2, 3, 4].map(l => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: levelColors[l] }}></span>
              <span>{levelLabels[l]} ({l})</span>
            </div>
          ))}
        </div>

        <p className="subtext" style={{ marginTop: '10px', fontSize: '11px' }}>Click any cell to cycle through skill levels.</p>

        <div className="modal-actions" style={{ marginTop: '16px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-outline" onClick={() => alert('New skill column added!')}>
            <Plus size={14} /> Add Skill
          </button>
          <button className="btn-primary" onClick={() => alert('Skills matrix saved!')}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
