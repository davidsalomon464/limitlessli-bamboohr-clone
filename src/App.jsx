import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import HomeView from './components/views/HomeView';
import MyInfoView from './components/views/MyInfoView';
import PeopleView from './components/views/PeopleView';
import HiringView from './components/views/HiringView';
import ReportsView from './components/views/ReportsView';
import FilesView from './components/views/FilesView';
import CompensationView from './components/views/CompensationView';
import GlobalEmploymentView from './components/views/GlobalEmploymentView';

import TimeOffModal from './components/modals/TimeOffModal';
import RecordTrainingModal from './components/modals/RecordTrainingModal';
import NewEmployeeModal from './components/modals/NewEmployeeModal';
import UploadFileModal from './components/modals/UploadFileModal';
import AttendanceHeatmapModal from './components/modals/AttendanceHeatmapModal';
import BulkImportContractorsModal from './components/modals/BulkImportContractorsModal';
import NSDCalendarModal from './components/modals/NSDCalendarModal';
import NSDApprovalQueueModal from './components/modals/NSDApprovalQueueModal';
import OnboardingChecklistModal from './components/modals/OnboardingChecklistModal';
import ContractorTimelineModal from './components/modals/ContractorTimelineModal';
import PerformanceReviewsModal from './components/modals/PerformanceReviewsModal';
import ContractPdfGeneratorModal from './components/modals/ContractPdfGeneratorModal';
import ClientPortalModal from './components/modals/ClientPortalModal';
import SkillsMatrixModal from './components/modals/SkillsMatrixModal';
import PayStubPdfModal from './components/modals/PayStubPdfModal';
import CustomSurveyBuilderModal from './components/modals/CustomSurveyBuilderModal';
import AttendanceReconciliationModal from './components/modals/AttendanceReconciliationModal';
import TaxComplianceModal from './components/modals/TaxComplianceModal';
import SalaryBenchmarkingModal from './components/modals/SalaryBenchmarkingModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeModal, setActiveModal] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [viewAsUser, setViewAsUser] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            onRequestTimeOff={() => setActiveModal('time-off')} 
            onOpenNSDCalendar={() => setActiveModal('nsd-calendar')}
            onOpenNSDQueue={() => setActiveModal('nsd-queue')}
          />
        );
      case 'my-info':
        return (
          <MyInfoView 
            onRecordTraining={() => setActiveModal('record-training')} 
            onOpenTimeline={() => setActiveModal('timeline')}
            onOpenChecklist={() => setActiveModal('onboarding-checklist')}
            onOpenPerformance={() => setActiveModal('performance-reviews')}
          />
        );
      case 'people':
        return (
          <PeopleView 
            onNewEmployee={() => setActiveModal('new-employee')} 
            onBulkImport={() => setActiveModal('bulk-import')}
            onOpenSkillsMatrix={() => setActiveModal('skills-matrix')}
            onOpenAttendanceHeatmap={() => setActiveModal('attendance-heatmap')}
            onOpenClientPortal={() => setActiveModal('client-portal')}
            globalSearch={searchFilter}
          />
        );
      case 'hiring':
        return (
          <HiringView 
            onNewJobOpening={() => alert('New Job Opening creation wizard launched!')} 
            onOpenContractGenerator={() => setActiveModal('contract-generator')}
          />
        );
      case 'reports':
        return (
          <ReportsView 
            onOpenClientPortal={() => setActiveModal('client-portal')} 
            onOpenCustomSurvey={() => setActiveModal('custom-survey')}
          />
        );
      case 'files':
        return (
          <FilesView 
            onUploadFile={() => setActiveModal('upload-file')} 
            onOpenContractGenerator={() => setActiveModal('contract-generator')}
          />
        );
      case 'compensation':
        return (
          <CompensationView 
            onOpenContractGenerator={() => setActiveModal('contract-generator')}
            onOpenPayStub={() => setActiveModal('pay-stub')}
            onOpenSalaryBenchmarking={() => setActiveModal('salary-benchmarking')}
          />
        );
      case 'global-employment':
        return <GlobalEmploymentView onOpenTaxCompliance={() => setActiveModal('tax-compliance')} />;
      default:
        return <HomeView onRequestTimeOff={() => setActiveModal('time-off')} />;
    }
  };

  return (
    <div className={`app-container ${viewAsUser ? 'impersonation-active' : ''}`}>
      <Header 
        searchFilter={searchFilter} 
        setSearchFilter={setSearchFilter} 
        viewAsUser={viewAsUser}
        setViewAsUser={setViewAsUser}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setMobileSidebarOpen(false);
        }} 
        mobileOpen={mobileSidebarOpen}
      />
      
      <main className="main-content">
        {viewAsUser && (
          <div className="impersonation-banner">
            👁️ <strong>Admin Mode: Viewing Portal as Contractor (David Salomon)</strong> - Certain admin settings & salary edit permissions are hidden from this view.
          </div>
        )}
        {renderActiveView()}
      </main>

      {/* Modals Suite */}
      <TimeOffModal 
        isOpen={activeModal === 'time-off'} 
        onClose={() => setActiveModal(null)} 
      />

      <RecordTrainingModal 
        isOpen={activeModal === 'record-training'} 
        onClose={() => setActiveModal(null)} 
      />

      <NewEmployeeModal 
        isOpen={activeModal === 'new-employee'} 
        onClose={() => setActiveModal(null)} 
      />

      <UploadFileModal 
        isOpen={activeModal === 'upload-file'} 
        onClose={() => setActiveModal(null)} 
      />

      <AttendanceHeatmapModal
        isOpen={activeModal === 'attendance-heatmap'}
        onClose={() => setActiveModal(null)}
      />

      <BulkImportContractorsModal
        isOpen={activeModal === 'bulk-import'}
        onClose={() => setActiveModal(null)}
      />

      <NSDCalendarModal
        isOpen={activeModal === 'nsd-calendar'}
        onClose={() => setActiveModal(null)}
      />

      <NSDApprovalQueueModal
        isOpen={activeModal === 'nsd-queue'}
        onClose={() => setActiveModal(null)}
      />

      <OnboardingChecklistModal
        isOpen={activeModal === 'onboarding-checklist'}
        onClose={() => setActiveModal(null)}
      />

      <ContractorTimelineModal
        isOpen={activeModal === 'timeline'}
        onClose={() => setActiveModal(null)}
      />

      <PerformanceReviewsModal
        isOpen={activeModal === 'performance-reviews'}
        onClose={() => setActiveModal(null)}
      />

      <ContractPdfGeneratorModal
        isOpen={activeModal === 'contract-generator'}
        onClose={() => setActiveModal(null)}
      />

      <ClientPortalModal
        isOpen={activeModal === 'client-portal'}
        onClose={() => setActiveModal(null)}
      />

      <SkillsMatrixModal
        isOpen={activeModal === 'skills-matrix'}
        onClose={() => setActiveModal(null)}
      />

      <PayStubPdfModal
        isOpen={activeModal === 'pay-stub'}
        onClose={() => setActiveModal(null)}
      />

      <CustomSurveyBuilderModal
        isOpen={activeModal === 'custom-survey'}
        onClose={() => setActiveModal(null)}
      />

      <AttendanceReconciliationModal
        isOpen={activeModal === 'attendance-reconciliation'}
        onClose={() => setActiveModal(null)}
      />

      <TaxComplianceModal
        isOpen={activeModal === 'tax-compliance'}
        onClose={() => setActiveModal(null)}
      />

      <SalaryBenchmarkingModal
        isOpen={activeModal === 'salary-benchmarking'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
