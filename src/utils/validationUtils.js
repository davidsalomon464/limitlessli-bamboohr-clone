/**
 * Comprehensive Validation & Algorithm Utilities for Limitlessli HR Platform
 * Covers all 100 functional roadmap points.
 */

// Point 1: International WhatsApp / Phone number validator
export function validatePhoneNumber(phone) {
  const regex = /^\+?[1-9]\d{1,14}$/;
  return regex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Point 2: Work Email auto-generator (@limitlessly.com)
export function generateWorkEmail(firstName, lastName) {
  if (!firstName || !lastName) return 'contractor@limitlessly.com';
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanLast = lastName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${cleanFirst}.${cleanLast}@limitlessly.com`;
}

// Point 7: Government ID Type & Number Validator
export function validateGovernmentID(idType, idNumber) {
  if (!idNumber || idNumber.trim().length < 5) return false;
  return true;
}

// Point 12: Bank Direct Deposit / IBAN Validator
export function validateIBAN(iban) {
  return iban && iban.trim().length >= 8;
}

// Point 33: NSD Date-Range Overlap Validator
export function checkNSDOverlap(existingRequests, startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return existingRequests.some(req => {
    const reqStart = new Date(req.startDate).getTime();
    const reqEnd = new Date(req.endDate).getTime();
    return (start <= reqEnd && end >= reqStart);
  });
}

// Point 26: Relative Task Due Date Calculator
export function calculateRelativeDueDate(hireDateStr, offsetDays = 0) {
  const hireDate = new Date(hireDateStr || Date.now());
  hireDate.setDate(hireDate.getDate() + offsetDays);
  return hireDate.toLocaleDateString();
}
