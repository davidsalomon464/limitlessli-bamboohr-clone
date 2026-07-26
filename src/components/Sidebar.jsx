import React from 'react';
import { 
  Home, 
  User, 
  Users, 
  Briefcase, 
  PieChart, 
  FileText, 
  DollarSign, 
  Globe,
  UserCircle,
  Menu
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'my-info', label: 'My Info', icon: User },
    { id: 'people', label: 'People', icon: Users },
    { id: 'hiring', label: 'Hiring', icon: Briefcase },
    { id: 'reports', label: 'Reports', icon: PieChart },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'compensation', label: 'Compensation', icon: DollarSign },
    { id: 'global-employment', label: 'Global Employment', icon: Globe },
  ];

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <ul className="nav-list">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <li key={item.id}>
              <a 
                href={`#${item.id}`}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="sidebar-bottom">
        <button className="sidebar-icon-btn" title="User Profile" onClick={() => setActiveTab('my-info')}>
          <UserCircle size={22} />
        </button>
      </div>
    </aside>
  );
}
