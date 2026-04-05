'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { storiesApi, audioApi } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import PDFViewer from '@/components/PDFViewer';
import AudioPlayer from '@/components/AudioPlayer';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { ArrowLeft, ChevronDown, Heart, Share2, Eye, Flame } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [showReactions, setShowReactions] = useState(false);
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [audioPosition, setAudioPosition] = useState(0);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const data = await storiesApi.getById(params.id as string);
        setStory(data);
        
        // If story has audio, fetch the progress
        if (data.audio_url) {
          try {
            const progressData = await audioApi.getProgress(Number(params.id));
            setAudioPosition(progressData.audio_position || 0);
          } catch (err) {
            console.error('Error fetching audio progress:', err);
          }
        }
      } catch (err: any) {
        console.error('Error fetching story:', err);
        setError(err.message || 'Failed to load story');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchStory();
    }
  }, [params.id]);

  const handleAudioProgressUpdate = async (position: number) => {
    try {
      await audioApi.saveProgress(Number(params.id), position);
      setAudioPosition(position);
    } catch (err) {
      console.error('Error saving audio progress:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <p className="text-text-secondary mb-4">{error || 'Story not found'}</p>
        <button onClick={() => router.back()} className="btn-secondary">
          Go Back
        </button>
      </div>
    );
  }

  // Handle PDF type stories
  if (story.type === 'pdf' && story.pdf_path) {
    return (
      <div className="h-screen bg-dark flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-surface/90 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-surface-variant rounded-full transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold">{story.title}</h1>
              <p className="text-xs text-text-dim">av {story.author}</p>
            </div>

            <button className="p-2 hover:bg-surface-variant rounded-full transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden">
          <PDFViewer pdfPath={story.pdf_path} />
        </div>

        <BottomNav activeTab="library" />
      </div>
    );
  }

  // Handle text/episodic stories
  if (!story.episodes || story.episodes.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <p className="text-text-secondary mb-4">No episodes available yet</p>
        <button onClick={() => router.back()} className="btn-secondary">
          Go Back
        </button>
      </div>
    );
  }

  const episode = story.episodes[currentEpisode];

  const reactions = [
    { emoji: '❤️', count: parseInt(story.love_count as any) || 0, label: 'Love' },
    { emoji: '😱', count: parseInt(story.shocked_count as any) || 0, label: 'Shocked' },
    { emoji: '🔥', count: parseInt(story.fire_count as any) || 0, label: 'Fire' },
    { emoji: '😭', count: parseInt(story.sad_count as any) || 0, label: 'Sad' },
    { emoji: '💀', count: parseInt(story.dead_count as any) || 0, label: 'Dead' },
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
            <span className="text-sm font-medium">Kapitel {episode.episode_number}/{story.episodes.length}</span>
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
      <main className="max-w-2xl mx-auto px-6 py-8 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{episode.title}</h1>
          <div className="flex items-center gap-4 text-sm text-text-dim">
            <span>{episode.read_time} min läsning</span>
            <span>•</span>
            <span>{formatNumber(story.reads || 0)} läsningar</span>
          </div>
        </div>

        {/* Audio Player - only show if story has audio */}
        {story.audio_url && (
          <div className="mb-8">
            <AudioPlayer
              audioUrl={story.audio_url}
              storyId={story.id}
              storyTitle={story.title}
              onProgressUpdate={handleAudioProgressUpdate}
              initialPosition={audioPosition}
            />
          </div>
        )}

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

      <BottomNav activeTab="library" />
    </div>
  );
}

export default withAuth(StoryPage);
