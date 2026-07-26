import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function NotificationsPopover({ isOpen, onClose }) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Government ID Upload Past Due',
      description: 'Valid Photo ID for David Salomon was due on Jun 22.',
      time: '21 days ago'
    },
    {
      id: 2,
      type: 'info',
      title: 'Company Announcement',
      description: 'Cendz Deluta posted: Knowledge Pays Challenge!',
      time: '4 days ago'
    },
    {
      id: 3,
      type: 'success',
      title: 'Training Completed',
      description: 'CASM Harassment Awareness passed successfully.',
      time: 'Jun 30, 2026'
    }
  ];

  return (
    <div className="popover-overlay" onClick={onClose}>
      <div className="notifications-popover" onClick={(e) => e.stopPropagation()}>
        <div className="popover-header">
          <div className="title-box">
            <Bell size={18} className="icon-blue" />
            <h3>Notifications</h3>
          </div>
          <button className="icon-btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="notifications-list">
          {notifications.map((n) => (
            <div key={n.id} className="notification-item">
              <div className="n-icon">
                {n.type === 'warning' && <AlertTriangle size={18} className="icon-red" />}
                {n.type === 'info' && <Info size={18} className="icon-blue" />}
                {n.type === 'success' && <CheckCircle size={18} className="icon-green" />}
              </div>
              <div className="n-content">
                <strong>{n.title}</strong>
                <p>{n.description}</p>
                <span className="n-time">{n.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="popover-footer">
          <button className="btn-text-blue" onClick={() => alert('All notifications marked as read')}>
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}
