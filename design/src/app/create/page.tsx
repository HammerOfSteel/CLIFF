'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { storiesApi } from '@/lib/api';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { PenTool, Image as ImageIcon, Bold, Italic, List, ArrowLeft } from 'lucide-react';

function CreatePage() {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState('');
  const [hook, setHook] = useState('');
  const [genre, setGenre] = useState('');
  const [content, setContent] = useState('');
  const [episodeTitle, setEpisodeTitle] = useState('Kapitel 1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate word count and read time
  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200)); // Assuming 200 words/min

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

  const handlePublish = async () => {
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

    setLoading(true);
    setError('');

    try {
      // First create the story
      const story = await storiesApi.createStory({
        title: title.trim(),
        hook: hook.trim(),
        genre: genre,
        status: 'ongoing',
        type: 'text',
      });

      // Then create the first episode
      await storiesApi.createEpisode(story.id, {
        title: episodeTitle.trim(),
        content: content.trim(),
        read_time: readTime,
      });

      // Redirect to the story page
      router.push(`/story/${story.id}`);
    } catch (err: any) {
      console.error('Error publishing story:', err);
      setError(err.message || 'Kunde inte publicera berättelsen');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="text-text-dim flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Avbryt
          </button>
          <h1 className="text-lg font-semibold">Ny Berättelse</h1>
          <button 
            onClick={handlePublish}
            disabled={loading}
            className="text-primary font-medium disabled:opacity-50"
          >
            {loading ? 'Publicerar...' : 'Publicera'}
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
          <label className="block text-sm font-medium mb-2">Omslagsbild</label>
          <button className="w-full h-48 bg-surface border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary transition">
            <ImageIcon className="w-8 h-8 text-text-dim" />
            <span className="text-sm text-text-secondary">Ladda upp bild</span>
            <span className="text-xs text-text-dim">Rekommenderad storlek: 800x1200px</span>
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
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

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Åldersklassning</label>
            <select className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition">
              <option>Alla (13+)</option>
              <option>Tonår (15+)</option>
              <option>Mogen (18+)</option>
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Kapitel 1</label>
            <span className="text-xs text-text-dim">{wordCount} ord • ~{readTime} min</span>
          </div>

          {/* Markdown Toolbar */}
          <div className="flex gap-2 mb-2">
            <button 
              onClick={handleBold}
              type="button"
              className="p-2 hover:bg-surface-variant rounded transition"
              title="Fetstil (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button 
              onClick={handleItalic}
              type="button"
              className="p-2 hover:bg-surface-variant rounded transition"
              title="Kursiv (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button 
              onClick={handleList}
              type="button"
              className="p-2 hover:bg-surface-variant rounded transition"
              title="Lista"
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              type="button"
              className="p-2 hover:bg-surface-variant rounded transition"
              disabled
              title="Bild (kommer snart)"
            >
              <ImageIcon className="w-4 h-4 opacity-50" />
            </button>
          </div>

          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Det började med...

Skriv din berättelse här. Håll kapitlen korta (3-5 minuter läsning) och avsluta med en cliffhanger!

**Fetstil**, *kursiv*, - listor"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 min-h-[400px] resize-none focus:border-primary focus:outline-none transition font-mono text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handlePublish}
            disabled={loading}
            className="flex-1 btn-primary disabled:opacity-50"
          >
            {loading ? 'Publicerar...' : 'Publicera Kapitel 1'}
          </button>
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">💡 Tips för att skriva bra berättelser</h3>
          <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
            <li>Håll kapitlen korta (3-5 minuter läsning)</li>
            <li>Avsluta med en cliffhanger för att hålla läsarna engagerade</li>
            <li>Använd dialog för att göra berättelsen levande</li>
            <li>Visa, berätta inte - använd sinnliga detaljer</li>
          </ul>
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

      <BottomNav activeTab="create" />
    </div>
  );
}

export default withAuth(CreatePage);
