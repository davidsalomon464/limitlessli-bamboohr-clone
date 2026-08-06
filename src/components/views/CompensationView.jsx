import React, { useState } from 'react';
import { DollarSign, Award, Plus, Upload, Layers, FileText, CreditCard, BarChart2 } from 'lucide-react';
import PayGradesModal from '../modals/PayGradesModal';

export default function CompensationView({ onOpenContractGenerator, onOpenPayStub, onOpenSalaryBenchmarking }) {
  const [activeTab, setActiveTab] = useState('pay-grades');
  const [showAddPayBand, setShowAddPayBand] = useState(false);

  return (
    <div className="compensation-view">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="page-title">Compensation</h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="btn-outline-sm" onClick={onOpenSalaryBenchmarking} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <BarChart2 size={14} className="icon-blue" /> Salary Benchmarking
          </button>
          <button className="btn-outline-sm" onClick={onOpenPayStub} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <CreditCard size={14} className="icon-blue" /> Generate Pay Stub PDF
          </button>
          <button className="btn-outline-sm" onClick={onOpenContractGenerator} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <FileText size={14} className="icon-blue" /> Generate Contract PDF
          </button>
        </div>
      </div>

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
            <button className="btn-outline" onClick={onOpenSalaryBenchmarking} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <BarChart2 size={16} />
              <span>View Market Benchmarks</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'total-rewards' && (
        <div className="card comp-empty-card">
          <Award size={64} className="icon-light-gray" />
          <h2 className="empty-title" style={{ marginTop: '16px' }}>Total Rewards Statement</h2>
          <p className="empty-subtext">Provide contractors with a comprehensive breakdown of monthly pay rates, bonuses, and benefits.</p>
          <div className="comp-actions" style={{ marginTop: '16px' }}>
            <button className="btn-primary" onClick={onOpenPayStub}>
              <CreditCard size={16} />
              <span>View & Generate Pay Stub</span>
            </button>
          </div>
        </div>
      )}

      <PayGradesModal 
        isOpen={showAddPayBand} 
        onClose={() => setShowAddPayBand(false)} 
      />
    </div>
  );
}
