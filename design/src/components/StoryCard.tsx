'use client';

import { useState, useEffect } from 'react';
import { Story } from '@/data/mockStories';
import { interactionsApi } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import { Heart, Eye, Flame, BookmarkPlus, Bookmark, Share2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface StoryCardProps {
  story: Story;
  onSwipe: (direction: number) => void;
}

export default function StoryCard({ story, onSwipe }: StoryCardProps) {
  const [startY, setStartY] = useState(0);
  const [showReactions, setShowReactions] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userReactions, setUserReactions] = useState<string[]>([]);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [reactionCounts, setReactionCounts] = useState(story.stats.reactions);

  useEffect(() => {
    // Fetch user's bookmark and reaction status
    const fetchUserInteractions = async () => {
      try {
        const [bookmarked, reactions] = await Promise.all([
          interactionsApi.isBookmarked(parseInt(story.id)),
          interactionsApi.getUserReaction(parseInt(story.id)),
        ]);
        setIsBookmarked(bookmarked);
        setUserReactions(reactions);
      } catch (error) {
        console.error('Error fetching user interactions:', error);
      }
    };

    fetchUserInteractions();
  }, [story.id]);

  const handleReaction = async (reactionType: string) => {
    try {
      await interactionsApi.addReaction(parseInt(story.id), reactionType);
      
      // Update local reaction counts
      const wasActive = userReactions.includes(reactionType);
      
      setReactionCounts(prev => {
        const key = reactionType as keyof typeof prev;
        const currentCount = prev[key];
        const newCount = wasActive ? Math.max(0, currentCount - 1) : currentCount + 1;
        
        return {
          ...prev,
          [key]: newCount
        };
      });
      
      // Toggle reaction in local state
      if (wasActive) {
        setUserReactions(userReactions.filter(r => r !== reactionType));
      } else {
        setUserReactions([...userReactions, reactionType]);
      }
      setShowReactions(false);
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      const result = await interactionsApi.toggleBookmark(parseInt(story.id));
      setIsBookmarked(result.bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/story/${story.id}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: story.title,
          text: story.hook,
          url: url,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(url);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

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

  const totalReactions = Object.values(reactionCounts).reduce((a, b) => a + b, 0);

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
          {story.episodes && story.episodes.length > 0 && (
            <>
              <span>• {story.episodes.length} episoder</span>
              <span>• {story.episodes[0]?.readTime || 5} min</span>
            </>
          )}
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
          <div className={`w-12 h-12 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center ${userReactions.length > 0 ? 'ring-2 ring-primary' : ''}`}>
            <Heart className={`w-5 h-5 ${userReactions.length > 0 ? 'fill-primary text-primary' : ''}`} />
          </div>
          <span className="text-xs">{formatNumber(totalReactions)}</span>
        </button>

        <button 
          onClick={handleBookmark}
          className="flex flex-col items-center gap-1 text-text-primary hover:text-accent transition"
        >
          <div className="w-12 h-12 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center">
            {isBookmarked ? (
              <Bookmark className="w-5 h-5 fill-accent text-accent" />
            ) : (
              <BookmarkPlus className="w-5 h-5" />
            )}
          </div>
          <span className="text-xs">{isBookmarked ? 'Sparad' : 'Spara'}</span>
        </button>

        <button 
          onClick={handleShare}
          className="flex flex-col items-center gap-1 text-text-primary hover:text-secondary transition relative"
        >
          <div className="w-12 h-12 bg-surface/80 backdrop-blur rounded-full flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-xs">Dela</span>
          {shareSuccess && (
            <div className="absolute -top-8 right-0 bg-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Kopierad!
            </div>
          )}
        </button>

        <button 
          onClick={() => setShowInfo(true)}
          className="flex flex-col items-center gap-1 text-text-primary hover:text-text-secondary transition"
        >
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
          {[
            { emoji: '❤️', type: 'love' },
            { emoji: '😱', type: 'shocked' },
            { emoji: '🔥', type: 'fire' },
            { emoji: '😭', type: 'sad' },
            { emoji: '💀', type: 'dead' },
          ].map(({ emoji, type }) => (
            <button
              key={type}
              className={`text-2xl hover:scale-125 transition ${userReactions.includes(type) ? 'ring-2 ring-primary rounded-lg' : ''}`}
              onClick={() => handleReaction(type)}
            >
              {emoji}
            </button>
          ))}
        </motion.div>
      )}

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-lg z-30 flex items-end"
            onClick={() => setShowInfo(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="w-full bg-surface rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Om berättelsen</h2>
                <button
                  onClick={() => setShowInfo(false)}
                  className="p-2 hover:bg-surface-variant rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Cover Image */}
                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title & Author */}
                <div>
                  <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                  <div className="flex items-center gap-2">
                    <Image
                      src={story.authorAvatar}
                      alt={story.author}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-sm text-text-secondary">av @{story.author}</span>
                  </div>
                </div>

                {/* Hook */}
                <div>
                  <h4 className="text-sm font-semibold text-text-dim mb-2">BESKRIVNING</h4>
                  <p className="text-text-secondary">{story.hook}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-background rounded-xl">
                    <div className="text-2xl font-bold">{formatNumber(story.stats.reads)}</div>
                    <div className="text-xs text-text-dim">Läsningar</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-xl">
                    <div className="text-2xl font-bold">{story.episodes?.length || 0}</div>
                    <div className="text-xs text-text-dim">Episoder</div>
                  </div>
                  <div className="text-center p-4 bg-background rounded-xl">
                    <div className="text-2xl font-bold">{formatNumber(totalReactions)}</div>
                    <div className="text-xs text-text-dim">Reaktioner</div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-text-dim">Genre</span>
                    <span className="font-medium">{story.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-dim">Status</span>
                    <span className="font-medium">{story.status === 'ongoing' ? 'Pågående' : 'Avslutad'}</span>
                  </div>
                  {story.episodes && story.episodes.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-text-dim">Lästid per episod</span>
                      <span className="font-medium">~{story.episodes[0]?.readTime || 5} min</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Link href={`/story/${story.id}`}>
                  <button className="w-full btn-primary" onClick={() => setShowInfo(false)}>
                    Börja Läsa →
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
