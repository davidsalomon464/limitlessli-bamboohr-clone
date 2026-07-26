import React from 'react';
import { HelpCircle, BookOpen, MessageSquare, PhoneCall, ExternalLink, X } from 'lucide-react';

export default function HelpDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="help-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="title-box">
            <HelpCircle size={20} className="icon-blue" />
            <h3>Help & Support Center</h3>
          </div>
          <button className="icon-btn-sm" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="help-body">
          <div className="help-card">
            <BookOpen size={24} className="icon-blue" />
            <div>
              <h4>Knowledge Base & Guides</h4>
              <p>Browse step-by-step guides on time off, benefits, onboarding, and payroll.</p>
              <a href="#kb" onClick={(e) => { e.preventDefault(); alert('Opening BambooHR Knowledge Base'); }}>Explore Articles <ExternalLink size={12} /></a>
            </div>
          </div>

          <div className="help-card">
            <MessageSquare size={24} className="icon-green" />
            <div>
              <h4>Contact HR Support</h4>
              <p>Submit a ticket directly to your Limitlessli HR operations team.</p>
              <button className="btn-outline-sm" onClick={() => alert('Support ticket modal launched')}>Submit Ticket</button>
            </div>
          </div>

          <div className="help-card">
            <PhoneCall size={24} className="icon-blue" />
            <div>
              <h4>Hotline & Emergency</h4>
              <p>For urgent payroll or employment inquiries: +1 (800) 555-CASM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
