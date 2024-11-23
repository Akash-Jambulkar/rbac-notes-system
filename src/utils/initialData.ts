import { Role, User } from '../types';

export const initialAdmin: User = {
  id: '1',
  username: 'admin',
  password: 'admin123',
  role: 'admin',
  isActive: true,
};

export const initialRoles: Role[] = [
  {
    id: '1',
    name: 'admin',
    permissions: [
      {
        resource: 'notes',
        actions: ['create', 'read', 'update', 'delete'],
      },
    ],
  },
  {
    id: '2',
    name: 'user',
    permissions: [
      {
        resource: 'notes',
        actions: ['create', 'read'],
      },
    ],
  },
];

export const setupInitialData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([initialAdmin]));
  }
  if (!localStorage.getItem('roles')) {
    localStorage.setItem('roles', JSON.stringify(initialRoles));
  }
  if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', JSON.stringify([]));
  }
};