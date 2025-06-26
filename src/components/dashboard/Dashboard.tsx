
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderDashboard = () => {
    // Create user object with name property for compatibility
    const userWithName = {
      name: user.full_name,
      email: user.email
    };

    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'teacher':
        return <TeacherDashboard user={userWithName} />;
      case 'admin':
        return <AdminDashboard user={userWithName} />;
      case 'academic_staff':
        return <AcademicStaffDashboard user={userWithName} />;
      default:
        return <StudentDashboard user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <main className="flex-1 overflow-auto">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;
