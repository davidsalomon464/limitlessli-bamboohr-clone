/**
 * Permission & RBAC Service for Limitlessli HR Platform
 * Role-based access control, permission checks, and audit logging.
 */

const ROLES_KEY = 'limitlessli_roles_v1';
const AUDIT_KEY = 'limitlessli_audit_v1';

// Default role definitions
const defaultRoles = {
  'super_admin': {
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: {
      people: ['view', 'create', 'edit', 'delete', 'export', 'impersonate'],
      hiring: ['view', 'create', 'edit', 'delete', 'export', 'approve'],
      files: ['view', 'create', 'edit', 'delete', 'export', 'sign'],
      reports: ['view', 'create', 'edit', 'delete', 'export', 'schedule'],
      compensation: ['view', 'create', 'edit', 'delete', 'export'],
      settings: ['view', 'edit', 'manage_roles', 'manage_integrations'],
      nsd: ['view', 'create', 'edit', 'approve', 'deny', 'configure_policy']
    }
  },
  'hr_admin': {
    name: 'HR Admin',
    description: 'HR management with limited admin access',
    permissions: {
      people: ['view', 'create', 'edit', 'export'],
      hiring: ['view', 'create', 'edit', 'approve'],
      files: ['view', 'create', 'edit', 'export', 'sign'],
      reports: ['view', 'create', 'export'],
      compensation: ['view', 'export'],
      settings: ['view'],
      nsd: ['view', 'create', 'edit', 'approve', 'deny']
    }
  },
  'manager': {
    name: 'Manager',
    description: 'Team management with approval permissions',
    permissions: {
      people: ['view', 'edit'],
      hiring: ['view', 'create'],
      files: ['view', 'create', 'sign'],
      reports: ['view'],
      compensation: ['view'],
      settings: [],
      nsd: ['view', 'approve', 'deny']
    }
  },
  'contractor': {
    name: 'Contractor',
    description: 'Self-service access to own profile and documents',
    permissions: {
      people: ['view'],
      hiring: [],
      files: ['view', 'sign'],
      reports: [],
      compensation: [],
      settings: [],
      nsd: ['view', 'create']
    }
  },
  'viewer': {
    name: 'Viewer',
    description: 'Read-only access to assigned areas',
    permissions: {
      people: ['view'],
      hiring: ['view'],
      files: ['view'],
      reports: ['view'],
      compensation: [],
      settings: [],
      nsd: ['view']
    }
  }
};

export function getRoles() {
  const data = localStorage.getItem(ROLES_KEY);
  if (!data) {
    localStorage.setItem(ROLES_KEY, JSON.stringify(defaultRoles));
    return defaultRoles;
  }
  try { return JSON.parse(data); } catch { return defaultRoles; }
}

export function hasPermission(roleId, module, action) {
  const roles = getRoles();
  const role = roles[roleId];
  if (!role) return false;
  return role.permissions[module]?.includes(action) || false;
}

export function getUserRole(userId) {
  // In production this would fetch from backend; for now return based on mock
  if (userId === 'admin' || userId === 'david.salomon') return 'super_admin';
  return 'contractor';
}

// Audit Log
const defaultAuditLog = [
  { id: 1, timestamp: new Date(Date.now() - 0.5 * 3600000).toISOString(), user: 'David Salomon', action: 'Login', resource: 'Portal', ip: '203.0.113.42', result: 'Success' },
  { id: 2, timestamp: new Date(Date.now() - 1 * 3600000).toISOString(), user: 'David Salomon', action: 'View', resource: 'People Directory', ip: '203.0.113.42', result: 'Success' },
  { id: 3, timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), user: 'Yvonne Rickert', action: 'Export', resource: 'Headcount Report', ip: '198.51.100.7', result: 'Success' },
  { id: 4, timestamp: new Date(Date.now() - 4 * 3600000).toISOString(), user: 'Cendz Deluta', action: 'Create', resource: 'Announcement: Knowledge Challenge', ip: '192.0.2.15', result: 'Success' },
  { id: 5, timestamp: new Date(Date.now() - 6 * 3600000).toISOString(), user: 'System', action: 'Sync', resource: 'Time Doctor API', ip: '10.0.0.1', result: 'Success' },
  { id: 6, timestamp: new Date(Date.now() - 8 * 3600000).toISOString(), user: 'Rach Vergara', action: 'Update', resource: 'Contractor Profile: Honey Jessa Abapo', ip: '198.51.100.22', result: 'Success' },
  { id: 7, timestamp: new Date(Date.now() - 12 * 3600000).toISOString(), user: 'Hannah Paraico', action: 'Create', resource: 'Job Opening: Medical Scribe', ip: '192.0.2.30', result: 'Success' },
  { id: 8, timestamp: new Date(Date.now() - 18 * 3600000).toISOString(), user: 'System', action: 'Backup', resource: 'Database Full Backup', ip: '10.0.0.1', result: 'Success' },
  { id: 9, timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), user: 'David Salomon', action: 'Sign', resource: 'Document: Harassment Training Cert', ip: '203.0.113.42', result: 'Success' },
  { id: 10, timestamp: new Date(Date.now() - 30 * 3600000).toISOString(), user: 'Yvonne Rickert', action: 'Approve', resource: 'NSD Request: Andrea Mae Abuan', ip: '198.51.100.7', result: 'Success' },
  { id: 11, timestamp: new Date(Date.now() - 48 * 3600000).toISOString(), user: 'System', action: 'Alert', resource: 'RN License Expiry Warning', ip: '10.0.0.1', result: 'Warning' },
  { id: 12, timestamp: new Date(Date.now() - 72 * 3600000).toISOString(), user: 'Unknown', action: 'Login', resource: 'Portal', ip: '104.28.55.93', result: 'Failed' },
];

export function getAuditLog() {
  const data = localStorage.getItem(AUDIT_KEY);
  if (!data) {
    localStorage.setItem(AUDIT_KEY, JSON.stringify(defaultAuditLog));
    return defaultAuditLog;
  }
  try { return JSON.parse(data); } catch { return defaultAuditLog; }
}

export function addAuditEntry(entry) {
  const log = getAuditLog();
  const newEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    result: 'Success',
    ip: '203.0.113.42',
    ...entry
  };
  const updated = [newEntry, ...log];
  localStorage.setItem(AUDIT_KEY, JSON.stringify(updated));
  return updated;
}

export function filterAuditLog(filters = {}) {
  let log = getAuditLog();
  
  if (filters.action) {
    log = log.filter(e => e.action === filters.action);
  }
  if (filters.user) {
    log = log.filter(e => e.user.toLowerCase().includes(filters.user.toLowerCase()));
  }
  if (filters.startDate) {
    log = log.filter(e => new Date(e.timestamp) >= new Date(filters.startDate));
  }
  if (filters.endDate) {
    log = log.filter(e => new Date(e.timestamp) <= new Date(filters.endDate));
  }
  if (filters.result) {
    log = log.filter(e => e.result === filters.result);
  }
  
  return log;
}
