import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ChefHatIcon } from '../components/ui/Icons';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    try {
      await register(name.trim(), email.trim());
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
            Create Profile
          </h1>
          <p className="text-xs text-text-secondary">
            Set up your student profile to personalize meal budgets and recommendations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Aarav Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="College Email"
            type="email"
            placeholder="student@campus.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button variant="primary" size="md" className="w-full justify-center" isLoading={loading}>
            Get Started
          </Button>
        </form>

        <div className="text-center text-xs text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">
            Log in
          </Link>
        </div>
      </Card>
    </div>
  );
}
