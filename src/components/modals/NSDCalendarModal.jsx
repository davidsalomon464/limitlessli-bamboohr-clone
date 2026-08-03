import React, { useState } from 'react';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function NSDCalendarModal({ isOpen, onClose }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  if (!isOpen) return null;

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const nsdEvents = {
    [`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-10`]: { type: 'approved', label: 'Paid NSD', contractor: 'Honey Jessa Abapo' },
    [`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-11`]: { type: 'approved', label: 'Paid NSD', contractor: 'Honey Jessa Abapo' },
    [`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-18`]: { type: 'pending', label: 'Unpaid NSD', contractor: 'Andrea Mae Abuan' },
    [`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-22`]: { type: 'denied', label: 'Paid NSD', contractor: 'Kelvin Acuba' },
    [`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-25`]: { type: 'approved', label: 'Paid NSD', contractor: 'Mary Grace Acabo' },
  };

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const grid = [];
  for (let i = 0; i < firstDay; i++) grid.push(null);
  for (let d = 1; d <= totalDays; d++) grid.push(d);

  const getEventForDay = (day) => {
    if (!day) return null;
    const key = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return nsdEvents[key] || null;
  };

  const isWeekend = (day) => {
    if (!day) return false;
    const d = new Date(currentYear, currentMonth, day).getDay();
    return d === 0 || d === 6;
  };

  const eventColors = {
    approved: { bg: '#dcfce7', border: '#22c55e', text: '#15803d' },
    pending: { bg: '#fef9c3', border: '#eab308', text: '#a16207' },
    denied: { bg: '#fee2e2', border: '#ef4444', text: '#dc2626' }
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-lg" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Calendar size={20} className="icon-blue" />
            <h3>NSD Calendar</h3>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Month Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <button className="btn-outline-sm" onClick={prevMonth}><ChevronLeft size={16} /></button>
          <h4>{monthNames[currentMonth]} {currentYear}</h4>
          <button className="btn-outline-sm" onClick={nextMonth}><ChevronRight size={16} /></button>
        </div>

        {/* Calendar Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
          {dayNames.map(d => (
            <div key={d} style={{ padding: '8px', textAlign: 'center', fontWeight: 600, fontSize: '12px', background: '#f9fafb', color: 'var(--text-light)' }}>{d}</div>
          ))}
          {grid.map((day, i) => {
            const event = getEventForDay(day);
            const weekend = isWeekend(day);
            const isToday = day && day === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
            return (
              <div key={i} style={{
                minHeight: '70px', padding: '6px', fontSize: '12px',
                background: event ? eventColors[event.type].bg : weekend ? '#f3f4f6' : 'white',
                borderLeft: event ? `3px solid ${eventColors[event.type].border}` : 'none',
                cursor: day ? 'pointer' : 'default',
                position: 'relative'
              }}
              onClick={() => day && setSelectedDay(day === selectedDay ? null : day)}>
                {day && (
                  <>
                    <div style={{
                      fontWeight: isToday ? 700 : 500,
                      color: isToday ? 'var(--primary-blue)' : weekend ? 'var(--text-light)' : 'var(--text-dark)',
                      width: isToday ? '22px' : 'auto', height: isToday ? '22px' : 'auto',
                      borderRadius: '50%', display: isToday ? 'flex' : 'block',
                      alignItems: 'center', justifyContent: 'center',
                      background: isToday ? 'var(--primary-blue-light)' : 'none'
                    }}>
                      {day}
                    </div>
                    {event && (
                      <div style={{ marginTop: '4px', fontSize: '10px', color: eventColors[event.type].text, fontWeight: 600, lineHeight: 1.2 }}>
                        {event.label}
                        <div style={{ fontWeight: 400, opacity: 0.8 }}>{event.contractor.split(' ')[0]}</div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '16px', fontSize: '12px', color: 'var(--text-medium)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#dcfce7', border: '1px solid #22c55e' }}></span> Approved
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#fef9c3', border: '1px solid #eab308' }}></span> Pending
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#fee2e2', border: '1px solid #ef4444' }}></span> Denied
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#f3f4f6', border: '1px solid #d1d5db' }}></span> Weekend
          </div>
        </div>

        {/* Selected Day Detail */}
        {selectedDay && getEventForDay(selectedDay) && (
          <div className="card" style={{ marginTop: '12px', background: '#f9fafb', padding: '12px 16px' }}>
            <strong>{monthNames[currentMonth]} {selectedDay}, {currentYear}</strong>
            <div style={{ fontSize: '13px', marginTop: '4px' }}>
              <span style={{ color: eventColors[getEventForDay(selectedDay).type].text, fontWeight: 600 }}>{getEventForDay(selectedDay).type.toUpperCase()}</span>
              {' — '}{getEventForDay(selectedDay).label} for {getEventForDay(selectedDay).contractor}
            </div>
          </div>
        )}

        <div className="modal-actions" style={{ marginTop: '16px' }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={() => alert('New NSD request form opened!')}>+ Request NSD</button>
        </div>
      </div>
    </div>
  );
}
