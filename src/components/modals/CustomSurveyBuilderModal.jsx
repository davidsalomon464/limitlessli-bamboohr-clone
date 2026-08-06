import React, { useState } from 'react';
import { HelpCircle, Plus, Trash2, CheckCircle2, Star, Download, BarChart2, X, FileText, Send } from 'lucide-react';

export default function CustomSurveyBuilderModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('templates');
  const [surveyTitle, setSurveyTitle] = useState('30-Day Onboarding Feedback Survey');
  const [questions, setQuestions] = useState([
    { id: 1, text: 'How clear was your onboarding process with Limitlessli?', type: 'rating' },
    { id: 2, text: 'Did you receive all necessary hardware and access credentials on time?', type: 'yes_no' },
    { id: 3, text: 'What area of your training could be improved?', type: 'text' },
  ]);

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), text: 'New custom survey question...', type: 'rating' }
    ]);
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '85vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <HelpCircle size={20} className="icon-blue" />
            <div>
              <h3>Custom Survey & Intake Form Builder</h3>
              <p className="subtext">Create Surveys, Onboarding Pulse Checks & Feedback Forms</p>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* View Mode Tabs */}
        <div className="view-mode-tabs" style={{ marginBottom: '20px' }}>
          <button className={`view-tab ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>📋 Form Builder & Questions</button>
          <button className={`view-tab ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>📊 Response Analytics (42 Responses)</button>
        </div>

        {activeTab === 'templates' && (
          <div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Survey / Form Title</label>
              <input type="text" value={surveyTitle} onChange={(e) => setSurveyTitle(e.target.value)} required />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '14px', margin: 0 }}>Questions ({questions.length})</h4>
              <button className="btn-outline-sm" onClick={handleAddQuestion} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <Plus size={14} /> Add Question
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {questions.map((q, idx) => (
                <div className="card" key={q.id} style={{ padding: '14px', background: '#f9fafb' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary-blue)', fontSize: '13px' }}>Q{idx + 1}.</span>
                    <input 
                      type="text" 
                      value={q.text} 
                      onChange={(e) => {
                        const updated = questions.map(item => item.id === q.id ? { ...item, text: e.target.value } : item);
                        setQuestions(updated);
                      }}
                      style={{ flex: 1, padding: '6px 10px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '13px' }}
                    />
                    <select 
                      value={q.type}
                      onChange={(e) => {
                        const updated = questions.map(item => item.id === q.id ? { ...item, type: e.target.value } : item);
                        setQuestions(updated);
                      }}
                      style={{ padding: '6px', borderRadius: '4px', border: '1px solid var(--border-medium)', fontSize: '12px' }}
                    >
                      <option value="rating">1-5 Star Rating</option>
                      <option value="yes_no">Yes / No Toggle</option>
                      <option value="text">Short Text Response</option>
                    </select>
                    <button className="icon-btn-sm" title="Delete Question" onClick={() => handleRemoveQuestion(q.id)} style={{ color: '#dc2626' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#f0fdf4' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#15803d' }}>94.2%</div>
                <div className="subtext">Overall Satisfaction Score</div>
              </div>
              <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#eff6ff' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#1d4ed8' }}>42</div>
                <div className="subtext">Completed Responses</div>
              </div>
              <div className="card" style={{ padding: '12px', textAlign: 'center', background: '#fef3c7' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#b45309' }}>100%</div>
                <div className="subtext">Hardware On-Time Rate</div>
              </div>
            </div>

            <div className="card" style={{ padding: '16px' }}>
              <h4 style={{ fontSize: '14px', margin: '0 0 12px 0' }}>Recent Feedback Highlights</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ padding: '10px', background: '#f9fafb', borderRadius: '6px', borderLeft: '3px solid #22c55e' }}>
                  "Onboarding orientation with Culture team was super clear and welcoming!" — <em>Honey Jessa Abapo</em>
                </div>
                <div style={{ padding: '10px', background: '#f9fafb', borderRadius: '6px', borderLeft: '3px solid #22c55e' }}>
                  "Time Doctor integration setup was smooth and straightforward." — <em>Asif Ahmed Abir</em>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="modal-actions" style={{ marginTop: '24px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-outline" onClick={() => alert('Survey responses exported to CSV!')}>
            <Download size={14} /> Export CSV Results
          </button>
          <button className="btn-primary" onClick={() => { alert('Survey published to all contractors!'); onClose(); }}>
            <Send size={14} /> Publish Survey
          </button>
        </div>
      </div>
    </div>
  );
}
