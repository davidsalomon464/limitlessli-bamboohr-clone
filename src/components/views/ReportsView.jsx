import React, { useState } from 'react';
import { 
  PieChart, 
  Star, 
  Users, 
  TrendingUp, 
  UserPlus, 
  Clock, 
  Plus, 
  ChevronRight, 
  SlidersHorizontal,
  Download,
  Building2,
  HelpCircle
} from 'lucide-react';
import CustomReportBuilderModal from '../modals/CustomReportBuilderModal';

export default function ReportsView({ onOpenClientPortal, onOpenCustomSurvey }) {
  const [activeMenu, setActiveMenu] = useState('favorites');
  const [showBuilderModal, setShowBuilderModal] = useState(false);

  const favoriteReports = [
    { title: 'Headcount', icon: Users, desc: 'Current active contractors by client' },
    { title: 'Turnover', icon: TrendingUp, desc: 'Additions & terminations overview' },
    { title: 'Additions & Terminations', icon: UserPlus, desc: 'Contractor onboarding velocity' },
    { title: 'Time Off Used', icon: Clock, desc: 'Paid & Unpaid NSD consumption' }
  ];

  return (
    <div className="reports-view">
      <div className="reports-top-header">
        <h1 className="page-title">Reports & Analytics</h1>
        <div className="reports-actions">
          <button className="btn-outline" onClick={onOpenCustomSurvey} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <HelpCircle size={16} className="icon-blue" />
            <span>Survey & Intake Builder</span>
          </button>
          <button className="btn-outline" onClick={onOpenClientPortal} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <Building2 size={16} className="icon-blue" />
            <span>Client Accounts Report</span>
          </button>
          <button className="btn-primary" onClick={() => setShowBuilderModal(true)}>
            <Plus size={16} />
            <span>New Custom Report</span>
          </button>
        </div>
      </div>

      <div className="reports-layout-grid">
        {/* Left Side Menu Panel */}
        <div className="card reports-menu-card">
          <h3 className="section-title">Reports Library</h3>
          <div style={{ marginTop: '12px' }}>
            <button 
              className={`reports-menu-item ${activeMenu === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveMenu('favorites')}
            >
              <Star size={16} />
              <span>Favorites</span>
            </button>
            <button 
              className={`reports-menu-item ${activeMenu === 'all' ? 'active' : ''}`}
              onClick={() => setActiveMenu('all')}
            >
              <PieChart size={16} />
              <span>All Reports</span>
            </button>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="card reports-content-card">
          <div className="favorites-header">
            <Star size={18} className="icon-yellow" />
            <h2 className="section-title">Favorite Reports</h2>
          </div>

          <div className="favorites-grid">
            {favoriteReports.map((report, idx) => {
              const IconComp = report.icon;
              return (
                <div key={idx} className="favorite-card" style={{ cursor: 'pointer' }} onClick={() => setShowBuilderModal(true)}>
                  <div className="fav-icon-box">
                    <IconComp size={20} className="icon-blue" />
                  </div>
                  <h3 className="fav-title">{report.title}</h3>
                  <p className="subtext">{report.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="recent-header" style={{ marginTop: '32px' }}>
            <h2 className="section-title">Recent Reports</h2>
          </div>

          <div className="recent-empty-state">
            <PieChart size={48} className="icon-light-gray" style={{ marginBottom: '12px' }} />
            <p className="subtext">You haven't run any custom reports recently.</p>
          </div>
        </div>
      </div>

      <CustomReportBuilderModal 
        isOpen={showBuilderModal} 
        onClose={() => setShowBuilderModal(false)} 
      />
    </div>
  );
}
