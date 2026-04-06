'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { ArrowLeft, ChevronDown, ChevronUp, Mail, Book, Shield } from 'lucide-react';

function HelpPage() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
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
  ];

  const contactOptions = [
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
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-surface-variant rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Hjälp & Support</h1>
          <div className="w-9"></div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-8">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold mb-2">Hur kan vi hjälpa dig?</h2>
          <p className="text-text-secondary">
            Hitta svar på vanliga frågor eller kontakta oss direkt
          </p>
        </div>

        {/* Contact Options */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kontakta Oss</h3>
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
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
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
