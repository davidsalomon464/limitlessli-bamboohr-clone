import React, { useState } from 'react';
import { Bell, Check, X, ShieldAlert, Calendar, FileText, CheckCircle2 } from 'lucide-react';

export default function NotificationsPopover({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'license',
      title: 'RN License Expiration Warning',
      desc: 'Mary Grace Acabo US RN License expires in 20 days.',
      time: '10m ago',
      read: false,
      icon: ShieldAlert,
      color: '#dc2626',
      bg: '#fef2f2'
    },
    {
      id: 2,
      type: 'nsd',
      title: 'Paid NSD Request Approved',
      desc: 'Your Paid NSD request for Aug 12 was approved by Yvonne Rickert.',
      time: '2h ago',
      read: false,
      icon: Calendar,
      color: '#0284c7',
      bg: '#f0f9ff'
    },
    {
      id: 3,
      type: 'document',
      title: 'Contract Ready for Signature',
      desc: 'Contractor Engagement Agreement 2026 requires your digital signature.',
      time: '1d ago',
      read: true,
      icon: FileText,
      color: '#059669',
      bg: '#ecfdf5'
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="popover-backdrop" onClick={onClose}>
      <div className="notifications-popover-card" onClick={(e) => e.stopPropagation()}>
        <div className="popover-header">
          <div className="popover-title">
            <Bell size={18} className="icon-blue" />
            <span>Notifications</span>
            <span className="popover-badge">{notifications.filter(n => !n.read).length}</span>
          </div>
          <button className="btn-text-sm" onClick={markAllAsRead}>Mark all read</button>
        </div>

        <div className="popover-list">
          {notifications.map((item) => {
            const IconComp = item.icon;
            return (
              <div key={item.id} className={`popover-item ${item.read ? 'read' : 'unread'}`}>
                <div className="popover-item-icon" style={{ background: item.bg, color: item.color }}>
                  <IconComp size={16} />
                </div>
                <div className="popover-item-content">
                  <div className="popover-item-title">{item.title}</div>
                  <div className="popover-item-desc">{item.desc}</div>
                  <div className="popover-item-time">{item.time}</div>
                </div>
                {!item.read && <span className="unread-dot"></span>}
              </div>
            );
          })}
        </div>

        <div className="popover-footer">
          <button className="btn-popover-full" onClick={onClose}>View Notification Center</button>
        </div>
      </div>
    </div>
  );
}
