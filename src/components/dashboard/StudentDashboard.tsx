
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, FileText, Calendar, GraduationCap, Bell, CreditCard } from 'lucide-react';
import { useStudentAssignments } from '@/hooks/useAssignments';
import { useStudentEnrollments } from '@/hooks/useEnrollments';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface StudentDashboardProps {
  user: Profile;
}

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const { data: assignments, isLoading: assignmentsLoading } = useStudentAssignments(user.id);
  const { data: enrollments, isLoading: enrollmentsLoading } = useStudentEnrollments(user.id);

  const upcomingAssignments = assignments?.filter(
    assignment => new Date(assignment.due_date) > new Date()
  ).slice(0, 5) || [];

  const activeCourses = enrollments?.filter(enrollment => enrollment.is_active) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">Welcome back, {user.full_name}!</h1>
        <p className="text-blue-100 mt-2">
          Student ID: {user.student_id} | Email: {user.email}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {enrollmentsLoading ? '...' : activeCourses.length}
            </div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {assignmentsLoading ? '...' : upcomingAssignments.length}
            </div>
            <p className="text-xs text-muted-foreground">Due soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upcoming Assignments
            </CardTitle>
            <CardDescription>
              Assignments due in the next few days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {assignmentsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : upcomingAssignments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">
                          {assignment.courses?.name} ({assignment.courses?.code})
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Due: {new Date(assignment.due_date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        new Date(assignment.due_date) < new Date(Date.now() + 24 * 60 * 60 * 1000) 
                          ? 'destructive' 
                          : 'secondary'
                      }>
                        {assignment.assignment_submissions?.[0]?.status || 'Not submitted'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming assignments</p>
            )}
          </CardContent>
        </Card>

        {/* Current Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Current Courses
            </CardTitle>
            <CardDescription>
              Your enrolled courses this semester
            </CardDescription>
          </CardHeader>
          <CardContent>
            {enrollmentsLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : activeCourses.length > 0 ? (
              <div className="space-y-3">
                {activeCourses.map((enrollment) => (
                  <div key={enrollment.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{enrollment.courses?.name}</h4>
                        <p className="text-sm text-gray-600">
                          {enrollment.courses?.code} • {enrollment.courses?.credits} credits
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Instructor: {enrollment.courses?.profiles?.full_name || 'TBA'}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        Active
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No enrolled courses</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Announcements
          </CardTitle>
          <CardDescription>
            Latest updates from your courses and the administration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Midterm Exam Schedule Released</h4>
                  <p className="text-sm text-gray-600">Academic Office</p>
                  <p className="text-xs text-gray-500 mt-1">Posted 2 days ago</p>
                </div>
                <Badge variant="secondary">General</Badge>
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">New Course Material Available</h4>
                  <p className="text-sm text-gray-600">Computer Science Department</p>
                  <p className="text-xs text-gray-500 mt-1">Posted 3 days ago</p>
                </div>
                <Badge variant="secondary">Course</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
