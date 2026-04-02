'use client';

import { useState } from 'react';
import { Story } from '@/data/mockStories';
import { formatNumber } from '@/lib/utils';
import { Heart, Eye, Flame, BookmarkPlus, Share2, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface StoryCardProps {
  story: Story;
  onSwipe: (direction: number) => void;
}

export default function StoryCard({ story, onSwipe }: StoryCardProps) {
  const [startY, setStartY] = useState(0);
  const [showReactions, setShowReactions] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;
    
    if (Math.abs(diff) > 50) {
      onSwipe(diff > 0 ? 1 : -1);
    }
  };

  const totalReactions = Object.values(story.stats.reactions).reduce((a, b) => a + b, 0);

  return (
    <div
      className="h-full w-full relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image with Gradient */}
      <div className="absolute inset-0">
        <Image
          src={story.coverImage}
          alt={story.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 pb-24">
        {/* Author Info */}
        <div className="flex items-center gap-2 mb-4">
          <Image
            src={story.authorAvatar}
            alt={story.author}
            width={32}
            height={32}
            className="rounded-full border-2 border-primary"
          />
          <span className="text-sm font-medium text-text-primary">@{story.author}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-text-primary mb-2">
          {story.title}
        </h1>

        {/* Metadata */}
        <div className="flex items-center gap-3 text-sm text-text-secondary mb-3">
          <span className="px-3 py-1 bg-primary/20 rounded-full text-primary font-medium">
            {story.genre}
          </span>
          <span>• {story.episodes.length} episoder</span>
          <span>• {story.episodes[0].readTime} min</span>
        </div>

        {/* Hook */}
        <p className="text-text-secondary text-base mb-4 line-clamp-2">
          {story.hook}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-text-dim mb-6">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{formatNumber(story.stats.reads)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{formatNumber(totalReactions)}</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link href={`/story/${story.id}`}>
          <button className="w-full btn-primary text-center">
            Börja Läsa Episode 1 →
          </button>
        </Link>
      </div>

      {/* Side Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6">
        <button
          onClick={() => setShowReactions(!showReactions)}
          className="flex flex-col items-center gap-1 text-text-primary hover:text-primary transition"
        >
          <div className="w-12 h-12 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-xs">{formatNumber(totalReactions)}</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-text-primary hover:text-accent transition">
          <div className="w-12 h-12 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center">
            <BookmarkPlus className="w-5 h-5" />
          </div>
          <span className="text-xs">Spara</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-text-primary hover:text-secondary transition">
          <div className="w-12 h-12 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-xs">Dela</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-text-primary hover:text-text-secondary transition">
          <div className="w-12 h-12 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center">
            <Info className="w-5 h-5" />
          </div>
          <span className="text-xs">Info</span>
        </button>
      </div>

      {/* Reaction Picker (if shown) */}
      {showReactions && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute right-20 bottom-32 bg-surface/90 backdrop-blur rounded-2xl p-3 flex flex-col gap-2"
        >
          {(['❤️', '😱', '🔥', '😭', '💀'] as const).map((emoji) => (
            <button
              key={emoji}
              className="text-2xl hover:scale-125 transition"
              onClick={() => setShowReactions(false)}
            >
              {emoji}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
