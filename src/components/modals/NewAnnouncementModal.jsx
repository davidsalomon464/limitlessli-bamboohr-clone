import React, { useState } from 'react';
import { Megaphone, X } from 'lucide-react';

export default function NewAnnouncementModal({ isOpen, onClose, onAddAnnouncement }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('David Salomon');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddAnnouncement) {
      onAddAnnouncement({
        id: Date.now(),
        type: 'announcement',
        author: author,
        title: title,
        timeAgo: 'Just now',
        authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      });
    }
    alert(`Announcement "${title}" posted to "What's happening at Limitlessli"!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-box">
            <Megaphone size={20} className="icon-blue" />
            <h3>Post Company Announcement</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Posted By (Author)</label>
            <input type="text" value={author} onChange={e => setAuthor(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Announcement Headline / Content</label>
            <textarea rows="3" placeholder="e.g. 🔔 Reminder: All contractors please update your WhatsApp contact details!" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Post Announcement</button>
          </div>
        </form>
      </div>
    </div>
  );
}
