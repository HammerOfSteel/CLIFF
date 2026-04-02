'use client';

import { useState } from 'react';
import { mockStories } from '@/data/mockStories';
import StoryCard from '@/components/StoryCard';
import BottomNav from '@/components/BottomNav';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Create endless stories by repeating the array
  const getStoryAtIndex = (index: number) => {
    return mockStories[index % mockStories.length];
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

  const currentStory = getStoryAtIndex(currentIndex);
  const storyPosition = (currentIndex % mockStories.length) + 1;

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
          <StoryCard 
            story={currentStory} 
            onSwipe={handleSwipe}
          />
        </motion.div>
      </AnimatePresence>

      {/* Swipe Indicator */}
      <div className="absolute top-4 right-4 z-20 text-text-dim text-sm flex flex-col items-center gap-1">
        <div className="text-xs opacity-70">↑↓ Swipe</div>
        <div className="text-xs">{storyPosition} / {mockStories.length}</div>
        <div className="text-xs opacity-50">Endless 🔄</div>
      </div>

      <BottomNav activeTab="discover" />
    </main>
  );
}
