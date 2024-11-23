import { useAuth } from '../contexts/AuthContext';
import { LogOut, FileText, Users, Shield, Book, Menu, X, Briefcase } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive(to)
          ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg'
          : 'text-gray-300 hover:bg-indigo-600/80 hover:text-white hover:shadow-md'
      }`}
      onClick={() => setIsOpen(false)}
    >
      <Icon size={20} />
      <span className="font-medium">{children}</span>
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-white rounded-lg p-1.5">
                <Briefcase size={24} className="text-indigo-600" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight">AJ</span>
                <span className="text-xs text-indigo-300">RBAC System</span>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 ml-8 pl-8 border-l border-indigo-700">
              <NavLink to="/notes" icon={FileText}>Notes</NavLink>
              <NavLink to="/docs" icon={Book}>Docs</NavLink>
              {user?.role === 'admin' && (
                <>
                  <NavLink to="/users" icon={Users}>Users</NavLink>
                  <NavLink to="/roles" icon={Shield}>Roles</NavLink>
                </>
              )}
            </div>
          </div>

          {/* User Info and Logout - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-indigo-700/50 px-4 py-2 rounded-lg border border-indigo-600">
                <Users size={16} className="text-indigo-300" />
                <span className="text-sm font-medium">{user?.username}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-indigo-900/95 backdrop-blur-sm">
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white p-2"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 px-4 pb-6 overflow-y-auto">
              <div className="flex flex-col space-y-2">
                <NavLink to="/notes" icon={FileText}>Notes</NavLink>
                <NavLink to="/docs" icon={Book}>Docs</NavLink>
                {user?.role === 'admin' && (
                  <>
                    <NavLink to="/users" icon={Users}>Users</NavLink>
                    <NavLink to="/roles" icon={Shield}>Roles</NavLink>
                  </>
                )}
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center bg-indigo-700/50 px-4 py-3 rounded-lg border border-indigo-600">
                  <Users size={16} className="text-indigo-300 mr-2" />
                  <span className="text-sm font-medium">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-600 px-4 py-3 rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};