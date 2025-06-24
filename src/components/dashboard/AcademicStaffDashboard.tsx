
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  FileText, 
  GraduationCap, 
  BookOpen,
  Upload,
  Bell,
  UserCheck,
  CreditCard,
  Mail,
  BarChart3
} from 'lucide-react';

interface AcademicStaffDashboardProps {
  user: {
    name: string;
    email: string;
  };
}

const AcademicStaffDashboard = ({ user }: AcademicStaffDashboardProps) => {
  const systemStats = [
    { label: 'Total Lecturers', value: 24, icon: Users, color: 'text-blue-600' },
    { label: 'Active Students', value: 1250, icon: GraduationCap, color: 'text-green-600' },
    { label: 'Course Subjects', value: 48, icon: BookOpen, color: 'text-purple-600' },
    { label: 'Pending Payments', value: 23, icon: CreditCard, color: 'text-orange-600' }
  ];

  const recentActivities = [
    { action: 'Added new lecturer', details: 'Dr. Emily Chen - Computer Science', time: '2 hours ago', type: 'lecturer' },
    { action: 'Updated timetable', details: 'CS-301 Database Systems', time: '4 hours ago', type: 'schedule' },
    { action: 'Student enrollment', details: '15 new students enrolled', time: '1 day ago', type: 'student' },
    { action: 'Payment processed', details: 'Semester fees for 45 students', time: '2 days ago', type: 'payment' }
  ];

  const upcomingTasks = [
    { task: 'Review lecturer applications', priority: 'high', dueDate: 'Today' },
    { task: 'Update exam timetable', priority: 'medium', dueDate: 'Tomorrow' },
    { task: 'Process student transcripts', priority: 'low', dueDate: 'This week' },
    { task: 'Send bulk email to students', priority: 'medium', dueDate: 'Friday' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <p className="text-purple-100 mt-2">Academic Staff Dashboard - Manage your institution efficiently.</p>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{activity.action}</h3>
                  <Badge variant="outline">{activity.type}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{task.task}</h3>
                  <Badge variant={getPriorityColor(task.priority) as any}>
                    {task.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Lecturer Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Lecturer Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Add New Lecturer
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Update Lecturer Details
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Manage Schedules
            </Button>
          </CardContent>
        </Card>

        {/* Student Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Student Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <GraduationCap className="h-4 w-4 mr-2" />
              Add New Student
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <UserCheck className="h-4 w-4 mr-2" />
              Manage Attendance
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Update Records
            </Button>
          </CardContent>
        </Card>

        {/* Course Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Course Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Manage Course Content
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Materials
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Update Timetables
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Communication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Post Announcements
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Bulk Emails
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Financial Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Manage Student Payments
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Payment Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AcademicStaffDashboard;
