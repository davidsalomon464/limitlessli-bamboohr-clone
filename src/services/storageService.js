/**
 * Persistent Storage Service for Limitlessli HR Platform
 * Handles local and cloud-synced storage for Contractors, Time Off, Training, Documents, Announcements, and Blank Slate Mode.
 */

import { initialEmployees, initialTrainingRecords, initialAnnouncements } from '../data/mockData';

const KEYS = {
  CONTRACTORS: 'limitlessli_contractors_v1',
  TRAININGS: 'limitlessli_trainings_v1',
  ANNOUNCEMENTS: 'limitlessli_announcements_v1',
  BLANK_MODE: 'limitlessli_blank_mode_v1'
};

// Check if Blank Slate Mode is active
export function isBlankModeActive() {
  return localStorage.getItem(KEYS.BLANK_MODE) === 'true';
}

// Clear all content to start fresh with a blank slate
export function clearAllDataToBlank() {
  localStorage.setItem(KEYS.BLANK_MODE, 'true');
  localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify([]));
  localStorage.setItem(KEYS.TRAININGS, JSON.stringify([]));
  localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify([]));
  window.dispatchEvent(new Event('storage_updated'));
}

// Restore default demo mock data
export function restoreDemoData() {
  localStorage.removeItem(KEYS.BLANK_MODE);
  localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(initialEmployees));
  localStorage.setItem(KEYS.TRAININGS, JSON.stringify(initialTrainingRecords));
  localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(initialAnnouncements));
  window.dispatchEvent(new Event('storage_updated'));
}

export function getStoredContractors() {
  const isBlank = isBlankModeActive();
  const data = localStorage.getItem(KEYS.CONTRACTORS);
  if (!data) {
    if (isBlank) return [];
    localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(initialEmployees));
    return initialEmployees;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return isBlank ? [] : initialEmployees;
  }
}

export function saveContractor(newContractor) {
  const current = getStoredContractors();
  const updated = [
    {
      id: Date.now(),
      name: `${newContractor.lastName || ''}, ${newContractor.firstName || ''}`.trim() || newContractor.name || 'New Contractor',
      jobTitle: newContractor.role || newContractor.jobTitle || 'Scribe Auditor',
      department: newContractor.client || newContractor.department || 'Renew',
      status: newContractor.accessLevel || newContractor.status || 'Contractor',
      hireDate: newContractor.hireDate || new Date().toLocaleDateString(),
      photo: newContractor.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    ...current
  ];
  localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage_updated'));
  return updated;
}

export function getStoredTrainings() {
  const isBlank = isBlankModeActive();
  const data = localStorage.getItem(KEYS.TRAININGS);
  if (!data) {
    if (isBlank) return [];
    localStorage.setItem(KEYS.TRAININGS, JSON.stringify(initialTrainingRecords));
    return initialTrainingRecords;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return isBlank ? [] : initialTrainingRecords;
  }
}

export function saveTraining(newTraining) {
  const current = getStoredTrainings();
  const updated = [
    {
      id: Date.now(),
      title: newTraining.title,
      completedDate: `Completed ${newTraining.date || new Date().toLocaleDateString()}`
    },
    ...current
  ];
  localStorage.setItem(KEYS.TRAININGS, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage_updated'));
  return updated;
}

export function getStoredAnnouncements() {
  const isBlank = isBlankModeActive();
  const data = localStorage.getItem(KEYS.ANNOUNCEMENTS);
  if (!data) {
    if (isBlank) return [];
    localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(initialAnnouncements));
    return initialAnnouncements;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return isBlank ? [] : initialAnnouncements;
  }
}

export function saveAnnouncement(newAnnouncement) {
  const current = getStoredAnnouncements();
  const updated = [
    {
      id: Date.now(),
      type: newAnnouncement.type || 'announcement',
      author: newAnnouncement.author || 'Admin',
      title: newAnnouncement.title,
      timeAgo: 'Just now',
      authorPhoto: newAnnouncement.authorPhoto || null
    },
    ...current
  ];
  localStorage.setItem(KEYS.ANNOUNCEMENTS, JSON.stringify(updated));
  window.dispatchEvent(new Event('storage_updated'));
  return updated;
}
