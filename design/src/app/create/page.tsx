'use client';

import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import { PenTool, Image as ImageIcon, Bold, Italic, List } from 'lucide-react';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button className="text-text-dim">Avbryt</button>
          <h1 className="text-lg font-semibold">Ny Berättelse</h1>
          <button className="text-primary font-medium">Spara</button>
        </div>
      </header>

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
          <label className="block text-sm font-medium mb-2">Kort beskrivning</label>
          <textarea
            placeholder="Beskriv din berättelse i en mening..."
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 h-20 resize-none focus:border-primary focus:outline-none transition"
          />
          <div className="text-xs text-text-dim mt-1">0/150 tecken</div>
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
            <select className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition">
              <option>Välj genre...</option>
              <option>Romance</option>
              <option>Thriller</option>
              <option>Skräck</option>
              <option>Fantasy</option>
              <option>Sci-Fi</option>
              <option>Drama</option>
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
            <span className="text-xs text-text-dim">0 ord • ~0 min</span>
          </div>

          {/* Markdown Toolbar */}
          <div className="flex gap-2 mb-2">
            <button className="p-2 hover:bg-surface-variant rounded transition">
              <Bold className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-surface-variant rounded transition">
              <Italic className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-surface-variant rounded transition">
              <List className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-surface-variant rounded transition">
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="# Kapitel 1: Början

Det började med...

Skriv din berättelse här. Du kan använda Markdown för formatering."
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 min-h-[400px] resize-none focus:border-primary focus:outline-none transition font-mono text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button className="flex-1 btn-secondary">Förhandsgranska</button>
          <button className="flex-1 btn-primary">Publicera Kapitel 1</button>
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
      </main>

      <BottomNav activeTab="create" />
    </div>
  );
}
