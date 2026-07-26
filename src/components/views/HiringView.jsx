import React, { useState } from 'react';
import { Plus, Search, ChevronDown, Download, ExternalLink, Wind, UserCheck, Users } from 'lucide-react';
import EmbedCodeModal from '../modals/EmbedCodeModal';

export default function HiringView({ onNewJobOpening }) {
  const [activeTab, setActiveTab] = useState('job-openings');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmbedCode, setShowEmbedCode] = useState(false);

  const candidates = [
    { name: 'Alex Johnson', job: 'Scribe Auditor', stage: 'Interview', rating: '4.8/5' },
    { name: 'Maria Garcia', job: 'Clinical Documentation Specialist', stage: 'Applied', rating: '4.2/5' },
    { name: 'Liam Smith', job: 'Medical Scribe', stage: 'Offer Sent', rating: '5.0/5' }
  ];

  return (
    <div className="hiring-view">
      <h1 className="page-title">Hiring</h1>

      {/* Top Tabs Row */}
      <div className="hiring-tabs-header">
        <div className="tabs-left">
          <button 
            className={`hiring-tab ${activeTab === 'job-openings' ? 'active' : ''}`}
            onClick={() => setActiveTab('job-openings')}
          >
            Job Openings
          </button>
          <button 
            className={`hiring-tab ${activeTab === 'candidates' ? 'active' : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            Candidates ({candidates.length})
          </button>
          <button 
            className={`hiring-tab ${activeTab === 'talent-pools' ? 'active' : ''}`}
            onClick={() => setActiveTab('talent-pools')}
          >
            Talent Pools
          </button>
        </div>

        <div className="careers-links">
          <a href="#careers" onClick={(e) => { e.preventDefault(); alert('Opening Careers Website Preview'); }}>View Careers Website</a>
          <span>•</span>
          <button className="btn-text-blue" onClick={() => setShowEmbedCode(true)}>Get Embed Code</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="card table-card">
        {/* Controls Bar */}
        <div className="hiring-controls-bar">
          <div className="controls-left">
            <button className="btn-outline" onClick={onNewJobOpening}>
              <Plus size={16} />
              <span>New Job Opening</span>
            </button>

            <div className="search-input-box">
              <Search size={14} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search openings or candidates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="controls-right">
            <span className="showing-text">0 of 5 open • Show</span>
            <button className="btn-filter-dropdown">
              <span>Draft & Open</span>
              <ChevronDown size={14} />
            </button>
            <button className="icon-btn-border" title="Export">
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* JOB OPENINGS TAB */}
        {activeTab === 'job-openings' && (
          <div>
            <div className="hiring-table-header">
              <div className="col-candidates">Candidates</div>
              <div className="col-job">Job Opening</div>
              <div className="col-lead">Hiring Lead</div>
              <div className="col-date">Created On</div>
              <div className="col-status">Status</div>
            </div>

            {/* Tumbleweed Empty State (Screenshot 2) */}
            <div className="tumbleweed-empty-state">
              <div className="tumbleweed-icon">
                <Wind size={72} className="icon-tumbleweed" />
              </div>
              <h2 className="empty-title">We don't see job openings that match your filters.</h2>
              <p className="empty-subtext">Try selecting a different status or create a new job opening.</p>
            </div>
          </div>
        )}

        {/* CANDIDATES TAB */}
        {activeTab === 'candidates' && (
          <div className="candidates-kanban-board">
            <h3 className="section-title">Active Candidate Pipeline</h3>
            <table className="people-table">
              <thead>
                <tr>
                  <th>Candidate Name</th>
                  <th>Target Role</th>
                  <th>Current Pipeline Stage</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, idx) => (
                  <tr key={idx}>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.job}</td>
                    <td><span className="status-badge-green">{c.stage}</span></td>
                    <td>{c.rating}</td>
                    <td><button className="btn-outline-sm">Advance Stage</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TALENT POOLS TAB */}
        {activeTab === 'talent-pools' && (
          <div className="talent-pools-view">
            <h3 className="section-title">Limitlessli Sourced Talent Pools</h3>
            <div className="favorites-grid">
              <div className="favorite-card">
                <Users size={24} className="icon-blue" />
                <strong>Senior Developers Pool</strong>
                <span className="subtext">14 Candidates</span>
              </div>
              <div className="favorite-card">
                <UserCheck size={24} className="icon-green" />
                <strong>Certified Medical Auditors</strong>
                <span className="subtext">28 Candidates</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <EmbedCodeModal 
        isOpen={showEmbedCode} 
        onClose={() => setShowEmbedCode(false)} 
      />
    </div>
  );
}
