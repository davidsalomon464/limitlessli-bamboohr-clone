import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  ExternalLink, 
  Code,
  UserCheck,
  Briefcase
} from 'lucide-react';
import EmbedCodeModal from '../modals/EmbedCodeModal';
import CreateJobOpeningView from './CreateJobOpeningView';

export default function HiringView() {
  const [activeTab, setActiveTab] = useState('job-openings');
  const [showEmbed, setShowEmbed] = useState(false);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (isCreatingJob) {
    return (
      <CreateJobOpeningView 
        onCancel={() => setIsCreatingJob(false)}
        onSave={() => setIsCreatingJob(false)}
      />
    );
  }

  return (
    <div className="hiring-view">
      <h1 className="page-title">Hiring (ATS)</h1>

      {/* Tabs Row */}
      <div className="hiring-tabs-header">
        <div style={{ display: 'flex', gap: '4px' }}>
          <button 
            className={`hiring-tab ${activeTab === 'job-openings' ? 'active' : ''}`}
            onClick={() => setActiveTab('job-openings')}
          >
            Job Openings (0)
          </button>
          <button 
            className={`hiring-tab ${activeTab === 'candidates' ? 'active' : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            Candidates
          </button>
          <button 
            className={`hiring-tab ${activeTab === 'talent-pools' ? 'active' : ''}`}
            onClick={() => setActiveTab('talent-pools')}
          >
            Talent Pools
          </button>
        </div>

        <div className="careers-links">
          <a href="#careers-preview" onClick={(e) => { e.preventDefault(); alert('Public Careers Website Preview: https://limitlessly.com/careers'); }}>
            <ExternalLink size={12} /> Careers Website
          </a>
          <span>•</span>
          <button className="btn-text-blue" onClick={() => setShowEmbed(true)} style={{ fontSize: '12px' }}>
            <Code size={12} /> Embed Code
          </button>
        </div>
      </div>

      {/* Action Controls Bar */}
      <div className="hiring-controls-bar">
        <div className="controls-left">
          <button className="btn-primary" onClick={() => setIsCreatingJob(true)}>
            <Plus size={16} />
            <span>New Job Opening</span>
          </button>

          <div className="search-input-box">
            <Search size={14} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search job openings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="controls-right">
          <button className="btn-filter-dropdown">
            <span>Status: Draft, Open</span>
            <ChevronDown size={14} />
          </button>

          <select className="select-sm">
            <option>Sort by: Date Posted</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="card hiring-main-card" style={{ marginTop: '16px' }}>
        {activeTab === 'job-openings' && (
          <div>
            <div className="hiring-table-header">
              <div className="col-candidates">Candidates</div>
              <div className="col-job">Job Opening</div>
              <div className="col-lead">Hiring Lead</div>
              <div className="col-date">Date Created</div>
              <div className="col-status">Status</div>
            </div>

            <div className="tumbleweed-empty-state">
              <Briefcase size={48} className="icon-light-gray" />
              <h3 className="empty-title">No job openings found</h3>
              <p className="empty-subtext">Click "+ New Job Opening" above to post your first vacancy for Limitlessli.</p>
            </div>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="kanban-pipeline">
            <h3 className="section-title">Candidate Pipeline</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px' }}>
              <div className="card" style={{ background: '#f9fafb' }}>
                <strong>Applied (0)</strong>
                <p className="subtext" style={{ marginTop: '8px' }}>No new applicants.</p>
              </div>
              <div className="card" style={{ background: '#f9fafb' }}>
                <strong>Interview (0)</strong>
                <p className="subtext" style={{ marginTop: '8px' }}>No interviews scheduled.</p>
              </div>
              <div className="card" style={{ background: '#f9fafb' }}>
                <strong>Offer Sent (0)</strong>
                <p className="subtext" style={{ marginTop: '8px' }}>No offers pending.</p>
              </div>
              <div className="card" style={{ background: '#f9fafb' }}>
                <strong>Hired (0)</strong>
                <p className="subtext" style={{ marginTop: '8px' }}>No recent hires.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'talent-pools' && (
          <div className="talent-pools">
            <h3 className="section-title">Talent Pools</h3>
            <p className="subtext">Categorized pre-screened candidates for future hiring rounds.</p>
          </div>
        )}
      </div>

      <EmbedCodeModal 
        isOpen={showEmbed} 
        onClose={() => setShowEmbed(false)} 
      />
    </div>
  );
}
