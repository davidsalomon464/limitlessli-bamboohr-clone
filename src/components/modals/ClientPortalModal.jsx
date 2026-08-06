import React, { useState } from 'react';
import { Building2, Users, DollarSign, FileText, CheckCircle2, Shield, X, Mail, ChevronRight } from 'lucide-react';

export default function ClientPortalModal({ isOpen, onClose }) {
  const [selectedClient, setSelectedClient] = useState('Renew');

  if (!isOpen) return null;

  const clientDetails = {
    'Renew': {
      name: 'Renew Health Services',
      contractorsCount: 120,
      leadManager: 'Yvonne Rickert',
      billingRate: '$32.50 / hr',
      status: 'Active Client',
      serviceAgreement: 'Scribe & Audit Operations Agreement 2025-2027',
      primaryContact: 'operations@renewhealth.com',
      locationsServed: ['California', 'Texas', 'Florida']
    },
    'CASM Renew Auditors': {
      name: 'CASM Renew Audit Division',
      contractorsCount: 85,
      leadManager: 'Kevin (Ops Lead)',
      billingRate: '$38.00 / hr',
      status: 'Active Client',
      serviceAgreement: 'Clinical Audit & Quality Control SOW',
      primaryContact: 'audit@casmrenew.com',
      locationsServed: ['New York', 'Illinois']
    },
    'MDS Consulting Services': {
      name: 'MDS Healthcare Consulting',
      contractorsCount: 65,
      leadManager: 'Andrea Mae Abuan',
      billingRate: '$35.00 / hr',
      status: 'Active Client',
      serviceAgreement: 'RAI & MDS Specialist Staffing Agreement',
      primaryContact: 'contact@mdsconsulting.org',
      locationsServed: ['Ohio', 'Pennsylvania']
    },
    'Lumina Care': {
      name: 'Lumina Care Partners',
      contractorsCount: 75,
      leadManager: 'Agie Santos',
      billingRate: '$30.00 / hr',
      status: 'Active Client',
      serviceAgreement: 'Clinical Documentation & Scheduling SOW',
      primaryContact: 'hr@luminacare.com',
      locationsServed: ['North Carolina', 'Georgia']
    }
  };

  const current = clientDetails[selectedClient] || clientDetails['Renew'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Building2 size={20} className="icon-blue" />
            <div>
              <h3>Client Portal & Account Management</h3>
              <p className="subtext">Manage Client Agreements & Dedicated Contractor Roster</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Client Selector Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
          {Object.keys(clientDetails).map(clientKey => {
            const isSelected = selectedClient === clientKey;
            return (
              <div
                key={clientKey}
                onClick={() => setSelectedClient(clientKey)}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  border: isSelected ? '2px solid var(--primary-blue)' : '1px solid var(--border-light)',
                  background: isSelected ? 'var(--primary-blue-light)' : '#f9fafb',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <strong style={{ fontSize: '13px', color: isSelected ? 'var(--primary-blue)' : 'var(--text-dark)', display: 'block' }}>{clientKey}</strong>
                <span className="subtext" style={{ fontSize: '11px' }}>{clientDetails[clientKey].contractorsCount} Contractors</span>
              </div>
            );
          })}
        </div>

        {/* Client Overview Card */}
        <div className="card" style={{ padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px' }}>{current.name}</h3>
              <span className="status-badge-green" style={{ marginTop: '4px', display: 'inline-block' }}>✓ {current.status}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--primary-blue)' }}>{current.contractorsCount}</div>
              <div className="subtext" style={{ fontSize: '12px' }}>Assigned Contractors</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '13px' }}>
            <div>
              <div className="subtext">Account Lead Manager</div>
              <strong>{current.leadManager}</strong>
            </div>
            <div>
              <div className="subtext">Client Billing Rate</div>
              <strong>{current.billingRate}</strong>
            </div>
            <div>
              <div className="subtext">Active Service Agreement</div>
              <strong>{current.serviceAgreement}</strong>
            </div>
            <div>
              <div className="subtext">Primary Client Email</div>
              <a href={`mailto:${current.primaryContact}`}>{current.primaryContact}</a>
            </div>
          </div>
        </div>

        {/* Locations Covered */}
        <div className="card" style={{ padding: '16px', background: '#f9fafb' }}>
          <h4 style={{ fontSize: '14px', margin: '0 0 8px 0' }}>Locations & Divisions Covered</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            {current.locationsServed.map((loc, idx) => (
              <span key={idx} style={{ padding: '4px 10px', borderRadius: '12px', background: '#ffffff', border: '1px solid var(--border-medium)', fontSize: '12px', fontWeight: 500 }}>
                📍 {loc}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-outline" onClick={() => alert(`Exporting dedicated contractor roster for ${current.name}...`)}>
            <FileText size={14} /> Export Client Roster
          </button>
          <button className="btn-primary" onClick={() => alert(`Client settings saved for ${current.name}`)}>Save Client Settings</button>
        </div>
      </div>
    </div>
  );
}
