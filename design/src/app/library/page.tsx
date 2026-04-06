'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { interactionsApi } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

function LibraryPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'reading' | 'saved' | 'finished'>('reading');
  const [readingStories, setReadingStories] = useState<any[]>([]);
  const [savedStories, setSavedStories] = useState<any[]>([]);
  const [finishedStories, setFinishedStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        if (activeTab === 'reading') {
          const stories = await interactionsApi.getReadingProgress();
          setReadingStories(stories);
        } else if (activeTab === 'saved') {
          const stories = await interactionsApi.getBookmarks();
          setSavedStories(stories);
        } else if (activeTab === 'finished') {
          const stories = await interactionsApi.getFinishedStories();
          setFinishedStories(stories);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [activeTab]);

  const tabs = [
    { id: 'reading', label: t('library.reading') },
    { id: 'saved', label: t('library.saved') },
    { id: 'finished', label: t('library.finished') },
  ] as const;

  const renderStoryGrid = (stories: any[], emptyMessage: string, emptyIcon: string) => {
    if (loading) {
      return (
        <div className="flex justify-center py-8">
          <div className="animate-spin w-6 h-6 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      );
    }

    if (stories.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">{emptyIcon}</div>
          <h3 className="text-lg font-semibold mb-2">{emptyMessage}</h3>
          <p className="text-text-secondary mb-6">
            {activeTab === 'reading' ? t('library.noReading') : 
             activeTab === 'saved' ? t('library.noSaved') :
             t('library.noFinished')}
          </p>
          <Link href="/">
            <button className="btn-primary">{t('library.discover')}</button>
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4">
        {stories.map((story) => (
          <Link key={story.id} href={`/story/${story.id}`}>
            <div className="space-y-2 cursor-pointer group">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
                <Image
                  src={story.cover_image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
                {activeTab === 'reading' && story.progress_percentage && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                    <div 
                      className="h-full bg-primary"
                      style={{ width: `${story.progress_percentage}%` }}
                    />
                  </div>
                )}
              </div>
              <h3 className="font-medium text-sm line-clamp-2">{story.title}</h3>
              <div className="text-xs text-text-dim">
                {activeTab === 'reading' && story.progress_percentage ? 
                  `${Math.round(story.progress_percentage)}% avklarat` :
                  `${formatNumber(story.reads || 0)} läsningar`
                }
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold">{t('library.title')}</h1>
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
          <div>
            <h2 className="text-lg font-semibold mb-4">{t('library.reading')} ({readingStories.length})</h2>
            {renderStoryGrid(readingStories, t('library.noReading'), '📚')}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">{t('library.saved')} ({savedStories.length})</h2>
            {renderStoryGrid(savedStories, t('library.noSaved'), '🔖')}
          </div>
        )}

        {activeTab === 'finished' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">{t('library.finished')} ({finishedStories.length})</h2>
            {renderStoryGrid(finishedStories, t('library.noFinished'), '🏆')}
          </div>
        )}
      </main>

      <BottomNav activeTab="library" />
    </div>
  );
}

export default withAuth(LibraryPage);