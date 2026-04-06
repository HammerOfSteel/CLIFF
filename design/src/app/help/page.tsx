'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { ArrowLeft, ChevronDown, ChevronUp, Mail, Book, Shield } from 'lucide-react';

function HelpPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = language === 'sv' ? [
    {
      question: 'Hur börjar jag läsa en berättelse?',
      answer: 'Gå till "Upptäck"-fliken och bläddra genom berättelser. Tryck på en berättelse för att se mer information, sedan tryck på "Börja Läsa" för att starta.'
    },
    {
      question: 'Kan jag spara min läsposition?',
      answer: 'Ja! Din läsposition sparas automatiskt när du läser. Du kan fortsätta där du slutade genom att öppna berättelsen igen eller gå till "Bibliotek > Läser".'
    },
    {
      question: 'Hur publicerar jag en egen berättelse?',
      answer: 'Gå till "Skapa"-fliken, fyll i information om din berättelse (titel, beskrivning, genre) och skriv första kapitlet. Tryck sedan på "Publicera" när du är klar.'
    },
    {
      question: 'Kan jag redigera mina publicerade berättelser?',
      answer: 'Ja! Gå till din profil, hitta berättelsen du vill redigera och tryck på redigeringsikonen (penna). Du kan ändra text, titel och metadata.'
    },
    {
      question: 'Vad är prestationer och hur låser jag upp dem?',
      answer: 'Prestationer är utmärkelser du får genom att använda appen. Läs berättelser regelbundet, publicera eget innehåll och interagera med communityn för att låsa upp fler prestationer.'
    },
    {
      question: 'Hur fungerar formateringen när jag skriver?',
      answer: 'Du kan använda markdown-formatering: **fetstil** för fetstil, *kursiv* för kursiv text, och - för punktlistor. Använd verktygsfältet för enkel formatering.'
    },
    {
      question: 'Kan jag ladda upp PDF-berättelser?',
      answer: 'Ja, systemet stöder både textberättelser och PDF-filer. När du skapar en berättelse kan du välja att ladda upp en PDF istället för att skriva direkt i appen.'
    },
    {
      question: 'Hur sparar jag berättelser för senare?',
      answer: 'Tryck på bokmärkesikonen när du tittar på en berättelse. Du hittar sedan alla sparade berättelser under "Bibliotek > Sparade".'
    },
    {
      question: 'Hur aviseras jag om nya episoder?',
      answer: 'Du får automatiskt notiser när författare du följer publicerar nya episoder. Du kan hantera aviseringsinställningar under Inställningar.'
    },
    {
      question: 'Vad betyder reaktionerna?',
      answer: '❤️ Kärlek, 😱 Chockad, 🔥 Fantastiskt, 😭 Ledsen, 💀 Skrattretande. Använd reaktioner för att visa författare vad du tycker om deras berättelser!'
    },
  ] : [
    {
      question: 'How do I start reading a story?',
      answer: 'Go to the "Discover" tab and browse through stories. Tap on a story to see more information, then tap "Start Reading" to begin.'
    },
    {
      question: 'Can I save my reading position?',
      answer: 'Yes! Your reading position is automatically saved as you read. You can continue where you left off by opening the story again or going to "Library > Reading".'
    },
    {
      question: 'How do I publish my own story?',
      answer: 'Go to the "Create" tab, fill in your story information (title, description, genre) and write your first chapter. Then tap "Publish" when you\'re done.'
    },
    {
      question: 'Can I edit my published stories?',
      answer: 'Yes! Go to your profile, find the story you want to edit and tap the edit icon (pencil). You can change the text, title and metadata.'
    },
    {
      question: 'What are achievements and how do I unlock them?',
      answer: 'Achievements are awards you earn by using the app. Read stories regularly, publish your own content and interact with the community to unlock more achievements.'
    },
    {
      question: 'How does formatting work when I write?',
      answer: 'You can use markdown formatting: **bold** for bold text, *italic* for italic text, and - for bullet lists. Use the toolbar for easy formatting.'
    },
    {
      question: 'Can I upload PDF stories?',
      answer: 'Yes, the system supports both text stories and PDF files. When creating a story, you can choose to upload a PDF instead of writing directly in the app.'
    },
    {
      question: 'How do I save stories for later?',
      answer: 'Tap the bookmark icon when viewing a story. You can then find all saved stories under "Library > Saved".'
    },
    {
      question: 'How am I notified about new episodes?',
      answer: 'You automatically receive notifications when authors you follow publish new episodes. You can manage notification settings in Settings.'
    },
    {
      question: 'What do the reactions mean?',
      answer: '❤️ Love, 😱 Shocked, 🔥 Amazing, 😭 Sad, 💀 Hilarious. Use reactions to show authors what you think of their stories!'
    },
  ];

  const contactOptions = language === 'sv' ? [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'E-post Support',
      description: 'support@cliffreader.se',
      action: () => window.location.href = 'mailto:support@cliffreader.se'
    },
    {
      icon: <Book className="w-5 h-5" />,
      title: 'Dokumentation',
      description: 'Läs vår kompletta guide',
      action: () => router.push('/docs')
    },
  ] : [
    {
      icon: <Mail className="w-5 h-5" />,
      title: 'Email Support',
      description: 'support@cliffreader.se',
      action: () => window.location.href = 'mailto:support@cliffreader.se'
    },
    {
            {language === 'sv' ? 'Vanliga Frågor' : 'Frequently Asked Questions'}
          
      icon: <Book className="w-5 h-5" />,
      title: 'Documentation',
      description: 'Read our complete guide',
      action: () => router.push('/docs')
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-surface-variant rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">{language === 'sv' ? 'Hjälp & Support' : 'Help & Support'}</h1>
          <div className="w-9"></div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold mb-2">
            {language === 'sv' ? 'Hur kan vi hjälpa dig?' : 'How can we help you?'}
          </h2>
          <p className="text-text-secondary">
            {language === 'sv' 
              ? 'Hitta svar på vanliga frågor eller kontakta oss direkt'
              : 'Find answers to common questions or contact us directly'
            }
          </p>
        </div>

        {/* Contact Options */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {language === 'sv' ? 'Kontakta Oss' : 'Contact Us'}
          </h3>
          <div className="space-y-3">
            {contactOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="w-full flex items-center gap-4 p-4 bg-surface rounded-xl hover:bg-surface-variant transition border border-border"
              >
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  {option.icon}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{option.title}</p>
                  <p className="text-sm text-text-dim">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Vanliga Frågor</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-surface rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition"
                >
                  <span className="font-medium text-left">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-text-dim flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-text-dim flex-shrink-0 ml-2" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4 text-text-secondary text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-primary flex-shrin
                {language === 'sv' ? 'Tips för bästa upplevelse' : 'Tips for best experience'}
              </h4>
              <ul className="text-sm text-text-secondary space-y-1">
                {language === 'sv' ? (
                  <>
                    <li>• Använd bokmärken för att spara berättelser du vill läsa senare</li>
                    <li>• Aktivera notiser för att inte missa nya episoder</li>
                    <li>• Reagera på berättelser för att hjälpa författare</li>
                    <li>• Håll kapitlen korta (3-5 min) när du skriver</li>
                  </>
                ) : (
                  <>
                    <li>• Use bookmarks to save stories you want to read later</li>
                    <li>• Enable notifications to not miss new episodes</li>
                    <li>• React to stories to help authors</li>
                    <li>• Keep chapters short (3-5 mins) when writing</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center text-sm text-text-dim pt-8">
          <p>CLIFF Reader v1.0.0</p>
          <p className="mt-1">
            {language === 'sv' 
              ? '© 2026 CLIFF. Alla rättigheter förbehållna.' 
              : '© 2026 CLIFF. All rights reserved.'
            }
          </p>
        </div
              <h4 className="font-semibold mb-2 text-primary">Tips för bästa upplevelse</h4>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• Använd bokmärken för att spara berättelser du vill läsa senare</li>
                <li>• Aktivera notiser för att inte missa nya episoder</li>
                <li>• Reagera på berättelser för att hjälpa författare</li>
                <li>• Håll kapitlen korta (3-5 min) när du skriver</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center text-sm text-text-dim pt-8">
          <p>CLIFF Reader v1.0.0</p>
          <p className="mt-1">© 2026 CLIFF. Alla rättigheter förbehållna.</p>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}

export default withAuth(HelpPage);
