import React, { useState } from 'react';
import { Plus, Download, DollarSign, Award, MoreHorizontal } from 'lucide-react';
import AddPayBandModal from '../modals/AddPayBandModal';

export default function CompensationView() {
  const [activeTab, setActiveTab] = useState('pay-grades');
  const [showAddBand, setShowAddBand] = useState(false);

  return (
    <div className="compensation-view">
      <h1 className="page-title">Compensation</h1>

      {/* Sub Tabs Row */}
      <div className="comp-tabs-header">
        <button 
          className={`comp-tab ${activeTab === 'pay-grades' ? 'active' : ''}`}
          onClick={() => setActiveTab('pay-grades')}
        >
          <DollarSign size={16} />
          <span>Pay Grades & Bands</span>
        </button>

        <button 
          className={`comp-tab ${activeTab === 'total-rewards' ? 'active' : ''}`}
          onClick={() => setActiveTab('total-rewards')}
        >
          <Award size={16} />
          <span>Total Rewards</span>
        </button>

        <button 
          className={`comp-tab ${activeTab === 'more' ? 'active' : ''}`}
          onClick={() => setActiveTab('more')}
        >
          <MoreHorizontal size={16} />
          <span>More</span>
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="compensation-panel">
        <h2 className="section-title">Pay Grades and Bands</h2>

        <div className="card comp-empty-card">
          <div className="comp-illustration">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21v-3a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v3" />
              <rect x="8" y="14" width="8" height="7" rx="1" stroke="#9ca3af" />
              <line x1="12" y1="16" x2="12" y2="19" stroke="#9ca3af" />
            </svg>
          </div>

          <h3 className="empty-title">No pay grades and bands data yet...</h3>
          <p className="empty-subtext">Add pay grades & bands to enable your company to track and manage job pay grades and pay bands effectively.</p>

          <div className="comp-actions">
            <button className="btn-outline" onClick={() => setShowAddBand(true)}>
              <Plus size={16} />
              <span>Add Pay Grades & Bands</span>
            </button>

            <button className="btn-secondary" onClick={() => alert('Import Pay Bands CSV wizard launched!')}>
              <Download size={16} />
              <span>Import Pay Grades & Bands</span>
            </button>
          </div>
        </div>
      </div>

      <AddPayBandModal 
        isOpen={showAddBand} 
        onClose={() => setShowAddBand(false)} 
      />
    </div>
  );
}
