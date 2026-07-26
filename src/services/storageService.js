/**
 * Persistent Storage Service for Limitlessli HR Platform
 * Handles local and cloud-synced storage for Contractors, Time Off, Training, and Documents.
 */

import { initialEmployees, initialTrainingRecords, initialAnnouncements } from '../data/mockData';

const KEYS = {
  CONTRACTORS: 'limitlessli_contractors_v1',
  TRAININGS: 'limitlessli_trainings_v1',
  ANNOUNCEMENTS: 'limitlessli_announcements_v1'
};

export function getStoredContractors() {
  const data = localStorage.getItem(KEYS.CONTRACTORS);
  if (!data) {
    localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(initialEmployees));
    return initialEmployees;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return initialEmployees;
  }
}

export function saveContractor(newContractor) {
  const current = getStoredContractors();
  const updated = [
    {
      id: Date.now(),
      name: `${newContractor.lastName}, ${newContractor.firstName}`,
      jobTitle: newContractor.role || 'Scribe Auditor',
      department: newContractor.client || 'Renew',
      status: newContractor.accessLevel || 'Contractor',
      hireDate: newContractor.hireDate || new Date().toLocaleDateString(),
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    ...current
  ];
  localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(updated));
  return updated;
}

export function getStoredTrainings() {
  const data = localStorage.getItem(KEYS.TRAININGS);
  if (!data) {
    localStorage.setItem(KEYS.TRAININGS, JSON.stringify(initialTrainingRecords));
    return initialTrainingRecords;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return initialTrainingRecords;
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
  return updated;
}
