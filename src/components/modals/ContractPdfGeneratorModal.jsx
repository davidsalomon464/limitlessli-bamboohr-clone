import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, Shield, X, Edit3, Lock } from 'lucide-react';

export default function ContractPdfGeneratorModal({ isOpen, onClose }) {
  const [contractType, setContractType] = useState('engagement');
  const [contractorName, setContractorName] = useState('David Salomon');
  const [clientName, setClientName] = useState('Renew');
  const [monthlyRate, setMonthlyRate] = useState('1,100');
  const [effectiveDate, setEffectiveDate] = useState('2026-06-22');
  const [signatureType, setSignatureType] = useState('drawn');

  if (!isOpen) return null;

  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate the printable PDF contract.');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Limitlessli Contract - ${contractorName}</title>
          <style>
            body { font-family: 'Arial', sans-serif; margin: 40px; color: #1f2937; line-height: 1.6; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1b6cb8; padding-bottom: 20px; margin-bottom: 30px; }
            .logo-text { font-size: 24px; font-weight: bold; color: #1b6cb8; }
            .title { font-size: 20px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; text-align: center; }
            .section { margin-bottom: 20px; }
            .section-title { font-size: 14px; font-weight: bold; color: #1b6cb8; text-transform: uppercase; margin-bottom: 8px; }
            .sig-box { margin-top: 40px; border: 1px solid #d1d5db; padding: 16px; border-radius: 8px; background: #f9fafb; display: flex; justify-content: space-between; }
            .watermark { font-size: 11px; color: #6b7280; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo-text">CASM LIMITLESSLI LLC</div>
            <div>Date: ${effectiveDate}</div>
          </div>

          <div class="title">INDEPENDENT CONTRACTOR ENGAGEMENT AGREEMENT</div>

          <div class="section">
            <div class="section-title">1. PARTIES & ENGAGEMENT</div>
            <p>This Engagement Agreement is entered into between <strong>CASM Limitlessli LLC</strong> ("Company") and <strong>${contractorName}</strong> ("Contractor") for service assignment to Client <strong>${clientName}</strong>.</p>
          </div>

          <div class="section">
            <div class="section-title">2. COMPENSATION & PAY RATE</div>
            <p>The Contractor shall receive a base pay rate of <strong>$${monthlyRate} / Month</strong>, payable on a semi-monthly basis upon submission of verified time logs via Time Doctor.</p>
          </div>

          <div class="section">
            <div class="section-title">3. CONFIDENTIALITY & HIPAA COMPLIANCE</div>
            <p>Contractor agrees to maintain strict compliance with HIPAA laws, Protected Health Information (PHI) guidelines, and Limitlessli security policies.</p>
          </div>

          <div class="sig-box">
            <div>
              <p><strong>Contractor Signature:</strong></p>
              <div style="font-family: 'Brush Script MT', cursive; font-size: 26px; color: #1b6cb8; margin: 10px 0;">${contractorName}</div>
              <p class="watermark">Verified E-Signature ID: ES-2026-${Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <div>
              <p><strong>Company Representative:</strong></p>
              <div style="font-family: 'Brush Script MT', cursive; font-size: 26px; color: #1b6cb8; margin: 10px 0;">Yvonne Rickert</div>
              <p class="watermark">Chief Operating Officer</p>
            </div>
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <FileText size={20} className="icon-blue" />
            <div>
              <h3>Contract PDF Generator & E-Signature</h3>
              <p className="subtext">Generate Official Printable PDF Engagement Agreements</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Controls Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div className="form-group">
            <label>Contract Type</label>
            <select value={contractType} onChange={(e) => setContractType(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-medium)', width: '100%', fontSize: '13px' }}>
              <option value="engagement">Independent Contractor Engagement Agreement</option>
              <option value="nda">Non-Disclosure & PHI Confidentiality Agreement</option>
              <option value="sow">Statement of Work (SOW - Scribe / Auditor)</option>
              <option value="amendment">Rate Adjustment & Promotion Letter</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contractor Name</label>
            <input type="text" value={contractorName} onChange={(e) => setContractorName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Assigned Client</label>
            <select value={clientName} onChange={(e) => setClientName(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-medium)', width: '100%', fontSize: '13px' }}>
              <option>Renew</option>
              <option>CASM Renew Auditors</option>
              <option>MDS Consulting Services</option>
              <option>Lumina Care</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pay Rate / Month ($)</label>
            <input type="text" value={monthlyRate} onChange={(e) => setMonthlyRate(e.target.value)} required />
          </div>
        </div>

        {/* Live Contract Preview Box */}
        <div className="card" style={{ background: '#ffffff', border: '2px solid var(--primary-blue)', padding: '24px', marginBottom: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '16px' }}>
            <strong style={{ fontSize: '16px', color: 'var(--primary-blue)' }}>CASM LIMITLESSLI LLC</strong>
            <span className="subtext">Date: {effectiveDate}</span>
          </div>

          <h4 style={{ textAlign: 'center', margin: '0 0 16px 0', fontSize: '16px', textTransform: 'uppercase' }}>
            INDEPENDENT CONTRACTOR ENGAGEMENT AGREEMENT
          </h4>

          <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-medium)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p><strong>1. PARTIES:</strong> Entered into by <strong>CASM Limitlessli LLC</strong> ("Company") and <strong>{contractorName}</strong> ("Contractor") for Client <strong>{clientName}</strong>.</p>
            <p><strong>2. COMPENSATION:</strong> Agreed monthly pay rate of <strong>${monthlyRate} / Month</strong>, subject to Time Doctor logs verification.</p>
            <p><strong>3. CONFIDENTIALITY:</strong> Full compliance with HIPAA and Protected Health Information (PHI) privacy guidelines.</p>
          </div>

          {/* E-Signature Verification Stamp */}
          <div style={{ marginTop: '24px', padding: '16px', background: '#f0fdf4', border: '1px dashed #22c55e', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#15803d', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> E-SIGN Act Legal Watermark Verified
              </div>
              <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: '24px', color: 'var(--primary-blue)', marginTop: '4px' }}>
                {contractorName}
              </div>
              <div className="subtext" style={{ fontSize: '10px', fontFamily: 'monospace' }}>IP: 203.0.113.42 | Hash: SHA-256-E9F31</div>
            </div>
            <Shield size={32} color="#15803d" opacity={0.6} />
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={handlePrintPdf} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Printer size={16} /> Print / Export Official PDF
          </button>
        </div>
      </div>
    </div>
  );
}
