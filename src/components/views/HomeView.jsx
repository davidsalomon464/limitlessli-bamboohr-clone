import React, { useState } from 'react';
import { 
  Calendar, 
  Palmtree, 
  Scale, 
  Calculator, 
  Plus, 
  Edit3, 
  Megaphone, 
  TrendingUp, 
  ChevronRight, 
  X, 
  Award,
  CreditCard
} from 'lucide-react';
import { initialAnnouncements } from '../../data/mockData';
import AccrualCalcModal from '../modals/AccrualCalcModal';
import ClairPayModal from '../modals/ClairPayModal';
import NewAnnouncementModal from '../modals/NewAnnouncementModal';

export default function HomeView({ onRequestTimeOff }) {
  const [showPromo, setShowPromo] = useState(true);
  const [showCalc, setShowCalc] = useState(false);
  const [showClair, setShowClair] = useState(false);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [announcementsList, setAnnouncementsList] = useState(initialAnnouncements);

  const handleAddAnnouncement = (newMsg) => {
    setAnnouncementsList([newMsg, ...announcementsList]);
  };

  return (
    <div className="home-view">
      {/* Top Banner Profile Greeting */}
      <div className="home-profile-banner card">
        <div className="profile-banner-left">
          <div className="avatar-placeholder">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#9ca3af">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <div>
            <h1 className="greeting-title">Hi, David</h1>
            <p className="greeting-subtitle">System Developer (Intern)</p>
          </div>
        </div>

        <div className="profile-banner-right">
          <button className="btn-outline" onClick={() => setShowNewAnnouncement(true)}>
            <Plus size={14} />
            <span>New Announcement</span>
          </button>
          <button className="btn-outline" onClick={() => alert('Dashboard Widget Customization Mode Enabled!')}>
            <Edit3 size={14} />
            <span>Edit Widgets</span>
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="home-grid">
        {/* Left Column Widgets */}
        <div className="grid-col-left">
          {/* Time Off Widget */}
          <div className="card">
            <div className="card-title">
              <Calendar size={18} className="icon-blue" />
              <span>Time Off (NSD)</span>
            </div>

            <div className="timeoff-counters">
              <div className="timeoff-item">
                <span className="timeoff-label">Paid NSD</span>
                <div className="timeoff-value">
                  <Palmtree size={24} className="icon-palm" />
                  <span className="count-num">0</span>
                </div>
                <span className="hours-unit">hours available</span>
              </div>

              <div className="timeoff-item">
                <span className="timeoff-label">Unpaid NSD</span>
                <div className="timeoff-value">
                  <Scale size={24} className="icon-scale" />
                  <span className="count-num">0</span>
                </div>
                <span className="hours-unit">hours available</span>
              </div>
            </div>

            <div className="timeoff-actions">
              <button className="btn-outline btn-full" onClick={onRequestTimeOff}>
                <Calendar size={14} />
                <span>Request Time Off (NSD)</span>
              </button>
              <button className="btn-calc" title="Calculator" onClick={() => setShowCalc(true)}>
                <Calculator size={16} />
              </button>
            </div>
          </div>

          {/* Clair On-Demand Pay Card */}
          <div className="card clair-card" style={{ cursor: 'pointer' }} onClick={() => setShowClair(true)}>
            <div className="card-title">
              <CreditCard size={18} className="icon-blue" />
              <span>Clair On-Demand Pay</span>
            </div>
            <div className="clair-content">
              <div className="clair-text">
                <h3>No need to wait for payday</h3>
                <p>Early access to your pay straight to your existing debit card or bank account</p>
                <div className="clair-logo-sub">
                  <span>bambooHR</span> | <strong className="clair-brand">clair</strong>
                </div>
              </div>
              <ChevronRight className="chevron-icon" size={20} />
            </div>
          </div>

          {/* Headcount Analytics Card */}
          <div className="card">
            <div className="card-title">
              <TrendingUp size={18} className="icon-blue" />
              <span>Headcount</span>
            </div>
            
            <div className="headcount-chart">
              <div className="chart-years">
                <span>2025</span>
                <span>2026</span>
              </div>
              <div className="chart-bars">
                <div className="bar" style={{ height: '50%' }}></div>
                <div className="bar" style={{ height: '55%' }}></div>
                <div className="bar" style={{ height: '58%' }}></div>
                <div className="bar" style={{ height: '62%' }}></div>
                <div className="bar" style={{ height: '65%' }}></div>
                <div className="bar" style={{ height: '70%' }}></div>
                <div className="bar" style={{ height: '75%' }}></div>
                <div className="bar" style={{ height: '80%' }}></div>
                <div className="bar" style={{ height: '85%' }}></div>
                <div className="bar active" style={{ height: '95%' }}></div>
              </div>
              
              <div className="headcount-summary">
                <div className="total-label">Total Employees / Contractors</div>
                <div className="total-num">399</div>
                <div className="growth-rate">
                  <span className="positive">+62</span> (18.4%)
                  <span className="timeframe">Last 12 Months</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: What's happening at Limitlessli */}
        <div className="grid-col-right">
          <div className="card feed-card">
            <div className="card-title" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Megaphone size={18} className="icon-blue" />
                <span>What's happening at Limitlessli</span>
              </div>
              <button className="btn-text-blue" onClick={() => setShowNewAnnouncement(true)} style={{ fontSize: '12px' }}>
                + Post Announcement
              </button>
            </div>

            <div className="feed-list">
              {announcementsList.map((item) => (
                <div className="feed-item" key={item.id} style={{ cursor: 'pointer' }} onClick={() => alert(`Opening announcement: "${item.title}"`)}>
                  {item.type === 'task' ? (
                    <div className="feed-icon-box task-box">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#6b7280">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm3 11H9v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"/>
                      </svg>
                    </div>
                  ) : item.authorPhoto ? (
                    <img src={item.authorPhoto} alt={item.author} className="feed-avatar" />
                  ) : (
                    <div className="feed-icon-box">
                      <Megaphone size={18} />
                    </div>
                  )}

                  <div className="feed-details">
                    <p className="feed-text">
                      {item.author && <strong>{item.author} </strong>}
                      {item.type === 'announcement' && 'posted an Announcement '}
                      {item.title}
                    </p>

                    <div className="feed-meta">
                      {item.subtitle && <span className="subtext">{item.subtitle} </span>}
                      {item.isPastDue && <span className="badge-past-due">PAST DUE</span>}
                      {item.timeAgo && <span className="subtext">{item.timeAgo}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Right Banner */}
      {showPromo && (
        <div className="floating-promo-card">
          <button className="promo-close" onClick={() => setShowPromo(false)}>
            <X size={16} />
          </button>
          
          <div className="promo-icon-box">
            <Award size={36} className="icon-green" />
          </div>

          <h3>Customizations in BambooHR® Live Learning Lab + Q&A</h3>
          <p>Shape BambooHR to fit your world—no code required. Create custom tables, tabs, and reports that mold the platform to your workflows and wow your exec team.</p>

          <div className="promo-footer">
            <span className="promo-date">Join us in this free 1-hour learning lab on July 14th!</span>
            <button className="btn-success btn-full" onClick={() => alert('Successfully registered for Live Learning Lab!')}>Sign Me Up!</button>
          </div>
        </div>
      )}

      <AccrualCalcModal 
        isOpen={showCalc} 
        onClose={() => setShowCalc(false)} 
      />

      <ClairPayModal 
        isOpen={showClair} 
        onClose={() => setShowClair(false)} 
      />

      <NewAnnouncementModal 
        isOpen={showNewAnnouncement} 
        onClose={() => setShowNewAnnouncement(false)} 
        onAddAnnouncement={handleAddAnnouncement}
      />
    </div>
  );
}
