'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockStories } from '@/data/mockStories';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ChevronDown, Heart, Share2, Eye, Flame } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [showReactions, setShowReactions] = useState(false);

  const story = mockStories.find(s => s.id === params.id);

  if (!story) {
    return <div className="min-h-screen flex items-center justify-center">Story not found</div>;
  }

  const episode = story.episodes[currentEpisode];

  const reactions = [
    { emoji: '❤️', count: story.stats.reactions.love, label: 'Love' },
    { emoji: '😱', count: story.stats.reactions.shocked, label: 'Shocked' },
    { emoji: '🔥', count: story.stats.reactions.fire, label: 'Fire' },
    { emoji: '😭', count: story.stats.reactions.sad, label: 'Sad' },
    { emoji: '💀', count: story.stats.reactions.dead, label: 'Dead' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface/90 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-surface-variant rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Kapitel {episode.number}/{story.episodes.length}</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          <button className="p-2 hover:bg-surface-variant rounded-full transition">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-surface-variant">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentEpisode + 1) / story.episodes.length) * 100}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{episode.title}</h1>
          <div className="flex items-center gap-4 text-sm text-text-dim">
            <span>{episode.readTime} min läsning</span>
            <span>•</span>
            <span>{formatNumber(story.stats.reads)} läsningar</span>
          </div>
        </div>

        <article className="story-content mb-12">
          <ReactMarkdown>{episode.content}</ReactMarkdown>
        </article>

        {/* End of Episode */}
        <div className="border-t border-border pt-8 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Hur kände du inför kapitlet?</h3>
            <div className="flex gap-3">
              {reactions.map((reaction) => (
                <button
                  key={reaction.label}
                  className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-surface transition group"
                >
                  <span className="text-3xl group-hover:scale-125 transition">{reaction.emoji}</span>
                  <span className="text-xs text-text-dim">{formatNumber(reaction.count)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center text-sm text-text-secondary">
            Andra läsare reagerade:
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span>❤️</span>
              <span className="text-text-dim">38%</span>
            </div>
            <div className="flex items-center gap-1">
              <span>😱</span>
              <span className="text-text-dim">30%</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🔥</span>
              <span className="text-text-dim">18%</span>
            </div>
            <div className="flex items-center gap-1">
              <span>😭</span>
              <span className="text-text-dim">11%</span>
            </div>
            <div className="flex items-center gap-1">
              <span>💀</span>
              <span className="text-text-dim">3%</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-4 pt-4">
            {currentEpisode > 0 && (
              <button
                onClick={() => setCurrentEpisode(currentEpisode - 1)}
                className="flex-1 btn-secondary"
              >
                ← Föregående Kapitel
              </button>
            )}
            {currentEpisode < story.episodes.length - 1 && (
              <button
                onClick={() => setCurrentEpisode(currentEpisode + 1)}
                className="flex-1 btn-primary"
              >
                Nästa Kapitel →
              </button>
            )}
          </div>

          {currentEpisode === story.episodes.length - 1 && (
            <div className="text-center py-8">
              <p className="text-text-secondary mb-4">Du är ikapp! Ny episod kommer snart...</p>
              <button className="btn-secondary">
                Följ @{story.author}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
