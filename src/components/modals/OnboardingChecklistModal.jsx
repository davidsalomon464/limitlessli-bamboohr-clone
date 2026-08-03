import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, Shield, Award, FileText, BookOpen } from 'lucide-react';

export default function OnboardingChecklistModal({ isOpen, onClose }) {
  const [tasks, setTasks] = useState([
    // IT Setup
    { id: 1, category: 'IT Setup', title: 'Create @limitlessly.com email account', assignee: 'IT Support', dueDate: 'Day 1', completed: true },
    { id: 2, category: 'IT Setup', title: 'Provision access to BambooHR portal', assignee: 'IT Support', dueDate: 'Day 1', completed: true },
    { id: 3, category: 'IT Setup', title: 'Set up Time Doctor tracking account', assignee: 'IT Support', dueDate: 'Day 1', completed: true },
    { id: 4, category: 'IT Setup', title: 'Issue company laptop / hardware', assignee: 'IT Support', dueDate: 'Day 3', completed: false },
    // HR Documents
    { id: 5, category: 'HR Documents', title: 'Upload Government Issued ID (with Photo)', assignee: 'David Salomon', dueDate: 'Day 1', completed: false },
    { id: 6, category: 'HR Documents', title: 'Sign Engagement Agreement', assignee: 'David Salomon', dueDate: 'Day 1', completed: true },
    { id: 7, category: 'HR Documents', title: 'Complete W-9 tax form', assignee: 'David Salomon', dueDate: 'Day 3', completed: false },
    { id: 8, category: 'HR Documents', title: 'Submit bank direct deposit information', assignee: 'David Salomon', dueDate: 'Day 5', completed: false },
    // Training
    { id: 9, category: 'Training', title: 'Complete HIPAA compliance training', assignee: 'David Salomon', dueDate: 'Day 7', completed: false },
    { id: 10, category: 'Training', title: 'Complete Harassment & Discrimination training', assignee: 'David Salomon', dueDate: 'Day 7', completed: true },
    { id: 11, category: 'Training', title: 'Complete KnowBe4 security awareness module', assignee: 'David Salomon', dueDate: 'Day 14', completed: false },
    { id: 12, category: 'Training', title: 'Shadow assigned senior for 3 shifts', assignee: 'David Salomon', dueDate: 'Day 14', completed: false },
    // Culture
    { id: 13, category: 'Culture', title: 'Attend virtual Welcome Orientation call', assignee: 'David Salomon', dueDate: 'Day 1', completed: true },
    { id: 14, category: 'Culture', title: 'Complete "Get to Know" questionnaire', assignee: 'David Salomon', dueDate: 'Day 3', completed: false },
    { id: 15, category: 'Culture', title: 'Join #limitlessli-culture Slack channel', assignee: 'David Salomon', dueDate: 'Day 1', completed: true },
  ]);

  if (!isOpen) return null;

  const toggle = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percentage = Math.round((completed / total) * 100);

  const categories = [...new Set(tasks.map(t => t.category))];
  const catIcons = { 'IT Setup': Shield, 'HR Documents': FileText, 'Training': BookOpen, 'Culture': Award };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <CheckCircle2 size={20} className="icon-blue" />
            <div>
              <h3>Onboarding Checklist</h3>
              <p className="subtext">David Salomon — Started Jun 22, 2026</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
            <span><strong>{completed}</strong> of <strong>{total}</strong> tasks completed</span>
            <span style={{ fontWeight: 700, color: percentage >= 70 ? '#15803d' : percentage >= 40 ? '#a16207' : '#dc2626' }}>{percentage}%</span>
          </div>
          <div style={{ height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '4px', transition: 'width 0.5s ease',
              width: `${percentage}%`,
              background: percentage >= 70 ? 'linear-gradient(90deg, #22c55e, #16a34a)' : percentage >= 40 ? 'linear-gradient(90deg, #eab308, #f59e0b)' : 'linear-gradient(90deg, #ef4444, #dc2626)'
            }} />
          </div>
        </div>

        {/* Tasks by Category */}
        {categories.map(cat => {
          const CatIcon = catIcons[cat] || CheckCircle2;
          const catTasks = tasks.filter(t => t.category === cat);
          const catCompleted = catTasks.filter(t => t.completed).length;
          return (
            <div key={cat} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <CatIcon size={16} className="icon-blue" />
                <h4 style={{ fontSize: '14px' }}>{cat}</h4>
                <span className="subtext" style={{ marginLeft: 'auto', fontSize: '12px' }}>{catCompleted}/{catTasks.length}</span>
              </div>
              {catTasks.map(task => (
                <div key={task.id} style={{
                  display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                  borderBottom: '1px solid var(--border-light)', cursor: 'pointer',
                  opacity: task.completed ? 0.7 : 1
                }} onClick={() => toggle(task.id)}>
                  <input type="checkbox" checked={task.completed} onChange={() => toggle(task.id)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-green)', cursor: 'pointer' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-light)' : 'var(--text-dark)' }}>
                      {task.title}
                    </div>
                    <div className="subtext" style={{ fontSize: '11px' }}>Assigned to: {task.assignee}</div>
                  </div>
                  <div style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '10px',
                    background: task.completed ? '#dcfce7' : '#fef9c3',
                    color: task.completed ? '#15803d' : '#a16207',
                    fontWeight: 600
                  }}>
                    {task.completed ? 'Done' : task.dueDate}
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => alert('Reminder emails sent to contractor and assignees!')}>Send Reminders</button>
        </div>
      </div>
    </div>
  );
}
