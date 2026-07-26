export const initialUserProfile = {
  name: "David Salomon",
  title: "System Developer (Intern)",
  phone: "+972-53-223-0769",
  email: "DSalomon@limitlessli.net",
  location: "Israel",
  company: "CASM Limitlessli LLC",
  division: "CASM",
  employeeId: "# 00000410",
  hireDate: "Jun 22, 2026",
  tenureDays: "21d",
  manager: {
    name: "Yvonne Rickert",
    title: "Chief Operating Officer",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  }
};

export const initialEmployees = [
  {
    id: 1,
    name: "Abapo, Honey Jessa",
    jobTitle: "Operations",
    department: "Renew",
    status: "Contractor",
    hireDate: "02/20/2023",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Abir, Asif Ahmed",
    jobTitle: "Scribe Auditor",
    department: "CASM Renew Auditors",
    status: "Contractor",
    hireDate: "12/08/2025",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Abuan, Andrea Mae",
    jobTitle: "RAI Specialist - Auditor",
    department: "MDS Consulting Services",
    status: "Contractor",
    hireDate: "01/16/2025",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Acabo, Mary Grace",
    jobTitle: "Clinical Documentation Specialist",
    department: "Lumina Care",
    status: "Contractor",
    hireDate: "07/15/2026",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Acuba, Kelvin Jaspher",
    jobTitle: "Scheduler Assistant",
    department: "Lumina Care",
    status: "Contractor",
    hireDate: "11/17/2025",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Adabanya, Ifechukwu",
    jobTitle: "Medical Scribe",
    department: "Renew",
    status: "Contractor",
    hireDate: "04/13/2026",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  }
];

export const initialAnnouncements = [
  {
    id: 1,
    type: "task",
    title: "Valid Government Issued ID (with Photo) for David Salomon",
    subtitle: "Due Jun 22 (21 days ago)",
    isPastDue: true,
    authorPhoto: null
  },
  {
    id: 2,
    type: "announcement",
    author: "Cendz Deluta",
    title: "Knowledge Pays! Take the Limitlessli Knows Challenge & Win $25!",
    timeAgo: "4 days ago",
    authorPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    type: "new_hire",
    author: "Agie Santos",
    title: "joined Limitlessli! Get to know them.",
    timeAgo: "4 days ago",
    authorPhoto: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    type: "announcement",
    author: "Rach Vergara",
    title: "Reminder: KnowBe4 Security Awareness Training",
    timeAgo: "4 days ago",
    authorPhoto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    type: "announcement",
    author: "Hannah Paraico",
    title: "Open Positions at Limitlessli - Apply Now!",
    timeAgo: "5 days ago",
    authorPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  }
];

export const initialTrainingRecords = [
  {
    id: 1,
    title: "CASM: Harassment, Discrimination and Sexual Harassment Awareness",
    completedDate: "Completed Jun 30, 2026"
  }
];

export const fileCategories = [
  { name: "Appraisal & Promotion Letter Templates", count: 18 },
  { name: "Appraisal Letters", count: 20 },
  { name: "Certification of Work", count: 2 },
  { name: "Compliance (Training and Refresher)", count: 4 },
  { name: "Contractors Guide", count: 4 },
  { name: "Contracts CASM", count: 3 },
  { name: "Contracts SASM", count: 13 },
  { name: "Contracts SASM RPO (TIF)", count: 1 },
  { name: "Invoice Template", count: 3 },
  { name: "Loans", count: 79 },
  { name: "Maternity", count: 3 },
  { name: "Onboarding Documents", count: 0 }
];
