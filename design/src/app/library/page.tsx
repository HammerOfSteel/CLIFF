'use client';

import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import { mockStories } from '@/data/mockStories';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<'reading' | 'saved' | 'finished'>('reading');

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
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Fortsätt läsa (3)</h2>
            {mockStories.slice(0, 3).map((story) => (
              <Link key={story.id} href={`/story/${story.id}`}>
                <div className="card flex gap-4 hover:border-primary transition cursor-pointer">
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    width={80}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{story.title}</h3>
                    <p className="text-sm text-text-secondary mb-2 line-clamp-1">{story.hook}</p>
                    <div className="text-xs text-text-dim mb-2">
                      Kapitel 2/{story.episodes.length} • 67% klart
                    </div>
                    <div className="w-full bg-surface-variant h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: '67%' }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="grid grid-cols-2 gap-4">
            {mockStories.slice(0, 4).map((story) => (
              <Link key={story.id} href={`/story/${story.id}`}>
                <div className="space-y-2 cursor-pointer group">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden">
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2">{story.title}</h3>
                  <div className="text-xs text-text-dim">
                    {formatNumber(story.stats.reads)} läsningar
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'finished' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Avklarade berättelser (2)</h2>
            {mockStories.slice(0, 2).map((story) => (
              <div key={story.id} className="card">
                <div className="flex gap-4 mb-3">
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    width={60}
                    height={90}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{story.title}</h3>
                    <p className="text-sm text-text-secondary mb-2">@{story.author}</p>
                    <div className="text-xs text-state-success">✓ Avklarad</div>
                  </div>
                </div>
                <button className="w-full py-2 border border-border rounded-lg text-sm hover:bg-surface-variant transition">
                  Hitta liknande berättelser
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav activeTab="library" />
    </div>
  );
}
