import React, { useState } from 'react';
import { DollarSign, Printer, Download, CheckCircle2, Shield, X, Calendar, CreditCard, Building } from 'lucide-react';

export default function PayStubPdfModal({ isOpen, onClose }) {
  const [selectedContractor, setSelectedContractor] = useState('David Salomon');
  const [payPeriod, setPayPeriod] = useState('Jul 1 – Jul 31, 2026');
  const [basePay, setBasePay] = useState('1,100.00');
  const [bonus, setBonus] = useState('150.00');
  const [nsdDeduction, setNsdDeduction] = useState('0.00');
  const [clairAdvance, setClairAdvance] = useState('50.00');

  if (!isOpen) return null;

  const netPay = (
    parseFloat(basePay.replace(',', '')) +
    parseFloat(bonus) -
    parseFloat(nsdDeduction) -
    parseFloat(clairAdvance)
  ).toFixed(2);

  const handlePrintPayStub = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate the printable Pay Stub PDF.');
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Limitlessli Pay Stub - ${selectedContractor} (${payPeriod})</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 40px; color: #1f2937; line-height: 1.5; }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #1b6cb8; padding-bottom: 16px; margin-bottom: 24px; }
            .company-name { font-size: 22px; font-weight: bold; color: #1b6cb8; }
            .stub-title { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f9fafb; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 24px; font-size: 13px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
            th { background: #ebf3fb; color: #1b6cb8; text-align: left; padding: 10px; border-bottom: 2px solid #1b6cb8; }
            td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
            .net-pay-box { background: #f0fdf4; border: 2px solid #22c55e; padding: 16px; border-radius: 8px; text-align: right; font-size: 18px; font-weight: bold; color: #15803d; }
            .footer-note { margin-top: 30px; font-size: 11px; color: #6b7280; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="company-name">CASM LIMITLESSLI LLC</div>
              <div style="font-size: 12px; color: #6b7280;">Global Contractor Payroll Services</div>
            </div>
            <div style="text-align: right; font-size: 13px;">
              <div><strong>Pay Date:</strong> Aug 5, 2026</div>
              <div><strong>Pay Period:</strong> ${payPeriod}</div>
            </div>
          </div>

          <div class="stub-title">OFFICIAL CONTRACTOR PAY STUB STATEMENT</div>

          <div class="info-grid">
            <div>
              <div><strong>Contractor Name:</strong> ${selectedContractor}</div>
              <div><strong>Role:</strong> System Developer (Intern)</div>
              <div><strong>Client Assignment:</strong> Renew</div>
            </div>
            <div>
              <div><strong>Work Email:</strong> DSalomon@limitlessli.net</div>
              <div><strong>Payment Method:</strong> Bank Direct Deposit (IBAN Verified)</div>
              <div><strong>Time Doctor Status:</strong> Reconciled (168 hrs)</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th style="text-align: right;">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monthly Base Pay Rate</td>
                <td>Earnings</td>
                <td style="text-align: right;">$${basePay}</td>
              </tr>
              <tr>
                <td>Q2 Performance Milestone Bonus</td>
                <td>Earnings</td>
                <td style="text-align: right;">+$${bonus}</td>
              </tr>
              <tr>
                <td>NSD Unpaid Leave Deduction</td>
                <td>Deductions</td>
                <td style="text-align: right;">-$${nsdDeduction}</td>
              </tr>
              <tr>
                <td>Clair On-Demand Pay Early Advance</td>
                <td>Deductions</td>
                <td style="text-align: right;">-$${clairAdvance}</td>
              </tr>
            </tbody>
          </table>

          <div class="net-pay-box">
            TOTAL NET PAYOUT: $${netPay} USD
          </div>

          <div class="footer-note">
            Confidential Payroll Document • CASM Limitlessli LLC • Generated automatically via Limitlessli HR Platform
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
            <DollarSign size={20} className="icon-blue" />
            <div>
              <h3>Pay Stub Generator & Statement</h3>
              <p className="subtext">Generate Official Printable Pay Stubs for Contractors</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Selection Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div className="form-group">
            <label>Contractor Name</label>
            <select value={selectedContractor} onChange={(e) => setSelectedContractor(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-medium)', width: '100%', fontSize: '13px' }}>
              <option>David Salomon (System Developer)</option>
              <option>Honey Jessa Abapo (Operations)</option>
              <option>Asif Ahmed Abir (Scribe Auditor)</option>
              <option>Andrea Mae Abuan (RAI Specialist)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Pay Period</label>
            <select value={payPeriod} onChange={(e) => setPayPeriod(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-medium)', width: '100%', fontSize: '13px' }}>
              <option>Jul 1 – Jul 31, 2026</option>
              <option>Jun 1 – Jun 30, 2026</option>
              <option>May 1 – May 31, 2026</option>
            </select>
          </div>
        </div>

        {/* Earnings & Deductions Adjusters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div className="form-group">
            <label>Base Pay ($)</label>
            <input type="text" value={basePay} onChange={(e) => setBasePay(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Bonus ($)</label>
            <input type="text" value={bonus} onChange={(e) => setBonus(e.target.value)} />
          </div>

          <div className="form-group">
            <label>NSD Deduction ($)</label>
            <input type="text" value={nsdDeduction} onChange={(e) => setNsdDeduction(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Clair Advance ($)</label>
            <input type="text" value={clairAdvance} onChange={(e) => setClairAdvance(e.target.value)} />
          </div>
        </div>

        {/* Live Statement Card Preview */}
        <div className="card" style={{ background: '#ffffff', border: '2px solid var(--primary-blue)', padding: '24px', marginBottom: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--primary-blue)', paddingBottom: '12px', marginBottom: '16px' }}>
            <div>
              <strong style={{ fontSize: '18px', color: 'var(--primary-blue)' }}>CASM LIMITLESSLI LLC</strong>
              <div className="subtext" style={{ fontSize: '12px' }}>Global Contractor Payroll Statement</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '13px' }}>
              <div><strong>Pay Period:</strong> {payPeriod}</div>
              <div className="subtext">Pay Date: Aug 5, 2026</div>
            </div>
          </div>

          <div style={{ background: '#f9fafb', padding: '12px 16px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <div><strong>Contractor:</strong> {selectedContractor}</div>
              <div><strong>Client Assignment:</strong> Renew</div>
            </div>
            <div>
              <div><strong>Payment Routing:</strong> Direct Deposit (IBAN Verified)</div>
              <div><strong>Time Doctor Logs:</strong> 168 hrs (Reconciled)</div>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '16px' }}>
            <thead>
              <tr style={{ background: '#ebf3fb', color: 'var(--primary-blue)' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Item Description</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Type</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '8px' }}>Monthly Base Pay Rate</td>
                <td style={{ padding: '8px' }}>Earnings</td>
                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600 }}>${basePay}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '8px' }}>Performance Milestone Bonus</td>
                <td style={{ padding: '8px' }}>Earnings</td>
                <td style={{ padding: '8px', textAlign: 'right', color: '#16a34a', fontWeight: 600 }}>+${bonus}</td>
              </tr>
              {parseFloat(nsdDeduction) > 0 && (
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '8px' }}>NSD Leave Deduction</td>
                  <td style={{ padding: '8px' }}>Deductions</td>
                  <td style={{ padding: '8px', textAlign: 'right', color: '#dc2626', fontWeight: 600 }}>-${nsdDeduction}</td>
                </tr>
              )}
              {parseFloat(clairAdvance) > 0 && (
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '8px' }}>Clair On-Demand Pay Early Advance</td>
                  <td style={{ padding: '8px' }}>Deductions</td>
                  <td style={{ padding: '8px', textAlign: 'right', color: '#dc2626', fontWeight: 600 }}>-${clairAdvance}</td>
                </tr>
              )}
            </tbody>
          </table>

          <div style={{ background: '#f0fdf4', border: '2px solid #22c55e', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#15803d' }}>Total Net Payable:</span>
            <span style={{ fontSize: '22px', fontWeight: 800, color: '#15803d' }}>${netPay} USD</span>
          </div>
        </div>

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={handlePrintPayStub} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Printer size={16} /> Print / Export Pay Stub PDF
          </button>
        </div>
      </div>
    </div>
  );
}
