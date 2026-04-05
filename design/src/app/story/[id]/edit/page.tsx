'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { storiesApi } from '@/lib/api';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { PenTool, Image as ImageIcon, Bold, Italic, List, ArrowLeft } from 'lucide-react';

function EditStoryPage() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.id as string;
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Story metadata
  const [title, setTitle] = useState('');
  const [hook, setHook] = useState('');
  const [genre, setGenre] = useState('');

  // Episodes
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [content, setContent] = useState('');

  // Load story data
  useEffect(() => {
    const loadStory = async () => {
      try {
        const story = await storiesApi.getById(storyId);
        setTitle(story.title);
        setHook(story.hook);
        setGenre(story.genre);
        setEpisodes(story.episodes || []);
        
        if (story.episodes && story.episodes.length > 0) {
          setEpisodeTitle(story.episodes[0].title);
          setContent(story.episodes[0].content);
        }
      } catch (err: any) {
        console.error('Error loading story:', err);
        setError('Kunde inte ladda berättelsen');
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [storyId]);

  // Update episode when selection changes
  useEffect(() => {
    if (episodes[selectedEpisode]) {
      setEpisodeTitle(episodes[selectedEpisode].title);
      setContent(episodes[selectedEpisode].content);
    }
  }, [selectedEpisode, episodes]);

  // Calculate word count and read time
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Formatting functions
  const insertFormatting = (before: string, after: string = '') => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    setContent(newText);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleBold = () => {
    insertFormatting('**', '**');
  };

  const handleItalic = () => {
    insertFormatting('*', '*');
  };

  const handleList = () => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeText = content.substring(0, start);
    const afterText = content.substring(start);

    // Check if we're at the start of a line
    const lastNewline = beforeText.lastIndexOf('\n');
    const isStartOfLine = lastNewline === beforeText.length - 1 || beforeText.length === 0;

    if (isStartOfLine) {
      setContent(beforeText + '- ' + afterText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 2, start + 2);
      }, 0);
    } else {
      setContent(beforeText + '\n- ' + afterText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + 3, start + 3);
      }, 0);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Titel krävs');
      return;
    }
    if (!hook.trim()) {
      setError('Kort beskrivning krävs');
      return;
    }
    if (!genre) {
      setError('Genre krävs');
      return;
    }
    if (!content.trim()) {
      setError('Innehåll krävs');
      return;
    }

    setSaving(true);
    setError('');

    try {
      // Update story metadata
      await storiesApi.updateStory(storyId, {
        title: title.trim(),
        hook: hook.trim(),
        genre: genre,
      });

      // Update current episode
      if (episodes[selectedEpisode]) {
        await storiesApi.updateEpisode(
          storyId,
          episodes[selectedEpisode].id,
          {
            title: episodeTitle.trim(),
            content: content.trim(),
            read_time: readTime,
          }
        );
      }

      // Redirect to the story page
      router.push(`/story/${storyId}`);
    } catch (err: any) {
      console.error('Error saving story:', err);
      setError(err.message || 'Kunde inte spara berättelsen');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="text-text-dim flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Tillbaka
          </button>
          <h1 className="text-lg font-semibold">Redigera Berättelse</h1>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="text-primary font-medium disabled:opacity-50"
          >
            {saving ? 'Sparar...' : 'Spara'}
          </button>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 mx-4 mt-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Content */}
      <main className="max-w-2xl mx-auto p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Titel *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ge din berättelse en titel..."
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kort beskrivning *</label>
          <textarea
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            placeholder="Beskriv din berättelse i en mening..."
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 h-20 resize-none focus:border-primary focus:outline-none transition"
            maxLength={150}
          />
          <div className="text-xs text-text-dim mt-1">{hook.length}/150 tecken</div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Genre *</label>
          <select 
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition"
          >
            <option value="">Välj genre...</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
            <option value="Skräck">Skräck</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Drama">Drama</option>
            <option value="Barnbok">Barnbok</option>
          </select>
        </div>

        {/* Episode Selector */}
        {episodes.length > 1 && (
          <div>
            <label className="block text-sm font-medium mb-2">Redigera episod</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {episodes.map((ep, index) => (
                <button
                  key={ep.id}
                  onClick={() => setSelectedEpisode(index)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
                    selectedEpisode === index
                      ? 'bg-primary text-white'
                      : 'bg-surface border border-border hover:border-primary'
                  }`}
                >
                  Episod {ep.episode_number}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">
              <input
                type="text"
                value={episodeTitle}
                onChange={(e) => setEpisodeTitle(e.target.value)}
                className="bg-transparent border-none focus:outline-none font-medium"
                placeholder="Episodtitel"
              />
            </label>
            <span className="text-xs text-text-dim">{wordCount} ord • ~{readTime} min</span>
          </div>

          {/* Markdown Toolbar */}
          <div className="flex gap-2 mb-2">
            <button 
              onClick={handleBold}
              className="p-2 hover:bg-surface-variant rounded transition"
              title="Fetstil (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button 
              onClick={handleItalic}
              className="p-2 hover:bg-surface-variant rounded transition"
              title="Kursiv (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button 
              onClick={handleList}
              className="p-2 hover:bg-surface-variant rounded transition"
              title="Lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Skriv din berättelse här..."
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 min-h-[400px] resize-none focus:border-primary focus:outline-none transition font-mono text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex-1 btn-primary disabled:opacity-50"
          >
            {saving ? 'Sparar...' : 'Spara ändringar'}
          </button>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">📝 Formatering</h3>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>**fetstil** = <strong>fetstil</strong></li>
            <li>*kursiv* = <em>kursiv</em></li>
            <li>- Lista för punktlistor</li>
          </ul>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}

export default withAuth(EditStoryPage);
