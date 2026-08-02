import React, { useState } from 'react';
import { PieChart, X, Check, Download } from 'lucide-react';
import { exportToCSV } from '../../utils/exportUtils';
import { initialEmployees } from '../../data/mockData';

export default function CustomReportBuilderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [reportTitle, setReportTitle] = useState('Limitlessli Active Contractor Audit');
  const [selectedFields, setSelectedFields] = useState({
    name: true,
    jobTitle: true,
    department: true,
    status: true,
    hireDate: true
  });
  const [reportGenerated, setReportGenerated] = useState(false);

  const toggleField = (fieldKey) => {
    setSelectedFields(prev => ({ ...prev, [fieldKey]: !prev[fieldKey] }));
  };

  const handleRunReport = (e) => {
    e.preventDefault();
    setReportGenerated(true);
  };

  const handleExport = () => {
    const headers = [];
    if (selectedFields.name) headers.push({ label: 'Contractor Name', key: 'name' });
    if (selectedFields.jobTitle) headers.push({ label: 'Job Title', key: 'jobTitle' });
    if (selectedFields.department) headers.push({ label: 'Client (Department)', key: 'department' });
    if (selectedFields.status) headers.push({ label: 'Status', key: 'status' });
    if (selectedFields.hireDate) headers.push({ label: 'Hire Date', key: 'hireDate' });

    exportToCSV(reportTitle.replace(/\s+/g, '_'), initialEmployees, headers);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <PieChart size={20} className="icon-blue" />
            <h3>Custom Report Builder Wizard</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {!reportGenerated ? (
          <form onSubmit={handleRunReport}>
            <div className="form-group">
              <label>Custom Report Title</label>
              <input type="text" value={reportTitle} onChange={e => setReportTitle(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Select Columns / Fields to Include</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedFields.name} onChange={() => toggleField('name')} />
                  <span>Contractor Name</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedFields.jobTitle} onChange={() => toggleField('jobTitle')} />
                  <span>Job Title</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedFields.department} onChange={() => toggleField('department')} />
                  <span>Client (Department)</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedFields.status} onChange={() => toggleField('status')} />
                  <span>Engagement Status</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={selectedFields.hireDate} onChange={() => toggleField('hireDate')} />
                  <span>Hire Date</span>
                </label>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary">
                <Check size={16} /> Run Custom Report
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 className="section-title">{reportTitle} (Live Output)</h4>
              <button className="btn-success" onClick={handleExport}>
                <Download size={14} /> Export Report (CSV)
              </button>
            </div>

            <div className="table-responsive">
              <table className="people-table">
                <thead>
                  <tr>
                    {selectedFields.name && <th>Contractor Name</th>}
                    {selectedFields.jobTitle && <th>Job Title</th>}
                    {selectedFields.department && <th>Client</th>}
                    {selectedFields.status && <th>Status</th>}
                    {selectedFields.hireDate && <th>Hire Date</th>}
                  </tr>
                </thead>
                <tbody>
                  {initialEmployees.map((emp) => (
                    <tr key={emp.id}>
                      {selectedFields.name && <td><strong>{emp.name}</strong></td>}
                      {selectedFields.jobTitle && <td>{emp.jobTitle}</td>}
                      {selectedFields.department && <td>{emp.department}</td>}
                      {selectedFields.status && <td>{emp.status}</td>}
                      {selectedFields.hireDate && <td>{emp.hireDate}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setReportGenerated(false)}>Edit Fields</button>
              <button className="btn-primary" onClick={onClose}>Done</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
