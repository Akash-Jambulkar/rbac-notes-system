export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  isActive: boolean;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Permission {
  resource: 'notes';
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserSession: (updatedUser: User) => void;
}