
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStudentEnrollments } from '@/hooks/useEnrollments';
import { useStudentAssignments } from '@/hooks/useAssignments';
import { BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface StudentDashboardProps {
  user: Profile;
  activeSection: string;
}

const StudentDashboard = ({ user, activeSection }: StudentDashboardProps) => {
  const { data: enrollments, isLoading: enrollmentsLoading } = useStudentEnrollments(user.id);
  const { data: assignments, isLoading: assignmentsLoading } = useStudentAssignments(user.id);

  if (activeSection === 'overview') {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.full_name}!</h1>
          <p className="text-gray-600">Here's what's happening in your courses today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrollmentsLoading ? '...' : enrollments?.length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assignmentsLoading ? '...' : assignments?.filter(a => !a.submission?.length).length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assignmentsLoading ? '...' : assignments?.filter(a => a.submission?.length > 0).length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {assignmentsLoading ? '...' : assignments?.filter(a => 
                  new Date(a.due_date) < new Date() && !a.submission?.length
                ).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>My Courses</CardTitle>
              <CardDescription>Your enrolled courses for this semester</CardDescription>
            </CardHeader>
            <CardContent>
              {enrollmentsLoading ? (
                <p>Loading courses...</p>
              ) : enrollments?.length === 0 ? (
                <p className="text-gray-500">No courses enrolled yet.</p>
              ) : (
                <div className="space-y-3">
                  {enrollments?.slice(0, 5).map((enrollment) => (
                    <div key={enrollment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">{enrollment.course?.name}</h4>
                        <p className="text-sm text-gray-600">{enrollment.course?.code}</p>
                      </div>
                      <Badge variant="secondary">{enrollment.course?.credits} Credits</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Assignments due soon</CardDescription>
            </CardHeader>
            <CardContent>
              {assignmentsLoading ? (
                <p>Loading assignments...</p>
              ) : assignments?.filter(a => new Date(a.due_date) > new Date()).length === 0 ? (
                <p className="text-gray-500">No upcoming assignments.</p>
              ) : (
                <div className="space-y-3">
                  {assignments
                    ?.filter(a => new Date(a.due_date) > new Date())
                    .slice(0, 5)
                    .map((assignment) => (
                      <div key={assignment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-gray-600">{assignment.course?.name}</p>
                        </div>
                        <Badge variant={
                          new Date(assignment.due_date) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                            ? "destructive" : "secondary"
                        }>
                          Due: {new Date(assignment.due_date).toLocaleDateString()}
                        </Badge>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // You can add other sections like 'courses', 'assignments', 'grades', etc.
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      </h1>
      <p>This section is under development.</p>
    </div>
  );
};

export default StudentDashboard;
