import React from 'react';
import { Globe, Users, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';

export default function GlobalEmploymentView({ onOpenTaxCompliance }) {
  const regions = [
    { country: 'Israel', count: 42, flag: '🇮🇱', status: 'Compliant' },
    { country: 'United States', count: 185, flag: '🇺🇸', status: 'Compliant' },
    { country: 'Philippines', count: 156, flag: '🇵🇭', status: 'Compliant' },
    { country: 'United Kingdom', count: 20, flag: '🇬🇧', status: 'Compliant' }
  ];

  return (
    <div className="global-employment-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="page-title">Global Employment</h1>
        <button className="btn-primary" onClick={onOpenTaxCompliance} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <ShieldCheck size={16} /> Tax & Compliance Center
        </button>
      </div>

      <div className="global-stats-row" style={{ marginTop: '16px' }}>
        <div className="card stat-card">
          <Globe size={24} className="icon-blue" />
          <div className="stat-content">
            <span className="stat-value">4 Regions</span>
            <span className="stat-label">Active Workplaces</span>
          </div>
        </div>

        <div className="card stat-card">
          <Users size={24} className="icon-blue" />
          <div className="stat-content">
            <span className="stat-value">403 Members</span>
            <span className="stat-label">Global Workforce</span>
          </div>
        </div>

        <div className="card stat-card">
          <ShieldCheck size={24} className="icon-green" />
          <div className="stat-content">
            <span className="stat-value">100% Compliant</span>
            <span className="stat-label">Local Labor Laws</span>
          </div>
        </div>
      </div>

      <div className="card region-table-card">
        <div className="card-title">
          <FileCheck size={18} className="icon-blue" />
          <span>Regional Workforce Breakdown</span>
        </div>

        <table className="people-table">
          <thead>
            <tr>
              <th>Country / Region</th>
              <th>Active Employees & Contractors</th>
              <th>Compliance Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {regions.map((reg, idx) => (
              <tr key={idx}>
                <td className="country-cell">
                  <span className="flag-icon">{reg.flag}</span>
                  <strong>{reg.country}</strong>
                </td>
                <td>{reg.count} Active Staff</td>
                <td>
                  <span className="status-badge-green">
                    <CheckCircle2 size={12} />
                    {reg.status}
                  </span>
                </td>
                <td>
                  <button className="btn-outline-sm" onClick={onOpenTaxCompliance}>Manage Agreements</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
