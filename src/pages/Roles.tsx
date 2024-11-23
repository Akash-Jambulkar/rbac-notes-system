import { useState, useEffect } from 'react';
import { Role } from '../types';
import { ShieldPlus, Edit, Trash, Save, Shield } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState<string[]>(['read']);

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem('roles') || '[]');
    setRoles(storedRoles);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rolePermissions = [{
      resource: 'notes' as const,
      actions: permissions as ('create' | 'read' | 'update' | 'delete')[],
    }];

    if (editingRole) {
      const updatedRoles = roles.map(role =>
        role.id === editingRole.id
          ? { ...role, name, permissions: rolePermissions }
          : role
      );
      localStorage.setItem('roles', JSON.stringify(updatedRoles));
      setRoles(updatedRoles);
      toast.success('Role updated successfully');
    } else {
      if (roles.some(role => role.name === name)) {
        toast.error('Role name already exists');
        return;
      }

      const newRole: Role = {
        id: Date.now().toString(),
        name,
        permissions: rolePermissions,
      };

      const updatedRoles = [...roles, newRole];
      localStorage.setItem('roles', JSON.stringify(updatedRoles));
      setRoles(updatedRoles);
      toast.success('Role created successfully');
    }

    resetForm();
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setName(role.name);
    setPermissions(role.permissions[0].actions);
  };

  const handleDelete = (id: string) => {
    const updatedRoles = roles.filter(role => role.id !== id);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
    setRoles(updatedRoles);
    toast.success('Role deleted successfully');
  };

  const resetForm = () => {
    setEditingRole(null);
    setName('');
    setPermissions(['read']);
  };

  const handlePermissionChange = (permission: string) => {
    setPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-indigo-600" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {editingRole ? 'Edit Role' : 'Create New Role'}
              </h1>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-indigo-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-colors duration-200"
                    placeholder="Enter role name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Permissions</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['create', 'read', 'update', 'delete'].map((permission) => (
                      <label
                        key={permission}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                          permissions.includes(permission)
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-indigo-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={permissions.includes(permission)}
                          onChange={() => handlePermissionChange(permission)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm font-medium capitalize">
                          {permission}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  {editingRole ? (
                    <>
                      <Save size={20} />
                      <span>Update Role</span>
                    </>
                  ) : (
                    <>
                      <ShieldPlus size={20} />
                      <span>Create Role</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Roles List */}
          <div className="bg-white rounded-2xl shadow-xl border border-indigo-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Roles List</h2>
            </div>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Permissions
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {roles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Shield size={20} className="text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{role.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {role.permissions[0].actions.map((action) => (
                              <span
                                key={action}
                                className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full"
                              >
                                {action}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-wrap gap-4">
                            <button
                              onClick={() => handleEdit(role)}
                              className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={18} />
                              <span>Edit</span>
                            </button>
                            {role.name !== 'admin' && (
                              <button
                                onClick={() => handleDelete(role.id)}
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
              {roles.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">No roles found. Create one to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};