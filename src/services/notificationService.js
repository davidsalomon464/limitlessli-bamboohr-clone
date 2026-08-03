/**
 * Notification Service for Limitlessli HR Platform
 * Manages in-app notifications, email triggers, and alert scheduling.
 */

const NOTIF_KEY = 'limitlessli_notifications_v1';

const defaultNotifications = [
  { id: 1, type: 'compliance', title: 'RN License Expiring — Sarah Mitchell', message: 'California RN License expires in 28 days. Send renewal reminder.', read: false, priority: 'high', timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), category: 'compliance' },
  { id: 2, type: 'nsd', title: 'NSD Request Pending Approval', message: 'Honey Jessa Abapo requested 2 days Paid NSD (Aug 10-11).', read: false, priority: 'medium', timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), category: 'nsd' },
  { id: 3, type: 'document', title: 'Document Requires E-Signature', message: 'Engagement Agreement for Kelvin Acuba awaiting your signature.', read: false, priority: 'medium', timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), category: 'documents' },
  { id: 4, type: 'hiring', title: 'New Candidate Application', message: 'John Rivera applied for Medical Scribe Auditor position.', read: true, priority: 'low', timestamp: new Date(Date.now() - 5 * 86400000).toISOString(), category: 'hiring' },
  { id: 5, type: 'system', title: 'Time Doctor Sync Complete', message: 'Weekly attendance data synced successfully. 2 discrepancies flagged.', read: true, priority: 'low', timestamp: new Date(Date.now() - 6 * 86400000).toISOString(), category: 'system' },
  { id: 6, type: 'payroll', title: 'Payroll Processing Reminder', message: 'July 2026 payroll closes in 3 days. Review pending timesheets.', read: false, priority: 'high', timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), category: 'payroll' },
  { id: 7, type: 'onboarding', title: 'Onboarding Task Overdue', message: 'David Salomon: Government ID upload is 21 days overdue.', read: false, priority: 'high', timestamp: new Date(Date.now() - 21 * 86400000).toISOString(), category: 'onboarding' },
  { id: 8, type: 'training', title: 'Training Completion', message: 'HIPAA Compliance training completed by Andrea Mae Abuan.', read: true, priority: 'low', timestamp: new Date(Date.now() - 4 * 86400000).toISOString(), category: 'training' },
];

export function getNotifications() {
  const data = localStorage.getItem(NOTIF_KEY);
  if (!data) {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(defaultNotifications));
    return defaultNotifications;
  }
  try { return JSON.parse(data); } catch { return defaultNotifications; }
}

export function getUnreadCount() {
  return getNotifications().filter(n => !n.read).length;
}

export function markAsRead(id) {
  const notifs = getNotifications();
  const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
  localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
  return updated;
}

export function markAllRead() {
  const notifs = getNotifications();
  const updated = notifs.map(n => ({ ...n, read: true }));
  localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
  return updated;
}

export function addNotification(notification) {
  const notifs = getNotifications();
  const newNotif = {
    id: Date.now(),
    read: false,
    timestamp: new Date().toISOString(),
    priority: 'medium',
    ...notification
  };
  const updated = [newNotif, ...notifs];
  localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteNotification(id) {
  const notifs = getNotifications();
  const updated = notifs.filter(n => n.id !== id);
  localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
  return updated;
}

export function getNotificationsByCategory(category) {
  return getNotifications().filter(n => n.category === category);
}

export function getHighPriorityNotifications() {
  return getNotifications().filter(n => n.priority === 'high' && !n.read);
}
