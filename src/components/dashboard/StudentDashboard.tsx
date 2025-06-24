
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap, 
  CreditCard,
  Bell,
  Download,
  Upload,
  Clock,
  CheckCircle
} from 'lucide-react';

interface StudentDashboardProps {
  user: {
    name: string;
    email: string;
  };
}

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const courses = [
    { id: 1, name: 'Computer Science 101', progress: 75, instructor: 'Dr. Smith', nextClass: 'Mon 9:00 AM' },
    { id: 2, name: 'Mathematics for Engineers', progress: 60, instructor: 'Prof. Johnson', nextClass: 'Tue 2:00 PM' },
    { id: 3, name: 'Database Systems', progress: 90, instructor: 'Dr. Brown', nextClass: 'Wed 10:00 AM' }
  ];

  const assignments = [
    { id: 1, title: 'Programming Assignment 3', course: 'CS 101', dueDate: '2024-07-15', status: 'pending' },
    { id: 2, title: 'Calculus Problem Set', course: 'Math 201', dueDate: '2024-07-18', status: 'submitted' },
    { id: 3, title: 'Database Design Project', course: 'DB 301', dueDate: '2024-07-20', status: 'pending' }
  ];

  const recentGrades = [
    { course: 'CS 101', assignment: 'Midterm Exam', grade: 'A-', points: '87/100' },
    { course: 'Math 201', assignment: 'Quiz 3', grade: 'B+', points: '85/100' },
    { course: 'DB 301', assignment: 'Project 1', grade: 'A', points: '95/100' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-blue-100 mt-2">Here's what's happening with your studies today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Enrolled Courses</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Assignments</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">A-</p>
              </div>
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance</p>
                <p className="text-2xl font-bold text-gray-900">92%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
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
                  <Badge variant="outline">{course.progress}% Complete</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor}</p>
                <p className="text-sm text-blue-600 mb-3">Next Class: {course.nextClass}</p>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Recent Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{assignment.title}</h3>
                  <Badge variant={assignment.status === 'submitted' ? 'default' : 'destructive'}>
                    {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Course: {assignment.course}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-sm text-gray-500">Due: {assignment.dueDate}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    {assignment.status === 'pending' && (
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-1" />
                        Submit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Recent Grades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{grade.course}</h3>
                  <p className="text-sm text-gray-600">{grade.assignment}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{grade.grade}</p>
                  <p className="text-sm text-gray-500">{grade.points}</p>
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
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment History
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              View Announcements
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Download Transcript
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
