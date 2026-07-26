import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Calendar, FileCheck, Shield, ChevronRight, ChevronLeft } from 'lucide-react';

export default function NewContractorWizard({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    govIdType: 'Passport',
    isLicensed: 'Licensed US RN',
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
    accessLevel: 'Contractor'
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Contractor "${formData.firstName} ${formData.lastName}" created successfully! Welcome packet sent to ${formData.personalEmail} and login invite sent to ${formData.workEmail}.`);
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
              step === 4 ? 'Onboarding Tasks (Culture/IT)' : 'Account Access & Invite'
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
                  <label>Licensed Profession Status *</label>
                  <select value={formData.isLicensed} onChange={e => setFormData({...formData, isLicensed: e.target.value})}>
                    <option>Licensed US RN</option>
                    <option>Local RN</option>
                    <option>Non-Licensed Specialist</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>WhatsApp / Work Phone Number *</label>
                  <input type="text" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="+972-53-223-0769" />
                </div>
                <div className="form-group">
                  <label>Engagement / Hire Date *</label>
                  <input type="date" required value={formData.hireDate} onChange={e => setFormData({...formData, hireDate: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Work Email (@limitlessli.net) *</label>
                  <input type="email" required value={formData.workEmail} onChange={e => setFormData({...formData, workEmail: e.target.value})} placeholder="DSalomon@limitlessli.net" />
                </div>
                <div className="form-group">
                  <label>Personal Home Email *</label>
                  <input type="email" required value={formData.personalEmail} onChange={e => setFormData({...formData, personalEmail: e.target.value})} placeholder="david@example.com" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Client (Department) *</label>
                  <select value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})}>
                    <option>Renew</option>
                    <option>CASM Renew Auditors</option>
                    <option>MDS Consulting Services</option>
                    <option>Lumina Care</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Division *</label>
                  <select value={formData.division} onChange={e => setFormData({...formData, division: e.target.value})}>
                    <option>CASM</option>
                    <option>SASM</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Role *</label>
                  <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
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
                <strong>Email Preview (Sent to: {formData.personalEmail || 'david@example.com'})</strong>
                <p>Welcome to Limitlessli! Your engagement starts on {formData.hireDate || 'Day 1'}. Your Day 1 manager will be {formData.day1Manager}. Please check your Limitlessli email for software access instructions.</p>
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
                  <strong> Skip task assignment for now</strong> (Culture/IT will assign onboarding tasks later)
                </label>
              </div>

              {!formData.skipTasks && (
                <div className="tasks-preview-box card">
                  <div className="task-row"><CheckCircle2 size={16} className="icon-green" /> IT: Install Time Doctor & Activate Teams (Due 2 days before hire)</div>
                  <div className="task-row"><CheckCircle2 size={16} className="icon-green" /> Compliance: Upload Government ID & Police Clearance</div>
                  <div className="task-row"><CheckCircle2 size={16} className="icon-green" /> Operations: Ship Laptop & Power Station Asset</div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: ACCOUNT ACCESS & INVITE */}
          {step === 5 && (
            <div className="wizard-step-content">
              <h4 className="section-title">Step 5: Account Access Level & Login Invite</h4>
              <div className="form-group">
                <label>Access Level Group</label>
                <select value={formData.accessLevel} onChange={e => setFormData({...formData, accessLevel: e.target.value})}>
                  <option>Contractor (Standard View)</option>
                  <option>US RNs</option>
                  <option>Culture / HR Admin</option>
                  <option>IT Support Admin</option>
                  <option>System Admin (Full Access)</option>
                </select>
              </div>

              <div className="invite-box card">
                <Shield size={24} className="icon-blue" />
                <p>An activation invite will be sent to <strong>{formData.workEmail || 'contractor@limitlessli.net'}</strong> requiring password setup & 2FA authentication.</p>
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
                Complete Onboarding & Send Invite
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
