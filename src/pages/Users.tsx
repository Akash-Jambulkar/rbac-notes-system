import { useState, useEffect } from 'react';
import { User, Role } from '../types';
import { UserPlus, Edit, Trash, Save, User as UserIcon, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [isActive, setIsActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const storedRoles = JSON.parse(localStorage.getItem('roles') || '[]');
    setUsers(storedUsers);
    setRoles(storedRoles);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      const updatedUsers = users.map(user =>
        user.id === editingUser.id
          ? { ...user, username, password: password || user.password, role: selectedRole, isActive }
          : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      toast.success('User updated successfully');
    } else {
      if (users.some(user => user.username === username)) {
        toast.error('Username already exists');
        return;
      }

      const newUser: User = {
        id: Date.now().toString(),
        username,
        password,
        role: selectedRole,
        isActive,
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      toast.success('User created successfully');
    }

    resetForm();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setUsername(user.username);
    setPassword('');
    setSelectedRole(user.role);
    setIsActive(user.isActive);
  };

  const handleDelete = (id: string) => {
    const updatedUsers = users.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    toast.success('User deleted successfully');
  };

  const resetForm = () => {
    setEditingUser(null);
    setUsername('');
    setPassword('');
    setSelectedRole('user');
    setIsActive(true);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <UserIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {editingUser ? 'Edit User' : 'Create New User'}
              </h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                placeholder="Search users by username or role..."
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-indigo-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-colors duration-200"
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password {editingUser && '(leave blank to keep current)'}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-colors duration-200"
                    placeholder={editingUser ? 'Enter new password' : 'Enter password'}
                    required={!editingUser}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-colors duration-200"
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={isActive.toString()}
                    onChange={(e) => setIsActive(e.target.value === 'true')}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-colors duration-200"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  {editingUser ? (
                    <>
                      <Save size={20} />
                      <span>Update User</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={20} />
                      <span>Create User</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Users List */}
          <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Users List</h2>
            </div>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <UserIcon size={20} className="text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{user.username}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-sm font-medium rounded-full ${
                              user.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-wrap gap-4">
                            <button
                              onClick={() => handleEdit(user)}
                              className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={18} />
                              <span>Edit</span>
                            </button>
                            {user.username !== 'admin' && (
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="flex items-center space-x-1 text-red-600 hover:text-red-900"
                              >
                                <Trash size={18} />
                                <span>Delete</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">
                    {searchQuery ? 'No users found matching your search.' : 'No users found. Create one to get started!'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};