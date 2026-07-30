import React, { useState } from 'react';
import { 
  Building2, 
  Home as HomeIcon, 
  MapPin, 
  Info, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Unlink,
  CheckCircle2,
  ChevronDown,
  X
} from 'lucide-react';

export default function CreateJobOpeningView({ onCancel, onSave }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [postingTitle, setPostingTitle] = useState('');
  const [jobStatus, setJobStatus] = useState('Draft');
  const [hiringLead, setHiringLead] = useState('');
  const [department, setDepartment] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [minExperience, setMinExperience] = useState('');
  const [compensation, setCompensation] = useState('');
  const [jobLocation, setJobLocation] = useState('Hybrid');
  const [description, setDescription] = useState('');
  const [internalJobCode, setInternalJobCode] = useState('');

  const steps = [
    { id: 1, name: 'Job Information' },
    { id: 2, name: 'Application Details' },
    { id: 3, name: 'Job Pipeline' },
    { id: 4, name: 'Automated Emails' },
    { id: 5, name: 'Job Boards' }
  ];

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      alert(`Job Opening "${postingTitle || 'New Job'}" published successfully!`);
      if (onSave) onSave();
    }
  };

  return (
    <div className="create-job-container">
      {/* Top Header Row */}
      <div className="create-job-header">
        <h1 className="job-page-title">Create Job Opening</h1>
        <button className="btn-cancel-link" onClick={onCancel}>Cancel</button>
      </div>

      {/* Main 2-Column Layout */}
      <div className="create-job-grid">
        {/* Left Stepper Column */}
        <div className="stepper-col">
          <div className="stepper-list card">
            {steps.map((s) => (
              <div 
                key={s.id} 
                className={`stepper-item ${currentStep === s.id ? 'active' : ''} ${currentStep > s.id ? 'completed' : ''}`}
                onClick={() => setCurrentStep(s.id)}
              >
                <div className="stepper-circle">
                  {currentStep > s.id ? <CheckCircle2 size={16} /> : s.id}
                </div>
                <span className="stepper-label">{s.name}</span>
              </div>
            ))}

            <div className="stepper-actions">
              <button className="btn-primary btn-full btn-next" onClick={handleNextStep}>
                {currentStep === 5 ? 'Publish Job' : 'Next Step'}
              </button>
              <button className="btn-secondary btn-full" onClick={() => alert('Job Opening saved as Draft!')}>
                Save & Finish Later
              </button>
              <button className="btn-cancel-text" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="form-col">
          <div className="card job-form-card">
            {/* Step 1: Job Information */}
            {currentStep === 1 && (
              <div className="step-content">
                <div className="form-section-title">
                  <div className="info-icon-badge"><Info size={16} /></div>
                  <h2>Job Information</h2>
                </div>

                <div className="form-group">
                  <label>Posting Title*</label>
                  <input 
                    type="text" 
                    placeholder="" 
                    value={postingTitle} 
                    onChange={e => setPostingTitle(e.target.value)} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Job Status*</label>
                  <div className="select-badge-box">
                    <div className="status-chip">
                      <span>{jobStatus}</span>
                      <X size={12} className="clear-chip" onClick={() => setJobStatus('Open')} />
                    </div>
                    <ChevronDown size={14} className="dropdown-arrow" />
                  </div>
                  <p className="field-subtext">
                    Select "Open" to post this job on limitlessly.bamboohr.com/careers and other job boards.
                  </p>
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Hiring Lead*</label>
                    <select value={hiringLead} onChange={e => setHiringLead(e.target.value)}>
                      <option value="">--Select--</option>
                      <option value="Yvonne Rickert">Yvonne Rickert</option>
                      <option value="Ezra Solomon">Ezra Solomon</option>
                      <option value="Kevin Miller">Kevin Miller</option>
                      <option value="David Salomon">David Salomon</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Department</label>
                    <select value={department} onChange={e => setDepartment(e.target.value)}>
                      <option value="">--Select--</option>
                      <option value="CASM">CASM</option>
                      <option value="Renew">Renew</option>
                      <option value="CASM Renew Auditors">CASM Renew Auditors</option>
                      <option value="MDS Consulting">MDS Consulting</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Employment Type*</label>
                  <select value={employmentType} onChange={e => setEmploymentType(e.target.value)}>
                    <option value="">--Select--</option>
                    <option value="Full-Time Contractor">Full-Time Contractor</option>
                    <option value="Part-Time Contractor">Part-Time Contractor</option>
                    <option value="Per-Diem RN">Per-Diem RN</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Minimum Experience</label>
                  <select value={minExperience} onChange={e => setMinExperience(e.target.value)}>
                    <option value="">--Select--</option>
                    <option value="Entry Level">Entry Level</option>
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Compensation</label>
                  <input 
                    type="text" 
                    placeholder="e.g. $10-$15 Hourly DOE" 
                    value={compensation} 
                    onChange={e => setCompensation(e.target.value)} 
                  />
                </div>

                {/* Job Location Cards */}
                <div className="form-group">
                  <label>Job Location*</label>
                  <div className="location-cards-grid">
                    <div 
                      className={`location-card ${jobLocation === 'On Site' ? 'selected' : ''}`}
                      onClick={() => setJobLocation('On Site')}
                    >
                      <div className="loc-icon-box"><Building2 size={20} /></div>
                      <span className="loc-label">On Site</span>
                      <input type="checkbox" checked={jobLocation === 'On Site'} readOnly />
                    </div>

                    <div 
                      className={`location-card ${jobLocation === 'Hybrid' ? 'selected' : ''}`}
                      onClick={() => setJobLocation('Hybrid')}
                    >
                      <div className="loc-icon-box"><Building2 size={20} /></div>
                      <span className="loc-label">Hybrid</span>
                      <input type="checkbox" checked={jobLocation === 'Hybrid'} readOnly />
                    </div>

                    <div 
                      className={`location-card ${jobLocation === 'Remote' ? 'selected' : ''}`}
                      onClick={() => setJobLocation('Remote')}
                    >
                      <div className="loc-icon-box"><HomeIcon size={20} /></div>
                      <span className="loc-label">Remote</span>
                      <input type="checkbox" checked={jobLocation === 'Remote'} readOnly />
                    </div>
                  </div>
                </div>

                {/* Description Rich Text Editor Toolbar */}
                <div className="form-group">
                  <label>Description*</label>
                  <div className="rich-editor-box">
                    <div className="editor-toolbar">
                      <select className="tool-select"><option>Inter</option></select>
                      <select className="tool-select"><option>12pt</option></select>
                      <div className="tool-divider"></div>
                      <button type="button" className="tool-btn"><Bold size={14} /></button>
                      <button type="button" className="tool-btn"><Italic size={14} /></button>
                      <button type="button" className="tool-btn"><Underline size={14} /></button>
                      <button type="button" className="tool-btn"><span style={{ fontWeight: 'bold', color: '#1b6cb8' }}>A</span></button>
                      <div className="tool-divider"></div>
                      <button type="button" className="tool-btn"><List size={14} /></button>
                      <button type="button" className="tool-btn"><ListOrdered size={14} /></button>
                      <div className="tool-divider"></div>
                      <button type="button" className="tool-btn"><Link size={14} /></button>
                      <button type="button" className="tool-btn"><Unlink size={14} /></button>
                    </div>

                    <textarea 
                      rows="6" 
                      placeholder="Add your job description here..." 
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="editor-textarea"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Internal Job Code</label>
                  <input 
                    type="text" 
                    value={internalJobCode} 
                    onChange={e => setInternalJobCode(e.target.value)} 
                  />
                </div>
              </div>
            )}

            {/* Step 2: Application Details */}
            {currentStep === 2 && (
              <div className="step-content">
                <div className="form-section-title">
                  <div className="info-icon-badge"><Info size={16} /></div>
                  <h2>Application Details</h2>
                </div>
                <p className="subtext">Configure application form fields, required resume upload, and custom screening questions.</p>
                
                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Require Resume / CV Upload</span>
                  </label>
                </div>

                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Require Cover Letter</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Job Pipeline */}
            {currentStep === 3 && (
              <div className="step-content">
                <div className="form-section-title">
                  <div className="info-icon-badge"><Info size={16} /></div>
                  <h2>Job Pipeline</h2>
                </div>
                <p className="subtext">Customize recruitment stages for this job (New &rarr; Scribe Assessment &rarr; Interview &rarr; Offer).</p>
              </div>
            )}

            {/* Step 4: Automated Emails */}
            {currentStep === 4 && (
              <div className="step-content">
                <div className="form-section-title">
                  <div className="info-icon-badge"><Info size={16} /></div>
                  <h2>Automated Emails</h2>
                </div>
                <p className="subtext">Configure automatic email responses to applicants upon submission.</p>
              </div>
            )}

            {/* Step 5: Job Boards */}
            {currentStep === 5 && (
              <div className="step-content">
                <div className="form-section-title">
                  <div className="info-icon-badge"><Info size={16} /></div>
                  <h2>Job Boards & Publishing</h2>
                </div>
                <p className="subtext">Publish job to limitlessly.bamboohr.com/careers and external job networks.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
