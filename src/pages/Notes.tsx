import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Note, User } from '../types';
import { PlusCircle, Edit, Trash, Save, Search, Tag } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Notes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userNotes = user?.role === 'admin' 
      ? storedNotes 
      : storedNotes.filter((note: Note) => note.userId === user?.id);
    setNotes(userNotes);
    setUsers(storedUsers);
  }, [user, navigate]);

  const hasPermission = (action: 'create' | 'read' | 'update' | 'delete') => {
    if (!user) return false;
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    const userRole = roles.find((role: any) => role.name === user?.role);
    return userRole?.permissions.some((permission: any) => 
      permission.resource === 'notes' && permission.actions.includes(action)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!hasPermission('create')) {
      toast.error('You do not have permission to create notes');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      userId: user?.id || '',
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    const updatedNotes = [...notes, newNote];
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
    setTitle('');
    setContent('');
    toast.success('Note created successfully');
  };

  const handleEdit = (note: Note) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!hasPermission('update')) {
      toast.error('You do not have permission to update notes');
      return;
    }
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!hasPermission('update')) {
      toast.error('You do not have permission to update notes');
      return;
    }

    const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = allNotes.map((note: Note) => 
      note.id === editingNote?.id 
        ? { ...note, title, content }
        : note
    );
    
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(user.role === 'admin' 
      ? updatedNotes 
      : updatedNotes.filter((note: Note) => note.userId === user.id)
    );
    setEditingNote(null);
    setTitle('');
    setContent('');
    toast.success('Note updated successfully');
  };

  const handleDelete = (id: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!hasPermission('delete')) {
      toast.error('You do not have permission to delete notes');
      return;
    }

    const allNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = allNotes.filter((note: Note) => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setNotes(user.role === 'admin' 
      ? updatedNotes 
      : updatedNotes.filter((note: Note) => note.userId === user.id)
    );
    toast.success('Note deleted successfully');
  };

  const getNoteAuthor = (userId: string) => {
    return users.find(u => u.id === userId)?.username || 'Unknown User';
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getNoteAuthor(note.userId).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!hasPermission('read')) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <p className="text-responsive text-gray-600">You do not have permission to view notes.</p>
      </div>
    );
  }

  return (
    <div className="container-responsive py-4 sm:py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-primary pl-10"
            placeholder="Search notes by title, content, or author..."
          />
        </div>

        {/* Note Form */}
        <form onSubmit={editingNote ? handleUpdate : handleSubmit} className="card">
          <h2 className="heading-responsive mb-6">
            {editingNote ? 'Edit Note' : 'Create New Note'}
          </h2>
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-primary"
                placeholder="Enter note title..."
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea-primary"
                placeholder="Write your note content here..."
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              <div className="flex items-center justify-center space-x-2">
                {editingNote ? (
                  <>
                    <Save size={20} />
                    <span>Update Note</span>
                  </>
                ) : (
                  <>
                    <PlusCircle size={20} />
                    <span>Create Note</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </form>

        {/* Notes List */}
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div key={note.id} className="card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-4">
                <h3 className="subheading-responsive">{note.title}</h3>
                <div className="flex items-center space-x-2">
                  <Tag size={16} className="text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-600">
                    {getNoteAuthor(note.userId)}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                <p className="text-responsive text-gray-700 whitespace-pre-wrap">{note.content}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                <span className="text-sm text-gray-500">
                  Created: {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <button
                    onClick={() => handleEdit(note)}
                    className="icon-button text-indigo-600 hover:bg-indigo-50"
                  >
                    <div className="flex items-center space-x-1">
                      <Edit size={18} />
                      <span>Edit</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="icon-button text-red-600 hover:bg-red-50"
                  >
                    <div className="flex items-center space-x-1">
                      <Trash size={18} />
                      <span>Delete</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredNotes.length === 0 && (
            <div className="card text-center">
              <p className="text-responsive text-gray-500">
                {searchQuery ? 'No notes found matching your search.' : 'No notes yet. Start by creating one!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};