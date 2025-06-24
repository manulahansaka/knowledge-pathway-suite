
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'academic_staff' | 'admin';
  } | null>(null);

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {!currentUser ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
