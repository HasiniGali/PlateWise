import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ChefHatIcon } from '../components/ui/Icons';

export function LoginPage() {
  const [email, setEmail] = useState('aarav.cse@campus.edu');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <Card padding="lg" className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto">
            <ChefHatIcon size={26} />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-text-primary tracking-tight">
            Student Login
          </h1>
          <p className="text-xs text-text-secondary">
            Sign in to access your meal preferences, budget, and saved recipes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="College Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            hint="Mock Auth enabled for frontend development"
          />

          <Button variant="primary" size="md" className="w-full justify-center" isLoading={loading}>
            Sign In to PlateWise
          </Button>
        </form>

        <div className="text-center text-xs text-text-muted">
          New here?{' '}
          <Link to="/register" className="text-primary hover:underline font-semibold">
            Create student profile
          </Link>
        </div>
      </Card>
    </div>
  );
}
