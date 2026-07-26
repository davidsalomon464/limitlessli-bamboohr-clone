import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User } from 'lucide-react';

export default function AskAIDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hi David! I am your Limitlessli AI HR Assistant. How can I help you with time off policies, employee directory, or HR guidelines today?' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let replyText = 'I can help you with that! According to Limitlessli HR policies, all requests can be submitted under your My Info tab or via the Time Off widget.';
      if (input.toLowerCase().includes('holiday') || input.toLowerCase().includes('vacation')) {
        replyText = 'You have 0 hours of Paid NSD available currently. You can submit a request using the "Request Time Off" button.';
      } else if (input.toLowerCase().includes('manager') || input.toLowerCase().includes('yvonne')) {
        replyText = 'Your assigned Manager is Yvonne Rickert (Chief Operating Officer).';
      }
      setMessages((prev) => [...prev, { sender: 'ai', text: replyText }]);
    }, 600);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="ai-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="ai-title">
            <Sparkles size={20} className="icon-blue" />
            <div>
              <h3>Ask Limitlessli AI</h3>
              <span className="ai-subtitle">HR & Workplace Assistant</span>
            </div>
          </div>
          <button className="icon-btn-sm" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="chat-messages">
          {messages.map((m, idx) => (
            <div key={idx} className={`chat-bubble ${m.sender}`}>
              <div className="bubble-icon">
                {m.sender === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="bubble-text">{m.text}</div>
            </div>
          ))}
        </div>

        <form className="chat-input-bar" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Ask a question about HR, benefits, time off..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-send"><Send size={16} /></button>
        </form>
      </div>
    </div>
  );
}
