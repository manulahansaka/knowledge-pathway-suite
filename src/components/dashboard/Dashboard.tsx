
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from './Sidebar';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';
import AcademicStaffDashboard from './AcademicStaffDashboard';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface DashboardProps {
  user: Profile;
}

const Dashboard = ({ user }: DashboardProps) => {
  const { signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} activeSection={activeSection} />;
      case 'teacher':
        return <TeacherDashboard user={user} activeSection={activeSection} />;
      case 'admin':
        return <AdminDashboard user={user} activeSection={activeSection} />;
      case 'academic_staff':
        return <AcademicStaffDashboard user={user} activeSection={activeSection} />;
      default:
        return <StudentDashboard user={user} activeSection={activeSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        user={user}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-auto">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;
