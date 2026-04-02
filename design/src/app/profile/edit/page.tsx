'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { profileApi } from '@/lib/api';
import withAuth from '@/components/withAuth';
import { ArrowLeft, Camera, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

function EditProfilePage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    avatar_url: user?.avatar_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await profileApi.updateProfile(user.id, formData);
      
      // Update user in localStorage
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSuccess('Profil uppdaterad!');
      setTimeout(() => {
        router.push('/profile');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Kunde inte uppdatera profil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-surface-variant rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Redigera Profil</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={formData.avatar_url || `https://picsum.photos/seed/${formData.username}/200/200`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-primary"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-3 bg-primary rounded-full hover:bg-primary/80 transition"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-text-dim text-center">
              Klicka för att ändra profilbild
            </p>
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block text-sm font-medium mb-2">Avatar URL</label>
            <input
              type="text"
              value={formData.avatar_url}
              onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">Användarnamn</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
              rows={4}
              placeholder="Berätta om dig själv..."
            />
            <p className="text-xs text-text-dim mt-1">
              {formData.bio.length} / 200 tecken
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
            >
              {success}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-text/20 border-t-text rounded-full animate-spin" />
                Sparar...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Spara Ändringar
              </>
            )}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full btn-secondary flex items-center justify-center gap-2 py-4"
          >
            <X className="w-5 h-5" />
            Avbryt
          </button>
        </form>
      </main>
    </div>
  );
}

export default withAuth(EditProfilePage);
