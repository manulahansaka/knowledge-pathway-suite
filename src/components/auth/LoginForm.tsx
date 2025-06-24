
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, GraduationCap } from 'lucide-react';

interface LoginFormProps {
  onLogin: (userData: any) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<string>('');

  // Demo users for different roles
  const demoUsers = {
    student: { id: '1', name: 'John Smith', email: 'john@student.edu', role: 'student' as const },
    teacher: { id: '2', name: 'Dr. Sarah Johnson', email: 'sarah@teacher.edu', role: 'teacher' as const },
    academic_staff: { id: '3', name: 'Prof. Michael Brown', email: 'michael@academic.edu', role: 'academic_staff' as const },
    admin: { id: '4', name: 'Admin User', email: 'admin@lms.edu', role: 'admin' as const }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role && demoUsers[role as keyof typeof demoUsers]) {
      onLogin(demoUsers[role as keyof typeof demoUsers]);
    }
  };

  const handleDemoLogin = (userRole: keyof typeof demoUsers) => {
    onLogin(demoUsers[userRole]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <BookOpen className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">EduPlatform LMS</h1>
          <p className="text-gray-600 mt-2">Learning Management System</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-800">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label>Select Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="academic_staff">Academic Staff</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={!role}
              >
                Sign In
              </Button>
            </form>

            {/* Demo Login Buttons */}
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 text-center mb-3">Quick Demo Access:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('student')}
                  className="text-xs"
                >
                  Student Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('teacher')}
                  className="text-xs"
                >
                  Teacher Demo
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('academic_staff')}
                  className="text-xs"
                >
                  Academic Staff
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="text-xs"
                >
                  Admin Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
