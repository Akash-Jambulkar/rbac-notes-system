import { Book, Key, FileText, Shield, Info, Workflow, Users, Lock, Settings, ArrowRight, Code, Database, Layout, Layers } from 'lucide-react';

export const Documentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-4 sm:py-8 px-4">
      <div className="container-responsive">
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <Book className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-indigo-600" />
          </div>
          <h1 className="heading-responsive mb-2 sm:mb-4">RBAC Notes System Documentation</h1>
          <p className="text-responsive text-gray-600 max-w-2xl mx-auto">
            A comprehensive guide to the Role-Based Access Control Notes System built with React, TypeScript, and Tailwind CSS
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* Tech Stack Overview */}
          <section className="card">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Code className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <h2 className="subheading-responsive">Tech Stack</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Layout className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold">Frontend</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• React 18.3.1</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Lucide Icons</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Database className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold">Storage</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• LocalStorage</li>
                  <li>• JSON Data Structure</li>
                  <li>• State Management</li>
                  <li>• Context API</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold">Security</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Role-Based Access</li>
                  <li>• Protected Routes</li>
                  <li>• Auth Context</li>
                  <li>• Permission System</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                <div className="flex items-center space-x-3 mb-2">
                  <Layers className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold">Tools</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Vite</li>
                  <li>• ESLint</li>
                  <li>• React Router</li>
                  <li>• React Hot Toast</li>
                </ul>
              </div>
            </div>
          </section>

          {/* System Architecture */}
          <section className="card">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Workflow className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <h2 className="subheading-responsive">System Architecture</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-indigo-50/50 rounded-xl p-4 sm:p-6 border border-indigo-100">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Authentication Layer */}
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex flex-col items-center text-center">
                      <Users className="h-8 w-8 text-indigo-600 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Authentication Layer</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>User Registration</li>
                        <li>Login/Logout</li>
                        <li>Session Management</li>
                        <li>Auth Context Provider</li>
                      </ul>
                    </div>
                  </div>

                  {/* Authorization Layer */}
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex flex-col items-center text-center">
                      <Lock className="h-8 w-8 text-indigo-600 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Authorization Layer</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Role Management</li>
                        <li>Permission System</li>
                        <li>Protected Routes</li>
                        <li>Access Control</li>
                      </ul>
                    </div>
                  </div>

                  {/* Data Management */}
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex flex-col items-center text-center">
                      <Settings className="h-8 w-8 text-indigo-600 mb-3" />
                      <h3 className="font-semibold text-gray-900 mb-2">Data Management</h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>Note CRUD Operations</li>
                        <li>User Management</li>
                        <li>Role Configuration</li>
                        <li>LocalStorage Persistence</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section className="card">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Key className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <h2 className="subheading-responsive">Quick Start Guide</h2>
            </div>
            <div className="space-y-6">
              {/* Admin Credentials */}
              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-indigo-900 mb-3">Default Admin Access</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-700">Username:</p>
                    <code className="text-indigo-600">admin</code>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-medium text-gray-700">Password:</p>
                    <code className="text-indigo-600">admin123</code>
                  </div>
                </div>
              </div>

              {/* Getting Started Steps */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Getting Started</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Login</h4>
                        <p className="text-sm text-gray-600">Use admin credentials to access the system</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Create Roles</h4>
                        <p className="text-sm text-gray-600">Set up roles and permissions</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Manage Users</h4>
                        <p className="text-sm text-gray-600">Add users and assign roles</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Access Control Matrix */}
          <section className="card">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <h2 className="subheading-responsive">Access Control Matrix</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Create</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Read</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">Admin</td>
                    <td className="px-4 py-3 text-center text-green-600">✓</td>
                    <td className="px-4 py-3 text-center text-green-600">✓</td>
                    <td className="px-4 py-3 text-center text-green-600">✓</td>
                    <td className="px-4 py-3 text-center text-green-600">✓</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">User</td>
                    <td className="px-4 py-3 text-center text-green-600">✓</td>
                    <td className="px-4 py-3 text-center text-green-600">✓</td>
                    <td className="px-4 py-3 text-center text-red-600">✗</td>
                    <td className="px-4 py-3 text-center text-red-600">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Features & Components */}
          <section className="card">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <h2 className="subheading-responsive">Features & Components</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Note Management */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Note Management</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                      <span className="text-sm text-gray-700">Create, read, update, and delete notes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                      <span className="text-sm text-gray-700">Rich text editing with responsive design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                      <span className="text-sm text-gray-700">Search and filter functionality</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* User Management */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                      <span className="text-sm text-gray-700">User registration and authentication</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                      <span className="text-sm text-gray-700">Role-based access control</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                      <span className="text-sm text-gray-700">User status management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="card">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Info className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              <h2 className="subheading-responsive">Best Practices</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Security Guidelines</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                    <span className="text-sm text-gray-700">Change default admin password immediately</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                    <span className="text-sm text-gray-700">Regular permission audits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                    <span className="text-sm text-gray-700">Monitor user activities</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Usage Recommendations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                    <span className="text-sm text-gray-700">Implement clear role hierarchies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                    <span className="text-sm text-gray-700">Regular data backups</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                    <span className="text-sm text-gray-700">Maintain organized note structure</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};