'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storiesApi } from '@/lib/api';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { ArrowLeft, Edit, Eye, Heart, Plus } from 'lucide-react';
import Link from 'next/link';

function MyStoriesPage() {
  const router = useRouter();
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const userStories = await storiesApi.getMyStories();
        setStories(userStories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-surface-variant rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Mina Berättelser</h1>
          <Link href="/create">
            <button className="p-2 hover:bg-surface-variant rounded-full transition text-primary">
              <Plus className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold mb-2">Börja Skriva</h2>
            <p className="text-text-secondary mb-6">
              Du har inte skapat några berättelser än.<br />
              Dela dina berättelser med världen!
            </p>
            <Link href="/create">
              <button className="btn-primary">
                Skapa Din Första Berättelse
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-1">Alla berättelser ({stories.length})</h2>
              <p className="text-sm text-text-dim">Hantera och redigera dina publicerade berättelser</p>
            </div>

            <div className="space-y-4">
              {stories.map((story) => (
                <div key={story.id} className="bg-surface rounded-xl border border-border p-4 hover:border-primary transition">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <Link href={`/story/${story.id}`}>
                        <h3 className="font-semibold text-lg mb-1 hover:text-primary transition">
                          {story.title}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                        {story.hook}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-text-dim mb-3">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                          {story.genre}
                        </span>
                        <span>{story.episode_count} episoder</span>
                        <span className={`${story.status === 'ongoing' ? 'text-green-500' : 'text-text-dim'}`}>
                          {story.status === 'ongoing' ? 'Pågående' : 'Avslutad'}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-text-dim">
                          <Eye className="w-4 h-4" />
                          <span>{story.reads || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 text-text-dim">
                          <Heart className="w-4 h-4" />
                          <span>{parseInt(story.love_count as any) || 0}</span>
                        </div>
                      </div>
                    </div>

                    <Link href={`/story/${story.id}/edit`}>
                      <button className="p-3 hover:bg-surface-variant rounded-lg transition text-primary">
                        <Edit className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/create">
              <button className="w-full mt-6 py-4 border-2 border-dashed border-border rounded-xl text-text-secondary hover:border-primary hover:text-primary transition flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Skapa Ny Berättelse
              </button>
            </Link>
          </div>
        )}
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}

export default withAuth(MyStoriesPage);
