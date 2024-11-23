import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, User, Key, Github, Linkedin, Globe, ChevronRight, Briefcase } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/notes');
    } catch (error) {
      toast.error('Invalid credentials or inactive account');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Brand Logo */}
        <div className="absolute top-4 md:top-8 left-4 md:left-8">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white rounded-lg p-1.5 shadow-md group-hover:shadow-lg transition-all duration-200">
              <Briefcase size={24} className="text-indigo-600" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-indigo-900">AJ</span>
              <span className="text-xs text-indigo-600">RBAC System</span>
            </div>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start pt-20 md:pt-0">
          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-indigo-100">
            <div className="flex justify-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-full">
                <LogIn size={32} className="text-indigo-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Welcome Back!</h2>
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Sign In
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Documentation */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-indigo-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Start Guide</h3>
            
            <div className="space-y-6">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-900 mb-2">Default Admin Credentials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded p-3">
                    <p className="text-sm font-medium text-gray-700">Username:</p>
                    <code className="text-indigo-600">admin</code>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="text-sm font-medium text-gray-700">Password:</p>
                    <code className="text-indigo-600">admin123</code>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Available Features</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <ChevronRight size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Note Management:</span> Create, read, update, and delete notes
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ChevronRight size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">User Management:</span> Admin can manage users and their roles
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <ChevronRight size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">Role-Based Access:</span> Different permissions for different roles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://akashjambulkar.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                <Globe size={24} />
              </a>
              <a
                href="https://github.com/Akash-Jambulkar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/akash-jambulkar-akash0j/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:akashjambulkar0625@gmail.com"
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
              >
                <Mail size={24} />
              </a>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Designed & Developed by{' '}
              <a
                href="https://akashjambulkar.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700"
              >
                Akash Jambulkar
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};