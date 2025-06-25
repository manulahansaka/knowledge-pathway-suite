
import { useAuth } from '@/hooks/useAuth';
import LoginForm from './LoginForm';
import Dashboard from '@/components/dashboard/Dashboard';
import { Loader2 } from 'lucide-react';

const AuthGuard = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user || !profile) {
    return <LoginForm />;
  }

  return <Dashboard user={profile} />;
};

export default AuthGuard;
