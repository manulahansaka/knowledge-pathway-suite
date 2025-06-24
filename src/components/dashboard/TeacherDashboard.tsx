
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap, 
  Users,
  Upload,
  Bell,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface TeacherDashboardProps {
  user: {
    name: string;
    email: string;
  };
}

const TeacherDashboard = ({ user }: TeacherDashboardProps) => {
  const courses = [
    { id: 1, name: 'Computer Science 101', students: 45, nextClass: 'Today 9:00 AM', assignments: 3 },
    { id: 2, name: 'Advanced Programming', students: 32, nextClass: 'Tomorrow 2:00 PM', assignments: 2 },
    { id: 3, name: 'Software Engineering', students: 28, nextClass: 'Wed 10:00 AM', assignments: 4 }
  ];

  const recentAssignments = [
    { id: 1, title: 'Programming Project 3', course: 'CS 101', submitted: 35, total: 45, dueDate: '2024-07-15' },
    { id: 2, title: 'Algorithm Analysis', course: 'Advanced Programming', submitted: 28, total: 32, dueDate: '2024-07-18' },
    { id: 3, title: 'System Design', course: 'Software Engineering', submitted: 25, total: 28, dueDate: '2024-07-20' }
  ];

  const todaySchedule = [
    { time: '9:00 AM', course: 'Computer Science 101', room: 'Room A-101', type: 'Lecture' },
    { time: '11:00 AM', course: 'Advanced Programming', room: 'Lab B-203', type: 'Lab Session' },
    { time: '2:00 PM', course: 'Office Hours', room: 'Office 301', type: 'Consultation' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Good morning, {user.name}!</h1>
        <p className="text-green-100 mt-2">You have 3 classes scheduled for today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Courses</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">105</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Grades</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <GraduationCap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Today</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              My Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{course.name}</h3>
                  <Badge variant="outline">{course.students} Students</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">Next Class: {course.nextClass}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-orange-600">{course.assignments} Pending Assignments</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySchedule.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{item.course}</h3>
                    <p className="text-sm text-gray-600">{item.room}</p>
                  </div>
                  <Badge variant={item.type === 'Lecture' ? 'default' : 'secondary'}>
                    {item.type}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <p className="text-sm font-medium">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Assignment Submissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{assignment.title}</h3>
                  <Badge variant={assignment.submitted === assignment.total ? 'default' : 'destructive'}>
                    {assignment.submitted}/{assignment.total}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{assignment.course}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                  <Button size="sm" variant="outline">Grade Submissions</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Course Materials
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <GraduationCap className="h-4 w-4 mr-2" />
              Enter Grades
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Post Announcement
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              View Student List
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
