import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Notes } from './pages/Notes';
import { Users } from './pages/Users';
import { Roles } from './pages/Roles';
import { Documentation } from './pages/Documentation';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useEffect } from 'react';
import { setupInitialData } from './utils/initialData';

function App() {
  useEffect(() => {
    setupInitialData();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Navigate to="/notes" replace />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notes"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Notes />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <>
                    <Navbar />
                    <Users />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/roles"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <>
                    <Navbar />
                    <Roles />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/docs"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Documentation />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;