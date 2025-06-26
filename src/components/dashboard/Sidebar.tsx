
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  FileText, 
  Users, 
  Settings, 
  BarChart3,
  Upload,
  Download,
  Mail,
  CreditCard,
  UserCheck,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface SidebarProps {
  user: Profile;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ user, isOpen, onToggle }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const getNavigationItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 }
    ];

    switch (user.role) {
      case 'student':
        return [
          ...baseItems,
          { id: 'courses', label: 'My Courses', icon: BookOpen },
          { id: 'assignments', label: 'Assignments', icon: FileText },
          { id: 'grades', label: 'Grades', icon: GraduationCap },
          { id: 'attendance', label: 'Attendance', icon: UserCheck },
          { id: 'schedule', label: 'Schedule', icon: Calendar },
          { id: 'payments', label: 'Payments', icon: CreditCard },
          { id: 'announcements', label: 'Announcements', icon: Bell },
          { id: 'messages', label: 'Messages', icon: Mail }
        ];
      
      case 'teacher':
        return [
          ...baseItems,
          { id: 'my-courses', label: 'My Courses', icon: BookOpen },
          { id: 'schedule', label: 'My Schedule', icon: Calendar },
          { id: 'assignments', label: 'Assignments', icon: FileText },
          { id: 'grades', label: 'Student Grades', icon: GraduationCap },
          { id: 'materials', label: 'Course Materials', icon: Upload },
          { id: 'announcements', label: 'Announcements', icon: Bell },
          { id: 'messages', label: 'Messages', icon: Mail }
        ];
      
      case 'academic_staff':
        return [
          ...baseItems,
          { id: 'lecturers', label: 'Manage Lecturers', icon: Users },
          { id: 'timetables', label: 'Timetables', icon: Calendar },
          { id: 'students', label: 'Student Records', icon: GraduationCap },
          { id: 'courses', label: 'Course Content', icon: BookOpen },
          { id: 'attendance', label: 'Attendance', icon: UserCheck },
          { id: 'exams', label: 'Exam Schedules', icon: FileText },
          { id: 'payments', label: 'Student Payments', icon: CreditCard },
          { id: 'announcements', label: 'Announcements', icon: Bell },
          { id: 'messages', label: 'Bulk Emails', icon: Mail }
        ];
      
      case 'admin':
        return [
          ...baseItems,
          { id: 'academic-staff', label: 'Academic Staff', icon: Users },
          { id: 'lecturers', label: 'Lecturers', icon: Users },
          { id: 'students', label: 'Students', icon: GraduationCap },
          { id: 'courses', label: 'Courses', icon: BookOpen },
          { id: 'payments', label: 'Payment System', icon: CreditCard },
          { id: 'roles', label: 'User Roles', icon: Settings },
          { id: 'reports', label: 'Reports', icon: BarChart3 },
          { id: 'messages', label: 'Email System', icon: Mail }
        ];
      
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
        isOpen ? 'w-64' : 'w-16'
      } hidden lg:block`}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div>
                <h2 className="text-lg font-semibold text-gray-800">LMS</h2>
                <p className="text-sm text-gray-600">{user.full_name}</p>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 rounded-full p-0 border-2 bg-white"
            >
              {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeItem === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-10 ${
                  !isOpen ? 'px-2' : 'px-4'
                } ${
                  activeItem === item.id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setActiveItem(item.id)}
              >
                <Icon className={`h-5 w-5 ${isOpen ? 'mr-3' : ''}`} />
                {isOpen && <span className="truncate">{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onToggle} />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-50 lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">LMS</h2>
            <p className="text-sm text-gray-600">{user.full_name}</p>
          </div>
        </div>
        
        <nav className="p-4 space-y-2 overflow-y-auto h-full">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeItem === item.id ? "default" : "ghost"}
                className={`w-full justify-start h-10 px-4 ${
                  activeItem === item.id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveItem(item.id);
                  onToggle(); // Close mobile sidebar after selection
                }}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span className="truncate">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
