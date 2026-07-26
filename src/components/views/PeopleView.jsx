import React, { useState } from 'react';
import { 
  Plus, 
  List, 
  Grid, 
  Network, 
  ChevronDown, 
  MoreHorizontal, 
  Users, 
  ExternalLink,
  SlidersHorizontal,
  Layers,
  Download
} from 'lucide-react';
import { initialEmployees } from '../../data/mockData';
import NewContractorWizard from '../modals/NewContractorWizard';
import PowerEditModal from '../modals/PowerEditModal';
import { exportToCSV } from '../../utils/exportUtils';

export default function PeopleView({ globalSearch }) {
  const [viewMode, setViewMode] = useState('list');
  const [employees, setEmployees] = useState(initialEmployees);
  const [showWizard, setShowWizard] = useState(false);
  const [showPowerEdit, setShowPowerEdit] = useState(false);

  const filteredEmployees = employees.filter(emp => {
    if (!globalSearch) return true;
    const query = globalSearch.toLowerCase();
    return (
      emp.name.toLowerCase().includes(query) ||
      emp.jobTitle.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query) ||
      emp.status.toLowerCase().includes(query)
    );
  });

  const handleExportCSV = () => {
    const headers = [
      { label: 'Contractor Name', key: 'name' },
      { label: 'Job Title', key: 'jobTitle' },
      { label: 'Client / Department', key: 'department' },
      { label: 'Engagement Status', key: 'status' },
      { label: 'Hire Date', key: 'hireDate' }
    ];
    exportToCSV('Limitlessli_Contractors_Directory', filteredEmployees, headers);
  };

  return (
    <div className="people-view">
      <div className="people-header">
        <h1 className="page-title">People (Contractors)</h1>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="btn-outline-sm" onClick={handleExportCSV} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Download size={14} /> Export Directory (CSV)
          </button>
          <a href="#directory" className="quick-access-link">
            <ExternalLink size={14} />
            <span>Quick access to directory</span>
          </a>
        </div>
      </div>

      {/* Top Action & View Switcher Row */}
      <div className="people-controls-row">
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-outline" onClick={() => setShowWizard(true)}>
            <Plus size={16} />
            <span>New Contractor</span>
          </button>

          <button className="btn-secondary" onClick={() => setShowPowerEdit(true)}>
            <Layers size={16} />
            <span>Power Edit Contractors</span>
          </button>
        </div>

        <div className="view-mode-tabs">
          <button 
            className={`view-tab ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
            <span>List</span>
          </button>
          <button 
            className={`view-tab ${viewMode === 'directory' ? 'active' : ''}`}
            onClick={() => setViewMode('directory')}
          >
            <Grid size={16} />
            <span>Directory</span>
          </button>
          <button 
            className={`view-tab ${viewMode === 'org' ? 'active' : ''}`}
            onClick={() => setViewMode('org')}
          >
            <Network size={16} />
            <span>Org Chart</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card table-card">
        {/* Filters Bar */}
        <div className="table-filter-bar">
          <div className="filter-group">
            <button className="btn-filter-dropdown">
              <SlidersHorizontal size={14} />
              <span>All Contractors</span>
              <ChevronDown size={14} />
            </button>

            <div className="employee-count-badge">
              <Users size={14} />
              <span>403 Contractors</span>
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Showing</span>
            <button className="btn-filter-dropdown">
              <span>Active</span>
              <ChevronDown size={14} />
            </button>
            <button className="icon-btn-border" onClick={handleExportCSV} title="Export CSV">
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Directory List View */}
        {viewMode === 'list' && (
          <div className="table-responsive">
            <table className="people-table">
              <thead>
                <tr>
                  <th>Contractor Photo</th>
                  <th>Last Name, First Name</th>
                  <th>Job Title</th>
                  <th>Client (Department)</th>
                  <th>Engagement Status</th>
                  <th>Hire Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <img src={emp.photo} alt={emp.name} className="employee-row-photo" />
                    </td>
                    <td className="emp-name-cell">
                      <a href={`#contractor-${emp.id}`}>{emp.name}</a>
                    </td>
                    <td>{emp.jobTitle}</td>
                    <td>{emp.department}</td>
                    <td>{emp.status}</td>
                    <td>{emp.hireDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Directory Grid View */}
        {viewMode === 'directory' && (
          <div className="directory-grid">
            {filteredEmployees.map((emp) => (
              <div key={emp.id} className="directory-card">
                <img src={emp.photo} alt={emp.name} className="dir-photo" />
                <h3 className="dir-name">{emp.name}</h3>
                <p className="dir-title">{emp.jobTitle}</p>
                <span className="dir-dept">{emp.department}</span>
                <span className="dir-status-badge">{emp.status}</span>
              </div>
            ))}
          </div>
        )}

        {/* Org Chart View */}
        {viewMode === 'org' && (
          <div className="org-chart-view">
            <div className="org-node root">
              <div className="node-card">
                <strong>Yvonne Rickert</strong>
                <span>Chief Operating Officer</span>
              </div>
              <div className="org-children">
                {filteredEmployees.slice(0, 4).map(emp => (
                  <div key={emp.id} className="node-card child">
                    <strong>{emp.name}</strong>
                    <span>{emp.jobTitle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <NewContractorWizard 
        isOpen={showWizard} 
        onClose={() => setShowWizard(false)} 
      />

      <PowerEditModal 
        isOpen={showPowerEdit} 
        onClose={() => setShowPowerEdit(false)} 
      />
    </div>
  );
}
