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
  SlidersHorizontal
} from 'lucide-react';
import { initialEmployees } from '../../data/mockData';

export default function PeopleView({ onNewEmployee, globalSearch }) {
  const [viewMode, setViewMode] = useState('list');
  const [employees, setEmployees] = useState(initialEmployees);

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

  return (
    <div className="people-view">
      <div className="people-header">
        <h1 className="page-title">People</h1>
        <a href="#directory" className="quick-access-link">
          <ExternalLink size={14} />
          <span>Quick access to the directory</span>
        </a>
      </div>

      {/* Top Action & View Switcher Row */}
      <div className="people-controls-row">
        <button className="btn-outline" onClick={onNewEmployee}>
          <Plus size={16} />
          <span>New Employee</span>
        </button>

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
              <span>All Employees</span>
              <ChevronDown size={14} />
            </button>

            <div className="employee-count-badge">
              <Users size={14} />
              <span>403</span>
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Showing</span>
            <button className="btn-filter-dropdown">
              <span>Active</span>
              <ChevronDown size={14} />
            </button>
            <button className="icon-btn-border">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Directory List View */}
        {viewMode === 'list' && (
          <div className="table-responsive">
            <table className="people-table">
              <thead>
                <tr>
                  <th>Employee Photo</th>
                  <th>Last Name, First Name</th>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Employment Status</th>
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
                      <a href={`#employee-${emp.id}`}>{emp.name}</a>
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
    </div>
  );
}
