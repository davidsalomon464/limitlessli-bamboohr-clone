import React, { useState } from 'react';
import { 
  GraduationCap, 
  ChevronDown, 
  MoreHorizontal, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  Building, 
  Calendar, 
  User, 
  CheckCircle2, 
  Edit, 
  Trash2, 
  Plus, 
  ExternalLink,
  Sliders,
  Shield,
  FileText,
  Heart,
  DollarSign,
  Laptop,
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { initialUserProfile, initialTrainingRecords } from '../../data/mockData';
import ESignatureModal from '../modals/ESignatureModal';

export default function MyInfoView({ onRecordTraining }) {
  const [activeSubTab, setActiveSubTab] = useState('training');
  const [trainingList, setTrainingList] = useState(initialTrainingRecords);
  const [showESign, setShowESign] = useState(false);
  const [selectedDocTitle, setSelectedDocTitle] = useState('');

  const subTabs = [
    { id: 'personal', label: 'Personal' },
    { id: 'job', label: 'Job' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'time-off', label: 'Time Off' },
    { id: 'training', label: 'Training' },
    { id: 'documents', label: 'Documents' },
    { id: 'notes', label: 'Notes' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'more', label: 'More', hasDropdown: true }
  ];

  const handleOpenESign = (title) => {
    setSelectedDocTitle(title);
    setShowESign(true);
  };

  return (
    <div className="my-info-view">
      {/* Blue Top Hero Banner */}
      <div className="profile-hero-banner">
        <div className="hero-top-row">
          <div className="hero-avatar-box">
            <User size={80} className="hero-avatar-icon" />
          </div>

          <div className="hero-user-details">
            <h1 className="hero-name">{initialUserProfile.name}</h1>
            <p className="hero-title">{initialUserProfile.title}</p>
          </div>

          <div className="hero-actions">
            <button className="btn-hero-action" onClick={() => alert('Change Profile Request Form launched!')}>
              <span>Request a Change</span>
              <ChevronDown size={14} />
            </button>
            <button className="btn-hero-more" onClick={() => alert('Profile options: Export PDF, Print Profile, Edit Avatar')}>
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="hero-tabs-row">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              className={`hero-tab ${activeSubTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveSubTab(tab.id)}
            >
              <span>{tab.label}</span>
              {tab.hasDropdown && <ChevronDown size={12} />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Main Section */}
      <div className="profile-layout-grid">
        {/* Left Vitals Sidebar */}
        <div className="vitals-sidebar card">
          <h3 className="vitals-title">Vitals</h3>

          <div className="vital-item">
            <Phone size={14} />
            <span>{initialUserProfile.phone}</span>
          </div>

          <div className="vital-item">
            <Mail size={14} />
            <a href={`mailto:${initialUserProfile.email}`}>{initialUserProfile.email}</a>
          </div>

          <div className="vital-item">
            <MapPin size={14} />
            <span>{initialUserProfile.location}</span>
          </div>

          <div className="vital-item">
            <Briefcase size={14} />
            <span>{initialUserProfile.title}</span>
          </div>

          <div className="vital-item">
            <Building size={14} />
            <span>{initialUserProfile.company}</span>
          </div>

          <div className="vital-item">
            <Building size={14} />
            <span>{initialUserProfile.division}</span>
          </div>

          <div className="vital-item id-num">
            <span>{initialUserProfile.employeeId}</span>
          </div>

          <hr className="vitals-divider" />

          <div className="vital-section">
            <h4 className="section-label">Hire Date</h4>
            <div className="vital-item">
              <Calendar size={14} />
              <div>
                <div>{initialUserProfile.hireDate}</div>
                <div className="tenure-badge">{initialUserProfile.tenureDays}</div>
              </div>
            </div>
          </div>

          <hr className="vitals-divider" />

          <div className="vital-section">
            <h4 className="section-label">Manager</h4>
            <div className="manager-card">
              <img src={initialUserProfile.manager.photo} alt={initialUserProfile.manager.name} className="manager-avatar" />
              <div>
                <strong className="manager-name">{initialUserProfile.manager.name}</strong>
                <p className="manager-title">{initialUserProfile.manager.title}</p>
              </div>
            </div>
            <a href="#org-chart" className="org-chart-link">
              <ExternalLink size={12} />
              <span>View in org chart</span>
            </a>
          </div>
        </div>

        {/* Right Main Panel */}
        <div className="profile-main-panel">
          {/* TRAINING TAB */}
          {activeSubTab === 'training' && (
            <div className="training-view">
              <div className="panel-header">
                <div className="header-title">
                  <GraduationCap size={22} className="icon-blue" />
                  <h2>Training</h2>
                </div>
                <button className="btn-customize-layout">
                  <Sliders size={14} />
                  <span>Customize Layout</span>
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Upcoming Training Section */}
              <div className="card training-card">
                <h3 className="section-title">Upcoming Training</h3>
                <div className="empty-training-state">
                  <div className="cap-illustration">
                    <GraduationCap size={64} className="icon-light-gray" />
                  </div>
                  <p className="empty-text">You have no upcoming trainings.</p>
                </div>
              </div>

              {/* Completed Training Section */}
              <div className="card training-card">
                <div className="completed-header">
                  <h3 className="section-title">Completed Training</h3>
                  <div className="completed-actions">
                    <button className="btn-text-blue" onClick={onRecordTraining}>
                      <Plus size={14} />
                      <span>Record a Training</span>
                    </button>
                    <select className="select-sm">
                      <option>Most Recent</option>
                    </select>
                    <select className="select-sm">
                      <option>2026</option>
                    </select>
                  </div>
                </div>

                <div className="training-category">Annual</div>

                <div className="training-list">
                  {trainingList.map((item) => (
                    <div className="training-item-row" key={item.id}>
                      <div className="training-info">
                        <CheckCircle2 size={16} className="icon-check" />
                        <span className="training-name">{item.title}</span>
                        <span className="training-date">{item.completedDate}</span>
                      </div>
                      <div className="training-item-actions">
                        <button className="icon-btn-sm" title="Edit"><Edit size={14} /></button>
                        <button className="icon-btn-sm" title="Delete"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="training-footer">
                  <span>{trainingList.length} Training Completed</span>
                </div>
              </div>
            </div>
          )}

          {/* PERSONAL TAB */}
          {activeSubTab === 'personal' && (
            <div className="card tab-details-card">
              <h2 className="section-title">Personal Information</h2>
              <div className="details-grid">
                <div className="detail-field"><strong>Full Name:</strong> David Salomon</div>
                <div className="detail-field"><strong>Date of Birth:</strong> Jan 14, 1998</div>
                <div className="detail-field"><strong>Marital Status:</strong> Single</div>
                <div className="detail-field"><strong>SSN / National ID:</strong> ***-**-4910</div>
                <div className="detail-field"><strong>Home Address:</strong> Tel Aviv, Israel</div>
              </div>
            </div>
          )}

          {/* JOB TAB */}
          {activeSubTab === 'job' && (
            <div className="card tab-details-card">
              <h2 className="section-title">Job Information</h2>
              <div className="details-grid">
                <div className="detail-field"><strong>Title:</strong> System Developer (Intern)</div>
                <div className="detail-field"><strong>Department:</strong> CASM</div>
                <div className="detail-field"><strong>Division:</strong> CASM Limitlessli LLC</div>
                <div className="detail-field"><strong>Status:</strong> Full-Time Contractor</div>
                <div className="detail-field"><strong>Reports To:</strong> Yvonne Rickert</div>
              </div>
            </div>
          )}

          {/* EMERGENCY TAB */}
          {activeSubTab === 'emergency' && (
            <div className="card tab-details-card">
              <div className="panel-header">
                <h2 className="section-title">Emergency Contacts</h2>
                <button className="btn-primary" onClick={() => alert('Add Emergency Contact Modal')}>+ Add Contact</button>
              </div>
              <div className="training-item-row">
                <div>
                  <strong>Sarah Salomon (Spouse)</strong>
                  <p className="subtext">Phone: +972-50-000-1122 • Relationship: Primary</p>
                </div>
              </div>
            </div>
          )}

          {/* TIME OFF TAB */}
          {activeSubTab === 'time-off' && (
            <div className="card tab-details-card">
              <h2 className="section-title">Time Off History & Balances</h2>
              <table className="people-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Earned</th>
                    <th>Used</th>
                    <th>Available</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paid NSD</td>
                    <td>0.00 hrs</td>
                    <td>0.00 hrs</td>
                    <td><strong>0.00 hrs</strong></td>
                  </tr>
                  <tr>
                    <td>Unpaid NSD</td>
                    <td>0.00 hrs</td>
                    <td>0.00 hrs</td>
                    <td><strong>0.00 hrs</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* DOCUMENTS TAB (WITH E-SIGNATURE INTEGRATION) */}
          {activeSubTab === 'documents' && (
            <div className="card tab-details-card">
              <div className="panel-header">
                <h2 className="section-title">Signed & Pending Documents</h2>
                <button className="btn-outline-sm" onClick={() => alert('Upload Document')}>Upload File</button>
              </div>

              <div className="training-item-row">
                <div className="training-info">
                  <FileText size={18} className="icon-blue" />
                  <div>
                    <strong>Limitlessli Non-Disclosure Agreement (NDA)_2026.pdf</strong>
                    <p className="subtext">Status: <span className="status-badge-green">Signed Jun 22, 2026</span></p>
                  </div>
                </div>
                <button className="btn-outline-sm" onClick={() => handleOpenESign('Limitlessli Non-Disclosure Agreement (NDA)_2026.pdf')}>
                  <FileCheck size={14} /> Re-Sign Document
                </button>
              </div>

              <div className="training-item-row" style={{ marginTop: '12px' }}>
                <div className="training-info">
                  <FileText size={18} className="icon-blue" />
                  <div>
                    <strong>Contractor Engagement Agreement_2026.pdf</strong>
                    <p className="subtext">Status: <span className="badge-past-due">Action Required</span></p>
                  </div>
                </div>
                <button className="btn-primary" onClick={() => handleOpenESign('Contractor Engagement Agreement_2026.pdf')}>
                  <FileCheck size={14} /> Sign Now (E-Sign)
                </button>
              </div>
            </div>
          )}

          {/* NOTES TAB */}
          {activeSubTab === 'notes' && (
            <div className="card tab-details-card">
              <h2 className="section-title">HR & Manager Notes</h2>
              <p className="subtext">No private notes recorded yet.</p>
            </div>
          )}

          {/* BENEFITS TAB */}
          {activeSubTab === 'benefits' && (
            <div className="card tab-details-card">
              <h2 className="section-title">Health & Benefit Plans</h2>
              <div className="training-item-row">
                <div className="training-info">
                  <Heart size={18} className="icon-green" />
                  <strong>Global Health & Medical Insurance Plan</strong>
                </div>
                <span className="status-badge-green">Enrolled</span>
              </div>
            </div>
          )}

          {/* MORE TAB */}
          {activeSubTab === 'more' && (
            <div className="card tab-details-card">
              <h2 className="section-title">Company Assets Tracked</h2>
              <div className="training-item-row">
                <div className="training-info">
                  <Laptop size={18} className="icon-blue" />
                  <strong>MacBook Pro 16" (M3 Max) - Asset #LM-9921</strong>
                </div>
                <span className="subtext">Issued Jun 22, 2026</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <ESignatureModal 
        isOpen={showESign} 
        onClose={() => setShowESign(false)} 
        documentTitle={selectedDocTitle}
      />
    </div>
  );
}
