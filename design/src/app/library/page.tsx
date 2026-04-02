'use client';

import { useState, useEffect } from 'react';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { interactionsApi } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

function LibraryPage() {
  const [activeTab, setActiveTab] = useState<'reading' | 'saved' | 'finished'>('reading');
  const [savedStories, setSavedStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedStories = async () => {
      if (activeTab === 'saved') {
        setLoading(true);
        try {
          const stories = await interactionsApi.getBookmarks();
          setSavedStories(stories);
        } catch (error) {
          console.error('Error fetching bookmarks:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSavedStories();
  }, [activeTab]);

  const tabs = [
    { id: 'reading', label: 'Läser' },
    { id: 'saved', label: 'Sparade' },
    { id: 'finished', label: 'Avklarade' },
  ] as const;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Mitt Bibliotek</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-dim hover:text-text-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        {activeTab === 'reading' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-lg font-semibold mb-2">Ingen läshistorik än</h3>
            <p className="text-text-secondary mb-6">
              Börja läsa berättelser så visas de här
            </p>
            <Link href="/">
              <button className="btn-primary">Upptäck Berättelser</button>
            </Link>
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Sparade berättelser ({savedStories.length})</h2>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : savedStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {savedStories.map((story) => (
                  <Link key={story.id} href={`/story/${story.id}`}>
                    <div className="space-y-2 cursor-pointer group">
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
                        <Image
                          src={story.cover_image}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <h3 className="font-medium text-sm line-clamp-2">{story.title}</h3>
                      <div className="text-xs text-text-dim">
                        {formatNumber(story.reads || 0)} läsningar
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary mb-4">Inga sparade berättelser än</p>
                <Link href="/">
                  <button className="btn-secondary">Upptäck Berättelser</button>
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'finished' && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold mb-2">Inga avklarade berättelser än</h3>
            <p className="text-text-secondary mb-6">
              Läs klart berättelser så visas de här
            </p>
            <Link href="/">
              <button className="btn-primary">Upptäck Berättelser</button>
            </Link>
          </div>
        )}
      </main>

      <BottomNav activeTab="library" />
    </div>
  );
}

export default withAuth(LibraryPage);