import React, { useState } from 'react';
import { Upload, X, FileSpreadsheet, CheckCircle2, AlertTriangle, ArrowRight, Table } from 'lucide-react';

export default function BulkImportContractorsModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [importing, setImporting] = useState(false);
  const [importComplete, setImportComplete] = useState(false);

  if (!isOpen) return null;

  const sampleRows = [
    { name: 'Garcia, Maria Elena', email: 'maria.garcia@limitlessly.com', client: 'Renew', role: 'Medical Scribe', startDate: '08/15/2026' },
    { name: 'Chen, David Wei', email: 'david.chen@limitlessly.com', client: 'Lumina Care', role: 'Clinical Documentation Specialist', startDate: '08/20/2026' },
    { name: 'Patel, Priya', email: 'priya.patel@limitlessly.com', client: 'MDS Consulting', role: 'RAI Specialist', startDate: '09/01/2026' },
    { name: 'Johnson, Sarah', email: 'sarah.johnson@limitlessly.com', client: 'CASM Renew Auditors', role: 'Scribe Auditor', startDate: '09/05/2026' },
    { name: 'Reyes, Miguel', email: 'miguel.reyes@limitlessly.com', client: 'Renew', role: 'Scheduler Assistant', startDate: '09/10/2026' },
  ];

  const columnMappings = [
    { csv: 'Full Name', system: 'Contractor Name', status: 'mapped' },
    { csv: 'Email', system: 'Work Email', status: 'mapped' },
    { csv: 'Department', system: 'Client', status: 'mapped' },
    { csv: 'Position', system: 'Job Title', status: 'mapped' },
    { csv: 'Start Date', system: 'Engagement Start Date', status: 'mapped' },
  ];

  const handleFileSelect = () => {
    setFileName('new_contractors_aug2026.csv');
    setStep(2);
  };

  const handleImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportComplete(true);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <FileSpreadsheet size={20} className="icon-blue" />
            <h3>Bulk Import Contractors</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', fontSize: '12px' }}>
          {['Upload File', 'Map Columns', 'Preview & Validate', 'Import'].map((label, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: step > i + 1 ? 'var(--accent-green)' : step === i + 1 ? 'var(--primary-blue)' : 'var(--text-light)',
              fontWeight: step === i + 1 ? 600 : 400
            }}>
              <span style={{
                width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: step > i + 1 ? 'var(--accent-green)' : step === i + 1 ? 'var(--primary-blue)' : '#e5e7eb',
                color: step >= i + 1 ? 'white' : 'var(--text-light)', fontSize: '11px', fontWeight: 700
              }}>
                {step > i + 1 ? '✓' : i + 1}
              </span>
              {label}
              {i < 3 && <ArrowRight size={12} style={{ color: '#d1d5db' }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div style={{ border: '2px dashed var(--border-medium)', borderRadius: 'var(--radius-md)', padding: '48px', textAlign: 'center', cursor: 'pointer' }}
               onClick={handleFileSelect}>
            <Upload size={40} style={{ color: 'var(--primary-blue)', marginBottom: '12px' }} />
            <p style={{ fontWeight: 600, marginBottom: '6px' }}>Drag & drop your CSV/Excel file here</p>
            <p className="subtext">or click to browse. Supported: .csv, .xlsx, .xls</p>
            <button className="btn-outline" style={{ marginTop: '16px' }}>Browse Files</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="card" style={{ background: '#f0fdf4', marginBottom: '16px', padding: '12px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} className="icon-green" />
                <strong>{fileName}</strong> — 5 rows detected
              </div>
            </div>
            <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>Column Mapping</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>CSV Column</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>→</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>System Field</th>
                  <th style={{ padding: '8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {columnMappings.map((m, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '8px' }}>{m.csv}</td>
                    <td style={{ padding: '8px' }}><ArrowRight size={14} /></td>
                    <td style={{ padding: '8px' }}>
                      <select defaultValue={m.system} style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '12px' }}>
                        <option>{m.system}</option>
                      </select>
                    </td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      <span className="status-badge-green">✓ Mapped</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal-actions" style={{ marginTop: '16px' }}>
              <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button className="btn-primary" onClick={() => setStep(3)}>Next: Preview</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '14px' }}>Preview — 5 Contractors to Import</h4>
            <div className="table-responsive">
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)', background: '#f9fafb' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Client</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Role</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Start Date</th>
                    <th style={{ padding: '8px' }}>Validation</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '8px' }}>{row.name}</td>
                      <td style={{ padding: '8px' }}>{row.email}</td>
                      <td style={{ padding: '8px' }}>{row.client}</td>
                      <td style={{ padding: '8px' }}>{row.role}</td>
                      <td style={{ padding: '8px' }}>{row.startDate}</td>
                      <td style={{ padding: '8px', textAlign: 'center' }}>
                        <CheckCircle2 size={14} className="icon-green" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card" style={{ background: '#f0fdf4', marginTop: '12px', padding: '10px 14px', fontSize: '13px' }}>
              <CheckCircle2 size={14} className="icon-green" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              <strong>5 of 5</strong> rows passed validation. Ready to import.
            </div>
            <div className="modal-actions" style={{ marginTop: '16px' }}>
              <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button className="btn-primary" onClick={handleImport}>
                {importing ? 'Importing...' : 'Import 5 Contractors'}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <CheckCircle2 size={56} className="icon-green" style={{ marginBottom: '16px' }} />
            <h3 style={{ marginBottom: '8px' }}>Import Complete!</h3>
            <p className="subtext" style={{ marginBottom: '4px' }}>5 contractors successfully imported.</p>
            <p className="subtext">0 errors, 0 skipped.</p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
              <button className="btn-secondary" onClick={onClose}>Close</button>
              <button className="btn-primary" onClick={() => { setStep(1); setImportComplete(false); setFileName(''); }}>Import More</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
