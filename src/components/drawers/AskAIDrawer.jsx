import React, { useState } from 'react';
import { MessageSquarePlus, X, Send, Bot, User, Sparkles } from 'lucide-react';

export default function AskAIDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [input, setInput] = useState('');
  const [chat, setChat] = useState([
    { sender: 'ai', text: 'Hi David! I am your Limitlessli AI HR Assistant. How can I help you with NSD balances, RN license renewals, or company policies today?' }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setChat([...chat, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let aiResponse = 'I am looking into that for you! Your Paid NSD balance is currently 0.0 hours available, and your next payroll cutoff is Aug 15th.';
      if (userMsg.toLowerCase().includes('rn') || userMsg.toLowerCase().includes('license')) {
        aiResponse = 'Your RN License verification is active. Your California US RN license #RN-908241 expires in 20 days. You can submit your renewal in the Compliance Center!';
      } else if (userMsg.toLowerCase().includes('nsd') || userMsg.toLowerCase().includes('vacation')) {
        aiResponse = 'To request Paid or Unpaid NSD, click the "Request Time Off (NSD)" button on your Home dashboard or My Info tab.';
      }
      setChat(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 800);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel ai-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header ai-header">
          <div className="drawer-title-box">
            <div className="ai-icon-badge"><Sparkles size={18} /></div>
            <div>
              <h3>Ask Limitlessli AI Assistant</h3>
              <p className="subtext">Autonomous HR & Policy Companion</p>
            </div>
          </div>
          <button className="drawer-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="ai-chat-body">
          {chat.map((msg, idx) => (
            <div key={idx} className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'ai-row'}`}>
              <div className="chat-avatar">
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="ai-chat-input-row">
          <input 
            type="text" 
            placeholder="Ask about NSD, RN licenses, policies..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
          />
          <button type="submit" className="btn-ai-send"><Send size={16} /></button>
        </form>
      </div>
    </div>
  );
}
