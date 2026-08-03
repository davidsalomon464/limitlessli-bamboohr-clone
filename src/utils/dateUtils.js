/**
 * Date & Calendar Utilities for Limitlessli HR Platform
 * Handles business day calculations, tenure, accruals, holidays, and formatting.
 */

// Format a date to display string
export function formatDate(date, format = 'short') {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '—';
  
  const options = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
    iso: null,
    time: { hour: '2-digit', minute: '2-digit', hour12: true },
    datetime: { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }
  };
  
  if (format === 'iso') return d.toISOString().split('T')[0];
  return d.toLocaleDateString('en-US', options[format] || options.short);
}

// Get relative time string (e.g., "3 days ago", "in 2 weeks")
export function getRelativeTime(date) {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const diffDays = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
  const isFuture = diffMs < 0;
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return isFuture ? 'Tomorrow' : 'Yesterday';
  if (diffDays < 7) return isFuture ? `In ${diffDays} days` : `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return isFuture ? `In ${weeks} week${weeks > 1 ? 's' : ''}` : `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return isFuture ? `In ${months} month${months > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return isFuture ? `In ${years} year${years > 1 ? 's' : ''}` : `${years} year${years > 1 ? 's' : ''} ago`;
}

// Calculate tenure in days, months, years
export function calculateTenure(hireDate) {
  const start = new Date(hireDate);
  const now = new Date();
  const diffMs = now - start;
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;
  
  return {
    totalDays,
    years,
    months,
    days,
    display: years > 0 
      ? `${years}y ${months}m` 
      : months > 0 
        ? `${months}m ${days}d` 
        : `${days}d`
  };
}

// Check if a date is a weekend
export function isWeekend(date) {
  const day = new Date(date).getDay();
  return day === 0 || day === 6;
}

// Count business days between two dates
export function countBusinessDays(startDate, endDate, holidays = []) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;
  const holidaySet = new Set(holidays.map(h => new Date(h).toDateString()));
  
  const current = new Date(start);
  while (current <= end) {
    if (!isWeekend(current) && !holidaySet.has(current.toDateString())) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }
  return count;
}

// Calculate NSD accrual balance
export function calculateNSDAccrual(hireDate, monthlyRate = 8, usedHours = 0, maxCarryover = 120) {
  const start = new Date(hireDate);
  const now = new Date();
  const monthsWorked = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  const totalAccrued = Math.min(monthsWorked * monthlyRate, maxCarryover);
  const available = Math.max(totalAccrued - usedHours, 0);
  
  return {
    monthsWorked,
    totalAccrued,
    usedHours,
    available,
    maxCarryover
  };
}

// Get days in a month
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// Generate calendar grid for a month
export function generateCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = getDaysInMonth(year, month);
  const grid = [];
  
  // Pad with empty days
  for (let i = 0; i < firstDay; i++) {
    grid.push(null);
  }
  
  for (let day = 1; day <= totalDays; day++) {
    grid.push(new Date(year, month, day));
  }
  
  return grid;
}

// Get the start of the current pay period (1st or 16th)
export function getCurrentPayPeriod() {
  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  if (day <= 15) {
    return {
      start: new Date(year, month, 1),
      end: new Date(year, month, 15),
      label: `${formatDate(new Date(year, month, 1))} – ${formatDate(new Date(year, month, 15))}`
    };
  }
  return {
    start: new Date(year, month, 16),
    end: new Date(year, month + 1, 0),
    label: `${formatDate(new Date(year, month, 16))} – ${formatDate(new Date(year, month + 1, 0))}`
  };
}

// Check if a date falls within a range
export function isDateInRange(date, start, end) {
  const d = new Date(date).getTime();
  return d >= new Date(start).getTime() && d <= new Date(end).getTime();
}

// Get upcoming birthdays within next N days
export function getUpcomingBirthdays(contractors, daysAhead = 30) {
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setDate(futureDate.getDate() + daysAhead);
  
  return contractors
    .filter(c => c.birthday)
    .map(c => {
      const bday = new Date(c.birthday);
      const thisYearBday = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());
      if (thisYearBday < now) thisYearBday.setFullYear(thisYearBday.getFullYear() + 1);
      return { ...c, nextBirthday: thisYearBday };
    })
    .filter(c => c.nextBirthday <= futureDate)
    .sort((a, b) => a.nextBirthday - b.nextBirthday);
}

// Get upcoming work anniversaries within next N days
export function getUpcomingAnniversaries(contractors, daysAhead = 30) {
  const now = new Date();
  const futureDate = new Date(now);
  futureDate.setDate(futureDate.getDate() + daysAhead);
  
  return contractors
    .filter(c => c.hireDate)
    .map(c => {
      const hire = new Date(c.hireDate);
      const thisYearAnniv = new Date(now.getFullYear(), hire.getMonth(), hire.getDate());
      if (thisYearAnniv < now) thisYearAnniv.setFullYear(thisYearAnniv.getFullYear() + 1);
      const yearsOfService = thisYearAnniv.getFullYear() - hire.getFullYear();
      return { ...c, nextAnniversary: thisYearAnniv, yearsOfService };
    })
    .filter(c => c.nextAnniversary <= futureDate)
    .sort((a, b) => a.nextAnniversary - b.nextAnniversary);
}
