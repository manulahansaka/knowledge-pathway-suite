
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Bell, Settings, User, LogOut, Menu } from 'lucide-react';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import AcademicStaffDashboard from './AcademicStaffDashboard';
import AdminDashboard from './AdminDashboard';
import Sidebar from './Sidebar';

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'academic_staff' | 'admin';
  };
  onLogout: () => void;
}

const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'student': return 'Student';
      case 'teacher': return 'Teacher';
      case 'academic_staff': return 'Academic Staff';
      case 'admin': return 'Administrator';
      default: return role;
    }
  };

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'teacher':
        return <TeacherDashboard user={user} />;
      case 'academic_staff':
        return <AcademicStaffDashboard user={user} />;
      case 'admin':
        return <AdminDashboard user={user} />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">EduPlatform LMS</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          user={user} 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
          <div className="p-6">
            {renderDashboard()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
