
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  BarChart3, 
  Settings, 
  GraduationCap, 
  BookOpen,
  CreditCard,
  Mail,
  FileText,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface AdminDashboardProps {
  user: {
    name: string;
    email: string;
  };
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  const systemMetrics = [
    { label: 'Total Users', value: 1350, change: '+5.2%', icon: Users, color: 'text-blue-600' },
    { label: 'Active Courses', value: 48, change: '+2.1%', icon: BookOpen, color: 'text-green-600' },
    { label: 'Revenue (Month)', value: '$125,430', change: '+8.7%', icon: CreditCard, color: 'text-purple-600' },
    { label: 'System Health', value: '99.8%', change: '+0.1%', icon: CheckCircle, color: 'text-emerald-600' }
  ];

  const userBreakdown = [
    { role: 'Students', count: 1250, percentage: 92.6 },
    { role: 'Teachers', count: 65, percentage: 4.8 },
    { role: 'Academic Staff', count: 25, percentage: 1.9 },
    { role: 'Administrators', count: 10, percentage: 0.7 }
  ];

  const systemAlerts = [
    { type: 'warning', message: 'Server maintenance scheduled for tomorrow', time: '2 hours ago' },
    { type: 'info', message: 'New feature rollout completed', time: '1 day ago' },
    { type: 'success', message: 'Backup completed successfully', time: '2 days ago' }
  ];

  const recentActions = [
    { action: 'Created new user role', user: 'Super Admin', time: '30 min ago' },
    { action: 'Updated payment settings', user: 'Finance Admin', time: '2 hours ago' },
    { action: 'System backup initiated', user: 'System Admin', time: '4 hours ago' },
    { action: 'New academic staff added', user: 'HR Admin', time: '1 day ago' }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'info': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold">System Administration</h1>
        <p className="text-red-100 mt-2">Welcome, {user.name}. You have full system control.</p>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">{metric.change}</span>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userBreakdown.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.role}</span>
                  <div className="text-right">
                    <span className="font-bold">{item.count}</span>
                    <span className="text-sm text-gray-500 ml-2">({item.percentage}%)</span>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Manage Academic Staff
            </Button>
            <Button className="w-full justify-start" variant="outline" size="sm">
              <GraduationCap className="h-4 w-4 mr-2" />
              Manage Students
            </Button>
            <Button className="w-full justify-start" variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              User Roles
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              General Settings
            </Button>
            <Button className="w-full justify-start" variant="outline" size="sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment System
            </Button>
            <Button className="w-full justify-start" variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Reports & Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reports & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              System Analytics
            </Button>
            <Button className="w-full justify-start" variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Usage Reports
            </Button>
            <Button className="w-full justify-start" variant="outline" size="sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Financial Reports
            </Button>
          </CardContent>
        </Card>

        {/* Course Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Course Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Manage Courses
            </Button>
            <Button className="w-full justify-start" variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Assign Lecturers
            </Button>
            <Button className="w-full justify-start" variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Course Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Recent Admin Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActions.map((action, index) => (
              <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{action.action}</p>
                  <p className="text-sm text-gray-600">by {action.user}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{action.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
