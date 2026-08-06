import React, { useState } from 'react';
import { DollarSign, TrendingUp, BarChart2, ShieldAlert, CheckCircle2, Download, X, Layers, Building } from 'lucide-react';

export default function SalaryBenchmarkingModal({ isOpen, onClose }) {
  const [selectedRole, setSelectedRole] = useState('Scribe Auditor');
  const [selectedRegion, setSelectedRegion] = useState('ph');

  if (!isOpen) return null;

  const benchmarkData = {
    'Scribe Auditor': {
      ph: { min: 650, mid: 950, max: 1300, currentAvg: 920, marketAvg: 900, status: 'Competitive' },
      us: { min: 2800, mid: 3400, max: 4200, currentAvg: 3350, marketAvg: 3300, status: 'Competitive' },
      il: { min: 1100, mid: 1450, max: 1800, currentAvg: 1400, marketAvg: 1450, status: 'Competitive' }
    },
    'Clinical Documentation Specialist': {
      ph: { min: 700, mid: 1000, max: 1400, currentAvg: 980, marketAvg: 950, status: 'Competitive' },
      us: { min: 3000, mid: 3600, max: 4500, currentAvg: 3550, marketAvg: 3500, status: 'Competitive' },
      il: { min: 1200, mid: 1550, max: 1900, currentAvg: 1500, marketAvg: 1500, status: 'Competitive' }
    },
    'RAI Specialist': {
      ph: { min: 750, mid: 1100, max: 1500, currentAvg: 1080, marketAvg: 1050, status: 'Above Market' },
      us: { min: 3200, mid: 3800, max: 4800, currentAvg: 3750, marketAvg: 3700, status: 'Competitive' },
      il: { min: 1300, mid: 1650, max: 2000, currentAvg: 1600, marketAvg: 1600, status: 'Competitive' }
    }
  };

  const currentRoleData = (benchmarkData[selectedRole] && benchmarkData[selectedRole][selectedRegion]) 
    ? benchmarkData[selectedRole][selectedRegion] 
    : benchmarkData['Scribe Auditor']['ph'];

  const pctOfMid = Math.round((currentRoleData.currentAvg / currentRoleData.mid) * 100);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <DollarSign size={20} className="icon-blue" />
            <div>
              <h3>Salary Benchmarking & Pay Band Calculator</h3>
              <p className="subtext">Compare Contractor Monthly Pay Rates Against Global Market Medians</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Selection Filters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div className="form-group">
            <label>Select Job Role</label>
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-medium)', width: '100%', fontSize: '13px' }}>
              <option>Scribe Auditor</option>
              <option>Clinical Documentation Specialist</option>
              <option>RAI Specialist</option>
            </select>
          </div>

          <div className="form-group">
            <label>Geographic Region</label>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-medium)', width: '100%', fontSize: '13px' }}>
              <option value="ph">🇵🇭 Philippines</option>
              <option value="us">🇺🇸 United States</option>
              <option value="il">🇮🇱 Israel</option>
            </select>
          </div>
        </div>

        {/* Benchmark Visual Card */}
        <div className="card" style={{ background: '#ffffff', border: '2px solid var(--primary-blue)', padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '16px' }}>{selectedRole} — Salary Band Analysis</h4>
              <span className="subtext" style={{ fontSize: '12px' }}>Limitlessli Avg: <strong>${currentRoleData.currentAvg} / mo</strong> vs Market Median: <strong>${currentRoleData.marketAvg} / mo</strong></span>
            </div>
            <span className="status-badge-green" style={{ fontSize: '12px' }}>✓ {currentRoleData.status} ({pctOfMid}% of Midpoint)</span>
          </div>

          {/* Min / Mid / Max Range Bar */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
              <span>Min: ${currentRoleData.min}</span>
              <span>Midpoint: ${currentRoleData.mid}</span>
              <span>Max: ${currentRoleData.max}</span>
            </div>

            <div style={{ height: '10px', background: '#e5e7eb', borderRadius: '5px', overflow: 'hidden', position: 'relative' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(Math.max(((currentRoleData.currentAvg - currentRoleData.min) / (currentRoleData.max - currentRoleData.min)) * 100, 5), 100)}%`,
                background: 'linear-gradient(90deg, #1b6cb8, #3ea635)',
                borderRadius: '5px'
              }} />
            </div>
          </div>
        </div>

        {/* Metric Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#f0fdf4' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#15803d' }}>+3.2%</div>
            <div className="subtext">Above Industry Median</div>
          </div>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#eff6ff' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#1d4ed8' }}>0 Disparities</div>
            <div className="subtext">Pay Equity Status</div>
          </div>
          <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#fef3c7' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#b45309' }}>96%</div>
            <div className="subtext">Compa-Ratio Index</div>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => alert('Salary benchmarking report exported to CSV!')}>
            <Download size={14} /> Export Benchmarking Report
          </button>
        </div>
      </div>
    </div>
  );
}
