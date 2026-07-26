import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Calendar, FileCheck, Shield, ChevronRight, ChevronLeft, Plus } from 'lucide-react';

export default function NewContractorWizard({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [clientOptions, setClientOptions] = useState(['Renew', 'CASM Renew Auditors', 'MDS Consulting Services', 'Lumina Care']);
  const [roleOptions, setRoleOptions] = useState(['Scribe Auditor', 'Clinical Documentation Specialist', 'Medical Scribe', 'Scheduler Assistant']);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    govIdType: 'Passport',
    govIdNumber: '',
    isLicensed: 'Licensed US RN',
    licenseNumber: '',
    licenseExpDate: '',
    whatsapp: '',
    workEmail: '',
    personalEmail: '',
    hireDate: '',
    role: 'Scribe Auditor',
    client: 'Renew',
    division: 'CASM',
    location: 'Israel (Remote)',
    packetTemplate: 'CASM Internal Contractor',
    day1Manager: 'Ezra',
    skipTasks: false,
    accessLevel: 'No Access (Pending Culture Configuration)'
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleQuickAddClient = () => {
    const newClient = prompt('Enter new Client (Department) name:');
    if (newClient) {
      setClientOptions([...clientOptions, newClient]);
      setFormData({...formData, client: newClient});
    }
  };

  const handleQuickAddRole = () => {
    const newRole = prompt('Enter new Role / Job Title:');
    if (newRole) {
      setRoleOptions([...roleOptions, newRole]);
      setFormData({...formData, role: newRole});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Contractor "${formData.firstName} ${formData.lastName}" profile created successfully!\n\nAccess Status: ${formData.accessLevel}\nWelcome Packet queued for: ${formData.personalEmail}\nWork Email: ${formData.workEmail || 'pending@limitlessly.com'}`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>New Contractor Onboarding Wizard</h3>
            <span className="subtext">Step {step} of 5 - {
              step === 1 ? 'Personal & Engagement Info' :
              step === 2 ? 'New Hire Welcome Packet' :
              step === 3 ? 'Get to Know Questions' :
              step === 4 ? 'Onboarding Tasks (Culture/IT)' : 'Access Control & Invitations'
            }</span>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Wizard Step Progress Bar */}
        <div className="wizard-steps-bar">
          <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 4 ? 'active' : ''}`}>4</div>
          <div className="step-line"></div>
          <div className={`step-dot ${step >= 5 ? 'active' : ''}`}>5</div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* STEP 1: PERSONAL & ENGAGEMENT INFO */}
          {step === 1 && (
            <div className="wizard-step-content">
              <h4 className="section-title">Step 1: Personal & Engagement Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>First Name *</label>
                  <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="David" />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Salomon" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Government ID Type *</label>
                  <select value={formData.govIdType} onChange={e => setFormData({...formData, govIdType: e.target.value})}>
                    <option>Passport</option>
                    <option>National ID / SSN</option>
                    <option>Driver's License</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Government ID Number *</label>
                  <input type="text" required value={formData.govIdNumber} onChange={e => setFormData({...formData, govIdNumber: e.target.value})} placeholder="ID-9948102" />
                </div>
              </div>

              {/* RN License Tracking Section */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Licensed Profession / RN Status *</label>
                  <select value={formData.isLicensed} onChange={e => setFormData({...formData, isLicensed: e.target.value})}>
                    <option>Licensed US RN</option>
                    <option>Local RN</option>
                    <option>Non-Licensed Specialist</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>License Number</label>
                  <input type="text" value={formData.licenseNumber} onChange={e => setFormData({...formData, licenseNumber: e.target.value})} placeholder="RN-884920" />
                </div>
                <div className="form-group">
                  <label>License Expiration Date</label>
                  <input type="date" value={formData.licenseExpDate} onChange={e => setFormData({...formData, licenseExpDate: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>WhatsApp / Work Phone Number *</label>
                  <input type="text" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="+972-53-223-0769" />
                </div>
                <div className="form-group">
                  <label>Engagement Start Date (Hire Date) *</label>
                  <input type="date" required value={formData.hireDate} onChange={e => setFormData({...formData, hireDate: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Work Email (@limitlessly.com) *</label>
                  <input type="email" required value={formData.workEmail} onChange={e => setFormData({...formData, workEmail: e.target.value})} placeholder="DSalomon@limitlessly.com" />
                </div>
                <div className="form-group">
                  <label>Personal Home Email *</label>
                  <input type="email" required value={formData.personalEmail} onChange={e => setFormData({...formData, personalEmail: e.target.value})} placeholder="david@example.com" />
                </div>
              </div>

              {/* Quick-Add Client & Role Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Client (Department)</label>
                    <button type="button" className="btn-text-blue" onClick={handleQuickAddClient} style={{ fontSize: '11px' }}><Plus size={10} /> Quick-Add</button>
                  </div>
                  <select value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})}>
                    {clientOptions.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label>Role</label>
                    <button type="button" className="btn-text-blue" onClick={handleQuickAddRole} style={{ fontSize: '11px' }}><Plus size={10} /> Quick-Add</button>
                  </div>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                    {roleOptions.map((r, idx) => <option key={idx} value={r}>{r}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Division *</label>
                  <select value={formData.division} onChange={e => setFormData({...formData, division: e.target.value})}>
                    <option>CASM</option>
                    <option>SASM</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: NEW HIRE WELCOME PACKET */}
          {step === 2 && (
            <div className="wizard-step-content">
              <h4 className="section-title">Step 2: New Hire Welcome Packet</h4>
              <p className="subtext">Configure welcome email template sent to contractor's personal email.</p>

              <div className="form-group">
                <label>Packet Template</label>
                <select value={formData.packetTemplate} onChange={e => setFormData({...formData, packetTemplate: e.target.value})}>
                  <option>CASM Internal Contractor</option>
                  <option>SASM Remote Contractor</option>
                  <option>US RN Specialist</option>
                </select>
              </div>

              <div className="form-group">
                <label>Day 1 Manager Contact</label>
                <select value={formData.day1Manager} onChange={e => setFormData({...formData, day1Manager: e.target.value})}>
                  <option>Ezra</option>
                  <option>Yvonne Rickert</option>
                  <option>Cindy</option>
                </select>
              </div>

              <div className="welcome-email-preview card">
                <strong>Email Delivery Route:</strong>
                <p>• Welcome Packet Email: Delivered to <strong>{formData.personalEmail || 'personal@example.com'}</strong></p>
                <p>• System Login Invite: Delivered strictly to <strong>{formData.workEmail || 'contractor@limitlessly.com'}</strong> once approved by Culture.</p>
              </div>
            </div>
          )}

          {/* STEP 3: GET TO KNOW QUESTIONS */}
          {step === 3 && (
            <div className="wizard-step-content">
              <h4 className="section-title">Step 3: Get to Know Questions</h4>
              <p className="subtext">Onboarding icebreaker questions assigned to new contractor.</p>
              
              <div className="form-group">
                <label>Question 1: What are your favorite hobbies outside of work?</label>
                <input type="text" readOnly value="Assigned automatically via Culture template" />
              </div>
              <div className="form-group">
                <label>Question 2: What is your preferred working style & communication method?</label>
                <input type="text" readOnly value="Assigned automatically via Culture template" />
              </div>
            </div>
          )}

          {/* STEP 4: ONBOARDING TASKS */}
          {step === 4 && (
            <div className="wizard-step-content">
              <h4 className="section-title">Step 4: Onboarding Tasks Checklist</h4>
              <div className="form-group">
                <label>
                  <input type="checkbox" checked={formData.skipTasks} onChange={e => setFormData({...formData, skipTasks: e.target.checked})} />
                  <strong> Skip task assignment for now</strong> (Recruitment option: Culture/IT will assign onboarding tasks later)
                </label>
              </div>

              {!formData.skipTasks && (
                <div className="tasks-preview-box card">
                  <div className="task-row"><CheckCircle2 size={16} className="icon-green" /> IT: Install Time Doctor & Activate Teams (Notification to it-support@limitlessly.com)</div>
                  <div className="task-row"><CheckCircle2 size={16} className="icon-green" /> Compliance: Upload Government ID & Police Clearance (NBI)</div>
                  <div className="task-row"><CheckCircle2 size={16} className="icon-green" /> Operations: Ship Laptop & Power Station Asset</div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: ACCESS CONTROL & INVITATIONS */}
          {step === 5 && (
            <div className="wizard-step-content">
              <h4 className="section-title">Step 5: Access Control & Invitation Trigger</h4>
              <div className="form-group">
                <label>Default Access Level upon Creation</label>
                <select value={formData.accessLevel} onChange={e => setFormData({...formData, accessLevel: e.target.value})}>
                  <option value="No Access (Pending Culture Configuration)">No Access (Default - Pending Culture Configuration)</option>
                  <option value="Contractor (Standard View)">Contractor (Standard View)</option>
                  <option value="US RNs">US RNs Special Access</option>
                  <option value="Culture / HR Admin">Culture / HR Admin</option>
                  <option value="System Admin (Full Access)">System Admin (Full Access)</option>
                </select>
              </div>

              <div className="invite-box card">
                <Shield size={24} className="icon-blue" />
                <p>Profile will be saved with status <strong>"{formData.accessLevel}"</strong>. Culture team can review the packet and trigger login invitation to <strong>{formData.workEmail || 'user@limitlessly.com'}</strong> when ready.</p>
              </div>
            </div>
          )}

          {/* Wizard Footer Navigation */}
          <div className="modal-actions">
            {step > 1 && (
              <button type="button" className="btn-secondary" onClick={handlePrev}>
                <ChevronLeft size={16} /> Back
              </button>
            )}

            {step < 5 ? (
              <button type="button" className="btn-primary" onClick={handleNext}>
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button type="submit" className="btn-success">
                Create Contractor Profile & Save
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
