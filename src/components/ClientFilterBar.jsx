import React from 'react';
import { Building2, Users, Check, Filter } from 'lucide-react';

export default function ClientFilterBar({ selectedClient, onSelectClient, clientCounts = {} }) {
  const clients = [
    { id: 'all', name: 'All Clients', count: 399 },
    { id: 'Renew', name: 'Renew', count: clientCounts['Renew'] || 120 },
    { id: 'CASM Renew Auditors', name: 'CASM Renew Auditors', count: clientCounts['CASM Renew Auditors'] || 85 },
    { id: 'MDS Consulting Services', name: 'MDS Consulting', count: clientCounts['MDS Consulting Services'] || 65 },
    { id: 'Lumina Care', name: 'Lumina Care', count: clientCounts['Lumina Care'] || 75 },
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: '#ffffff',
      padding: '8px 14px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-light)',
      marginBottom: '16px',
      overflowX: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-medium)', fontSize: '13px', fontWeight: 600, paddingRight: '8px', borderRight: '1px solid var(--border-light)' }}>
        <Building2 size={16} className="icon-blue" />
        <span>Filter by Client:</span>
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        {clients.map(client => {
          const isSelected = selectedClient === client.id;
          return (
            <button
              key={client.id}
              onClick={() => onSelectClient(client.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '12px',
                fontWeight: isSelected ? 600 : 500,
                border: isSelected ? '1px solid var(--primary-blue)' : '1px solid var(--border-medium)',
                background: isSelected ? 'var(--primary-blue-light)' : '#ffffff',
                color: isSelected ? 'var(--primary-blue)' : 'var(--text-dark)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {isSelected && <Check size={12} />}
              <span>{client.name}</span>
              <span style={{
                fontSize: '11px',
                padding: '1px 6px',
                borderRadius: '10px',
                background: isSelected ? 'var(--primary-blue)' : '#f3f4f6',
                color: isSelected ? '#ffffff' : 'var(--text-light)',
                fontWeight: 700
              }}>
                {client.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
