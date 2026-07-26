import React, { useState } from 'react';
import { DollarSign, Award, Plus, Upload, Layers } from 'lucide-react';
import PayGradesModal from '../modals/PayGradesModal';

export default function CompensationView() {
  const [activeTab, setActiveTab] = useState('pay-grades');
  const [showAddPayBand, setShowAddPayBand] = useState(false);

  return (
    <div className="compensation-view">
      <h1 className="page-title">Compensation</h1>

      {/* Sub Tabs */}
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
      </div>

      {activeTab === 'pay-grades' && (
        <div className="card comp-empty-card">
          <Layers size={64} className="icon-light-gray" />
          <h2 className="empty-title" style={{ marginTop: '16px' }}>Pay Grades & Bands Management</h2>
          <p className="empty-subtext">Set up structured pay grades (Min/Mid/Max ranges) for Limitlessli contractors and RN roles.</p>
          
          <div className="comp-actions">
            <button className="btn-primary" onClick={() => setShowAddPayBand(true)}>
              <Plus size={16} />
              <span>Add Pay Band</span>
            </button>
            <button className="btn-outline" onClick={() => alert('Pay Grades CSV Importer launched!')}>
              <Upload size={16} />
              <span>Import Pay Bands (CSV)</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'total-rewards' && (
        <div className="card comp-empty-card">
          <Award size={64} className="icon-light-gray" />
          <h2 className="empty-title" style={{ marginTop: '16px' }}>Total Rewards Statement</h2>
          <p className="empty-subtext">Provide contractors with a comprehensive breakdown of monthly pay rates, bonuses, and benefits.</p>
        </div>
      )}

      <PayGradesModal 
        isOpen={showAddPayBand} 
        onClose={() => setShowAddPayBand(false)} 
      />
    </div>
  );
}
