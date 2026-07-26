import React, { useState } from 'react';
import { HelpCircle, X, Search, BookOpen, MessageSquare, ExternalLink, LifeBuoy, FileText } from 'lucide-react';

export default function HelpDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [search, setSearch] = useState('');

  const articles = [
    { title: 'How to request Paid & Unpaid NSD (Time Off)', category: 'NSD & Absences' },
    { title: 'Updating WhatsApp contact details & personal info', category: 'Profile' },
    { title: 'Submitting RN License renewals for verification', category: 'Compliance' },
    { title: 'Using Clair On-Demand Pay for instant advances', category: 'Payroll' }
  ];

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title-box">
            <LifeBuoy size={22} className="icon-blue" />
            <div>
              <h3>Help & Support Center</h3>
              <p className="subtext">Limitlessli HR Support & Guides</p>
            </div>
          </div>
          <button className="drawer-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="drawer-search">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search guides, help articles..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>

        <div className="drawer-body">
          <h4 className="drawer-section-title">Popular Help Articles</h4>
          <div className="help-articles-list">
            {articles.map((art, idx) => (
              <div key={idx} className="help-article-card" onClick={() => alert(`Opening guide: "${art.title}"`)}>
                <div className="article-icon"><FileText size={16} /></div>
                <div>
                  <div className="article-title">{art.title}</div>
                  <div className="article-category">{art.category}</div>
                </div>
              </div>
            ))}
          </div>

          <h4 className="drawer-section-title" style={{ marginTop: '24px' }}>Direct Support</h4>
          <div className="support-actions-grid">
            <button className="support-action-btn" onClick={() => alert('Support Ticket Creator opened! Your ticket will be routed to HR Support.')}>
              <MessageSquare size={18} className="icon-blue" />
              <div>
                <strong>Submit Support Ticket</strong>
                <p>Get help from Culture & HR</p>
              </div>
            </button>

            <a href="https://help.bamboohr.com" target="_blank" rel="noreferrer" className="support-action-btn">
              <ExternalLink size={18} className="icon-blue" />
              <div>
                <strong>BambooHR Help Center</strong>
                <p>Official BambooHR docs</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
