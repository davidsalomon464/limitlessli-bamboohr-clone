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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeModal, setActiveModal] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [viewAsUser, setViewAsUser] = useState(false); // Admin "View as User" Impersonation Switcher

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onRequestTimeOff={() => setActiveModal('time-off')} />;
      case 'my-info':
        return <MyInfoView onRecordTraining={() => setActiveModal('record-training')} />;
      case 'people':
        return (
          <PeopleView 
            onNewEmployee={() => setActiveModal('new-employee')} 
            globalSearch={searchFilter}
          />
        );
      case 'hiring':
        return <HiringView onNewJobOpening={() => alert('New Job Opening creation wizard launched!')} />;
      case 'reports':
        return <ReportsView />;
      case 'files':
        return <FilesView onUploadFile={() => setActiveModal('upload-file')} />;
      case 'compensation':
        return <CompensationView />;
      case 'global-employment':
        return <GlobalEmploymentView />;
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
      />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {viewAsUser && (
          <div className="impersonation-banner">
            👁️ <strong>Admin Mode: Viewing Portal as Contractor (David Salomon)</strong> - Certain admin settings & salary edit permissions are hidden from this view.
          </div>
        )}
        {renderActiveView()}
      </main>

      {/* Modals */}
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
    </div>
  );
}
