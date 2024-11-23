import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, User, Key, Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.some((u: any) => u.username === username)) {
      toast.error('Username already exists');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      password,
      role: 'user',
      isActive: true,
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    toast.success('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Brand Logo */}
        <div className="absolute top-8 left-8">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white rounded-lg p-1.5 shadow-md group-hover:shadow-lg transition-all duration-200">
              <Briefcase size={24} className="text-green-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-green-900">AJ</span>
              <span className="text-xs text-green-600">RBAC System</span>
            </div>
          </Link>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <UserPlus size={32} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};