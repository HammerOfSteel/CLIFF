'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import withAuth from '@/components/withAuth';
import BottomNav from '@/components/BottomNav';
import { Users, UserPlus, Edit2, Trash2, X, Save, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatar_url: string;
  bio: string;
  created_at: string;
}

function AdminPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    avatar_url: '',
    bio: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchUsers();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await fetch(`http://localhost:4000/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchUsers();
        setShowModal(false);
        setEditingUser(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Är du säker på att du vill ta bort denna användare?')) return;

    try {
      const response = await fetch(`http://localhost:4000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        await fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const openCreateModal = () => {
    resetForm();
    setEditingUser(null);
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email || '',
      password: '',
      role: user.role,
      avatar_url: user.avatar_url || '',
      bio: user.bio || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      role: 'user',
      avatar_url: '',
      bio: '',
    });
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">Admin Panel</h1>
                <p className="text-sm text-text-dim">Hantera användare</p>
              </div>
            </div>
            <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Skapa Användare
            </button>
          </div>
        </div>
      </header>

      {/* Users List */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-text-secondary" />
          <h2 className="text-lg font-semibold">Alla Användare ({users.length})</h2>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/20 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={user.avatar_url || `https://picsum.photos/seed/${user.username}/80/80`}
                    alt={user.username}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{user.username}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          user.role === 'admin'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-surface-variant text-text-dim'
                        }`}
                      >
                        {user.role}
                      </span>
                    </div>
                    {user.email && <p className="text-sm text-text-dim mt-1">{user.email}</p>}
                    {user.bio && <p className="text-sm text-text-secondary mt-2">{user.bio}</p>}
                    <p className="text-xs text-text-dim mt-2">
                      Skapad: {new Date(user.created_at).toLocaleDateString('sv-SE')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="p-2 rounded-xl hover:bg-surface-variant transition"
                    title="Redigera"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2 rounded-xl hover:bg-red-500/10 text-red-400 transition"
                    title="Ta bort"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface rounded-3xl p-8 max-w-md w-full border border-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {editingUser ? 'Redigera Användare' : 'Skapa Användare'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-surface-variant rounded-xl transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Användarnamn</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-surface-variant border border-border focus:border-primary outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-surface-variant border border-border focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lösenord {editingUser && '(lämna tomt för att behålla)'}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-surface-variant border border-border focus:border-primary outline-none"
                    required={!editingUser}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Roll</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-surface-variant border border-border focus:border-primary outline-none"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Avatar URL</label>
                  <input
                    type="text"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-surface-variant border border-border focus:border-primary outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-surface-variant border border-border focus:border-primary outline-none resize-none"
                    rows={3}
                  />
                </div>

                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  {editingUser ? 'Uppdatera' : 'Skapa'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab="profile" />
    </div>
  );
}

export default withAuth(AdminPage, true);
