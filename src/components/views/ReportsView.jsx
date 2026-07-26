import React, { useState } from 'react';
import { 
  Plus, 
  FolderPlus, 
  History, 
  BarChart2, 
  Award, 
  FileCheck2, 
  PieChart, 
  Calendar, 
  LineChart, 
  Star 
} from 'lucide-react';
import NewReportModal from '../modals/NewReportModal';

export default function ReportsView() {
  const [activeSubTab, setActiveSubTab] = useState('recent');
  const [showNewReport, setShowNewReport] = useState(false);
  const [activeReportTitle, setActiveReportTitle] = useState(null);

  const subMenu = [
    { id: 'recent', label: 'Recent', icon: History },
    { id: 'standard', label: 'Standard Reports', icon: BarChart2 },
    { id: 'benchmarks', label: 'Benchmarks', icon: Award },
    { id: 'custom', label: 'Custom Reports', icon: PieChart },
    { id: 'signed', label: 'Signed Documents', icon: FileCheck2 }
  ];

  const favorites = [
    { id: 1, title: 'Headcount', icon: BarChart2 },
    { id: 2, title: 'Employee Turnover', icon: BarChart2 },
    { id: 3, title: 'Additions Terminations', icon: LineChart },
    { id: 4, title: 'Time Off Used', icon: Calendar }
  ];

  return (
    <div className="reports-view">
      <div className="reports-top-header">
        <h1 className="page-title">Reports</h1>
        <div className="reports-actions">
          <button className="btn-outline" onClick={() => setShowNewReport(true)}>
            <Plus size={16} />
            <span>New Report</span>
          </button>
          <button className="icon-btn-border" title="New Folder" onClick={() => alert('New Report Folder created')}>
            <FolderPlus size={16} />
          </button>
        </div>
      </div>

      <div className="reports-layout-grid">
        {/* Left Reports Submenu */}
        <div className="reports-submenu card">
          {subMenu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`reports-menu-item ${activeSubTab === item.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveSubTab(item.id);
                  setActiveReportTitle(null);
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Main Reports Content */}
        <div className="reports-main-content">
          {/* Favorites Cards Row */}
          <div className="favorites-section">
            <div className="favorites-header">
              <Star size={16} className="icon-yellow" />
              <h3>Favorites</h3>
            </div>

            <div className="favorites-grid">
              {favorites.map((fav) => {
                const FavIcon = fav.icon;
                return (
                  <div 
                    key={fav.id} 
                    className={`favorite-card ${activeReportTitle === fav.title ? 'active-fav' : ''}`}
                    onClick={() => setActiveReportTitle(fav.title)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="fav-icon-box">
                      <FavIcon size={20} className="icon-blue" />
                    </div>
                    <span className="fav-title">{fav.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Report Preview Panel */}
          {activeReportTitle ? (
            <div className="card report-preview-card">
              <h2 className="section-title">Report: {activeReportTitle}</h2>
              <p className="subtext">Generated live for Limitlessli workforce as of 2026.</p>
              
              <div className="report-data-box">
                <table className="people-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Q1 2026</th>
                      <th>Q2 2026</th>
                      <th>Current YTD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Active Workforce</td>
                      <td>337</td>
                      <td>370</td>
                      <td><strong>399</strong></td>
                    </tr>
                    <tr>
                      <td>Net Retention Rate</td>
                      <td>98.2%</td>
                      <td>99.1%</td>
                      <td><strong>98.6%</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="card recent-reports-card">
              <div className="recent-header">
                <History size={16} className="icon-gray" />
                <h3>Recent</h3>
              </div>

              <div className="recent-empty-state">
                <div className="pie-chart-illustration">
                  <PieChart size={64} className="icon-light-gray" />
                </div>
                <p className="empty-text">Recently viewed reports will appear here. Click any Favorite card above to run a report live.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <NewReportModal 
        isOpen={showNewReport} 
        onClose={() => setShowNewReport(false)} 
      />
    </div>
  );
}
