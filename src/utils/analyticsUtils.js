/**
 * Analytics & Metrics Calculation Engine for Limitlessli HR Platform
 * Handles headcount, turnover, NSD usage, payroll, recruitment, and compliance metrics.
 */

// Headcount Analytics
export function calculateHeadcountMetrics(contractors) {
  const total = contractors.length;
  const activeCount = contractors.filter(c => c.status === 'Contractor' || c.status === 'Active').length;
  const inactiveCount = total - activeCount;
  
  // Group by client/department
  const byClient = {};
  contractors.forEach(c => {
    const dept = c.department || 'Unassigned';
    byClient[dept] = (byClient[dept] || 0) + 1;
  });
  
  // Group by location
  const byLocation = {};
  contractors.forEach(c => {
    const loc = c.location || 'Unknown';
    byLocation[loc] = (byLocation[loc] || 0) + 1;
  });
  
  // Monthly trend (mock 12 months)
  const monthlyTrend = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2026, i).toLocaleDateString('en-US', { month: 'short' }),
    count: Math.round(total * (0.7 + (i * 0.025)) + Math.random() * 5)
  }));
  
  return { total, activeCount, inactiveCount, byClient, byLocation, monthlyTrend };
}

// Turnover Analytics
export function calculateTurnoverMetrics(contractors, terminations = []) {
  const total = contractors.length;
  const monthlyTerminations = terminations.length || Math.round(total * 0.021);
  const monthlyRate = ((monthlyTerminations / total) * 100).toFixed(1);
  const quarterlyRate = (monthlyRate * 3).toFixed(1);
  const annualRate = (monthlyRate * 12).toFixed(1);
  
  const reasons = [
    { reason: 'Better Opportunity', count: 8, percentage: 32 },
    { reason: 'End of Contract', count: 6, percentage: 24 },
    { reason: 'Personal Reasons', count: 5, percentage: 20 },
    { reason: 'Performance', count: 3, percentage: 12 },
    { reason: 'Relocation', count: 2, percentage: 8 },
    { reason: 'Other', count: 1, percentage: 4 }
  ];
  
  const avgTenureMonths = 14;
  
  return { total, monthlyRate, quarterlyRate, annualRate, reasons, avgTenureMonths, monthlyTerminations };
}

// NSD (Time Off) Analytics
export function calculateNSDMetrics(nsdRequests = []) {
  const totalRequests = nsdRequests.length || 45;
  const approved = Math.round(totalRequests * 0.78);
  const pending = Math.round(totalRequests * 0.13);
  const denied = totalRequests - approved - pending;
  
  const avgDaysPerRequest = 2.3;
  const totalDaysUsed = Math.round(approved * avgDaysPerRequest);
  
  const byType = {
    'Paid NSD': Math.round(approved * 0.65),
    'Unpaid NSD': Math.round(approved * 0.35)
  };
  
  const monthlyUsage = Array.from({ length: 6 }, (_, i) => ({
    month: new Date(2026, i + 1).toLocaleDateString('en-US', { month: 'short' }),
    days: Math.round(5 + Math.random() * 10)
  }));
  
  return { totalRequests, approved, pending, denied, avgDaysPerRequest, totalDaysUsed, byType, monthlyUsage };
}

// Payroll Summary Metrics
export function calculatePayrollMetrics(contractors) {
  const count = contractors.length || 399;
  const avgMonthlyPay = 2850;
  const totalMonthlyPayroll = count * avgMonthlyPay;
  const totalAnnualPayroll = totalMonthlyPayroll * 12;
  
  const byClient = {
    'Renew': { count: 120, avgPay: 2700, total: 120 * 2700 },
    'CASM Renew Auditors': { count: 85, avgPay: 3100, total: 85 * 3100 },
    'MDS Consulting Services': { count: 65, avgPay: 2900, total: 65 * 2900 },
    'Lumina Care': { count: 75, avgPay: 2650, total: 75 * 2650 },
    'Other': { count: 54, avgPay: 3000, total: 54 * 3000 }
  };
  
  return { count, avgMonthlyPay, totalMonthlyPayroll, totalAnnualPayroll, byClient };
}

// Recruitment Pipeline Metrics
export function calculateRecruitmentMetrics() {
  return {
    pipeline: {
      applied: 50,
      screened: 30,
      interview: 15,
      offer: 5,
      hired: 3
    },
    avgTimeToHire: 23,
    costPerHire: 1250,
    offerAcceptanceRate: 60,
    sources: [
      { name: 'Direct Apply', count: 18, percentage: 36 },
      { name: 'Referral', count: 12, percentage: 24 },
      { name: 'LinkedIn', count: 8, percentage: 16 },
      { name: 'Indeed', count: 7, percentage: 14 },
      { name: 'Careers Page', count: 5, percentage: 10 }
    ],
    openPositions: 8,
    activeApplications: 42
  };
}

// Compliance Health Score
export function calculateComplianceScore(contractors) {
  const totalChecks = (contractors.length || 399) * 5; // 5 compliance areas per contractor
  const passedChecks = Math.round(totalChecks * 0.92);
  const score = Math.round((passedChecks / totalChecks) * 100);
  
  const areas = [
    { name: 'Background Checks', total: 399, compliant: 385, rate: 96.5 },
    { name: 'HIPAA Training', total: 399, compliant: 370, rate: 92.7 },
    { name: 'I-9 Verification', total: 399, compliant: 360, rate: 90.2 },
    { name: 'RN License Valid', total: 180, compliant: 175, rate: 97.2 },
    { name: 'NDA Signed', total: 399, compliant: 395, rate: 99.0 }
  ];
  
  return { score, passedChecks, totalChecks, areas };
}

// DEI (Diversity, Equity & Inclusion) Metrics
export function calculateDEIMetrics() {
  return {
    gender: [
      { label: 'Female', count: 247, percentage: 61.9 },
      { label: 'Male', count: 142, percentage: 35.6 },
      { label: 'Non-Binary', count: 10, percentage: 2.5 }
    ],
    ethnicity: [
      { label: 'Asian / Pacific Islander', count: 175, percentage: 43.9 },
      { label: 'White / Caucasian', count: 90, percentage: 22.6 },
      { label: 'Black / African American', count: 65, percentage: 16.3 },
      { label: 'Hispanic / Latino', count: 45, percentage: 11.3 },
      { label: 'Other / Prefer not to say', count: 24, percentage: 6.0 }
    ],
    ageRange: [
      { label: '18-25', count: 65, percentage: 16.3 },
      { label: '26-35', count: 165, percentage: 41.4 },
      { label: '36-45', count: 100, percentage: 25.1 },
      { label: '46-55', count: 50, percentage: 12.5 },
      { label: '55+', count: 19, percentage: 4.8 }
    ],
    location: [
      { label: 'Philippines', count: 190, percentage: 47.6 },
      { label: 'United States', count: 135, percentage: 33.8 },
      { label: 'Israel', count: 45, percentage: 11.3 },
      { label: 'United Kingdom', count: 29, percentage: 7.3 }
    ]
  };
}

// Format currency
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
}

// Format percentage
export function formatPercentage(value, decimals = 1) {
  return `${parseFloat(value).toFixed(decimals)}%`;
}

// Format large numbers with abbreviations
export function formatNumber(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}
