'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { storiesApi } from '@/lib/api';
import StoryCard from '@/components/StoryCard';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { motion, AnimatePresence } from 'framer-motion';

interface Story {
  id: number;
  title: string;
  hook: string;
  author_id: number;
  author: string;
  author_avatar: string;
  genre: string;
  cover_image: string;
  status: string;
  type: string;
  pdf_path: string | null;
  reads: number;
  love_count: number;
  shocked_count: number;
  fire_count: number;
  sad_count: number;
  dead_count: number;
  episode_count: number;
  avg_read_time: number;
  episodes?: any[];
}

function Home() {
  const { token } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await storiesApi.getAll();
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStories();
    }
  }, [token]);

  // Create endless stories by repeating the array
  const getStoryAtIndex = (index: number) => {
    if (stories.length === 0) return null;
    return stories[index % stories.length];
  };

  const handleSwipe = (newDirection: number) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      // Swipe up - next story
      setCurrentIndex(currentIndex + 1);
    } else if (newDirection < 0 && currentIndex > 0) {
      // Swipe down - previous story (only if not at start)
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      handleSwipe(1);
    } else if (e.key === 'ArrowUp') {
      handleSwipe(-1);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background">
        <p className="text-text-secondary mb-4">Inga berättelser hittades</p>
        <BottomNav activeTab="discover" />
      </div>
    );
  }

  const currentStory = getStoryAtIndex(currentIndex);
  const storyPosition = (currentIndex % stories.length) + 1;

  // Transform API story to component format
  const transformedStory = currentStory ? {
    id: currentStory.id.toString(),
    title: currentStory.title,
    hook: currentStory.hook,
    author: currentStory.author || 'Unknown',
    authorAvatar: currentStory.author_avatar || 'https://picsum.photos/seed/default/100/100',
    genre: currentStory.genre,
    coverImage: currentStory.cover_image,
    episodes: currentStory.episode_count > 0 ? [
      {
        id: '1',
        number: 1,
        title: 'Episode 1',
        content: '',
        readTime: Math.round(currentStory.avg_read_time || 5),
        publishedAt: new Date(),
      }
    ] : [],
    stats: {
      reads: currentStory.reads || 0,
      reactions: {
        love: currentStory.love_count || 0,
        shocked: currentStory.shocked_count || 0,
        fire: currentStory.fire_count || 0,
        sad: currentStory.sad_count || 0,
        dead: currentStory.dead_count || 0,
      },
    },
    status: currentStory.status as 'ongoing' | 'completed',
    createdAt: new Date(),
    type: currentStory.type as 'text' | 'pdf',
    pdfPath: currentStory.pdf_path,
  } : null;

  return (
    <main 
      className="h-screen w-screen overflow-hidden relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ y: direction > 0 ? '100%' : '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: direction > 0 ? '-100%' : '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute inset-0"
        >
          {transformedStory && (
            <StoryCard 
              story={transformedStory} 
              onSwipe={handleSwipe}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Swipe Indicator */}
      <div className="absolute top-4 right-4 z-20 text-text-dim text-sm flex flex-col items-center gap-1">
        <div className="text-xs opacity-70">↑↓ Swipe</div>
        <div className="text-xs">{storyPosition} / {stories.length}</div>
        <div className="text-xs opacity-50">Endless 🔄</div>
      </div>

      <BottomNav activeTab="discover" />
    </main>
  );
}

export default withAuth(Home);
