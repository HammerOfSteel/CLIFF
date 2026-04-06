'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import BottomNav from '@/components/BottomNav';
import withAuth from '@/components/withAuth';
import { ArrowLeft, Book, Search, Edit, Bookmark, Trophy, Heart } from 'lucide-react';

function DocsPage() {
  const router = useRouter();
  const { language } = useLanguage();

  const sections = language === 'sv' ? [
    {
      title: 'Kom Igång',
      icon: <Book className="w-6 h-6" />,
      topics: [
        {
          title: 'Skapa ett konto',
          content: 'Börja med att skapa ett gratis konto genom att klicka på "Registrera" på startsidan. Du behöver bara ett användarnamn och lösenord för att komma igång.'
        },
        {
          title: 'Navigera i appen',
          content: 'Använd navigeringen längst ner för att växla mellan Upptäck (hem), Bibliotek (sparade berättelser), Skapa (skriv egna), och Profil (dina inställningar).'
        },
        {
          title: 'Din första berättelse',
          content: 'Gå till "Upptäck"-fliken och bläddra genom berättelser genom att scrolla upp/ner. Klicka på en berättelse för att läsa mer om den, sedan "Börja Läsa" för att starta.'
        }
      ]
    },
    {
      title: 'Läsa Berättelser',
      icon: <Search className="w-6 h-6" />,
      topics: [
        {
          title: 'Upptäck nya berättelser',
          content: 'På startsidan ser du berättelser i ett vertikalt flöde (som TikTok). Scrolla upp/ner för att bläddra. Information om varje berättelse visas längst ner på skärmen.'
        },
        {
          title: 'Spara för senare',
          content: 'Tryck på bokmärkesikonen för att spara en berättelse. Hitta alla sparade berättelser under "Bibliotek > Sparade".'
        },
        {
          title: 'Läsposition sparas automatiskt',
          content: 'Din läsposition sparas automatiskt när du läser. Du kan alltid fortsätta där du slutade genom att öppna berättelsen igen eller gå till "Bibliotek > Läser".'
        },
        {
          title: 'Reagera på berättelser',
          content: 'Använd reaktioner (❤️ 😱 🔥 😭 💀) för att visa författare vad du tycker. Reaktioner visas i slutet av varje kapitel.'
        },
        {
          title: 'Ljud och PDF-berättelser',
          content: 'Vissa berättelser har ljudinspelningar. Aduiospelaren visas automatiskt när berättelsen har ljud. PDF-berättelser kan läsas med vår inbyggda PDF-läsare.'
        }
      ]
    },
    {
      title: 'Skriva Berättelser',
      icon: <Edit className="w-6 h-6" />,
      topics: [
        {
          title: 'Skapa en ny berättelse',
          content: 'Gå till "Skapa"-fliken och fyll i:\n• Titel\n• Kort beskrivning (max 150 tecken)\n• Genre\n• Första kapitlet (minst 100 ord)\n\nTryck sedan på "Publicera" när du är klar.'
        },
        {
          title: 'Formatera din text',
          content: 'Använd verktygsfältet för enkel formatering:\n• **fetstil** för fetstil\n• *kursiv* för kursiv\n• - för punktlistor\n\nDu kan också markera text och trycka på knapparna.'
        },
        {
          title: 'Redigera publicerade berättelser',
          content: 'Gå till din profil och hitta berättelsen du vill redigera. Tryck på redigeringsikonen (penna). Du kan ändra titel, beskrivning, och textinnehåll.'
        },
        {
          title: 'Tips för bra berättelser',
          content: '• Håll kapitlen korta (3-5 minuter läsning)\n• Börja med en stark inledning\n• Avsluta med en cliffhanger\n• Använd dialog för att göra berättelsen levande\n• Läs korrektur innan publicering'
        },
        {
          title: 'Hantera flera episoder',
          content: 'I redigeringsläget kan du välja vilken episod att redigera. Varje episod kan ha egen titel och innehåll. Använd "Nästa Kapitel" och "Föregående Kapitel" för att navigera.'
        }
      ]
    },
    {
      title: 'Bibliotek',
      icon: <Bookmark className="w-6 h-6" />,
      topics: [
        {
          title: 'Läser nu',
          content: 'Här ser du alla berättelser du har börjat läsa men inte avslutat. En förloppsindikator visar hur långt du har kommit.'
        },
        {
          title: 'Sparade berättelser',
          content: 'Alla berättelser du har bokmärkt samlas här. Perfekt för att skapa din egen läslista.'
        },
        {
          title: 'Avklarade',
          content: 'När du läser sista kapitlet i en berättelse flyttas den automatiskt till "Avklarade". Se historik över vad du har läst klart.'
        }
      ]
    },
    {
      title: 'Prestationer',
      icon: <Trophy className="w-6 h-6" />,
      topics: [
        {
          title: 'Hur du låser upp prestationer',
          content: 'Prestationer låses upp automatiskt baserat på din aktivitet:\n• Läs berättelser (Bokmal, Första Berättelsen)\n• Publicera egna berättelser (Författare, 10 Berättelser)\n• Få läsningar och reaktioner (100 Läsningar, Älskad)\n• Läs regelbundet (7-dagars Streak, 30-dagars Streak)'
        },
        {
          title: 'Se din framsteg',
          content: 'Olåsta prestationer visar en förloppsindikator så du vet hur nära du är att låsa upp dem. Gå till "Profil > Prestationer" för att se alla.'
        },
        {
          title: 'Kategorier',
          content: 'Prestationer är uppdelade i kategorier:\n• Läsare - för dig som gillar att läsa\n• Författare - för dig som skriver\n• Popularitet - för berättelser som får mycket läsningar\n• Engagemang - för regelbunden aktivitet\n• Community - för aktiva användare'
        }
      ]
    },
    {
      title: 'Inställningar & Sekretess',
      icon: <Heart className="w-6 h-6" />,
      topics: [
        {
          title: 'Aviseringar',
          content: 'Under "Inställningar" kan du aktivera/inaktivera:\n• Push-notiser för nya episoder\n• E-postaviseringar för veckosammanfattningar\n• Påminnelser om lässtreaks'
        },
        {
          title: 'Sekretess',
          content: 'Din information är säker hos oss. Vi delar aldrig dina uppgifter med tredje part. Du kan när som helst radera ditt konto under "Inställningar".'
        },
        {
          title: 'Redigera profil',
          content: 'Uppdatera din profilbild, användarnamn och bio under "Profil > Redigera Profil". Ändringarna syns direkt för andra användare.'
        }
      ]
    }
  ] : [
    {
      title: 'Getting Started',
      icon: <Book className="w-6 h-6" />,
      topics: [
        {
          title: 'Create an account',
          content: 'Start by creating a free account by clicking "Sign Up" on the homepage. You only need a username and password to get started.'
        },
        {
          title: 'Navigate the app',{language === 'sv' ? 'Dokumentation' : 'Documentation'}
          content: 'Use the bottom navigation to switch between Discover (home), Library (saved stories), Create (write your own), and Profile (your settings).'
        },
        {
          title: 'Your first story',
          content: 'Go to the "Discover" tab and browse stories by scrolling up/down. Click on a story to read more about it, then "Start Reading" to begin.'
        }
      ]
    },
    {
      title: 'Reading Stories',
      icon: <Search className="w-6 h-6" />,
      topics: [
        {
          title: 'Discover new stories',
          content: 'On the homepage you see stories in a vertical feed (like TikTok). Scroll up/down to browse. Information about each story is shown at the bottom of the screen.'
        },
        {
          title: 'Save for later',
          content: 'Tap the bookmark icon to save a story. Find all saved stories under "Library > Saved".'
        },
        {
          title: 'Reading position saves automatically',
          content: 'Your reading position is automatically saved when you read. You can always continue where you left off by opening the story again or going to "Library > Reading".'
        },
        {
          title: 'React to stories',
          content: 'Use reactions (❤️ 😱 🔥 😭 💀) to show authors what you think. Reactions are shown at the end of each chapter.'
        },
        {
          title: 'Audio and PDF stories',
          content: 'Some stories have audio recordings. The audio player appears automatically when the story has sound. PDF stories can be read with our built-in PDF reader.'
        }
      ]
    },
    {
      title: 'Writing Stories',
      icon: <Edit className="w-6 h-6" />,
      topics: [
        {
          title: 'Create a new story',
          content: 'Go to the "Create" tab and fill in:\n• Title\n• Short description (max 150 characters)\n• Genre\n• First chapter (at least 100 words)\n\nThen tap "Publish" when you\'re done.'
        },
        {
          title: 'Format your text',
          content: 'Use the toolbar for easy formatting:\n• **bold** for bold text\n• *italic* for italic text\n• - for bullet lists\n\nYou can also select text and tap the buttons.'
        },
        {
          title: 'Edit published stories',
          content: 'Go to your profile and find the story you want to edit. Tap the edit icon (pencil). You can change the title, description, and text content.'
        },
        {
          title: 'Tips for great stories',
          content: '• Keep chapters short (3-5 minutes of reading)\n• Start with a strong opening\n• End with a cliffhanger\n• Use dialogue to make the story lively\n• Proofread before publishing'
        },
        {
          title: 'Manage multiple episodes',
          content: 'In edit mode, you can choose which episode to edit. Each episode can have its own title and content. Use "Next Chapter" and "Previous Chapter" to navigate.'
        }
      ]
    },
    {
      title: 'Library',
      icon: <Bookmark className="w-6 h-6" />,
      topics: [
        {
          title: 'Currently reading',
          content: 'Here you see all stories you have started reading but not finished. A progress indicator shows how far you have come.'
        },
        {
          title: 'Saved stories',
          content: 'All stories you have bookmarked are collected here. Perfect for creating your own reading list.'
        },
        {
          title: 'Completed',
          content: 'When you read the last chapter in a story, it automatically moves to "Completed". See history of what you have finished reading.'
        }
      ]
    },
    {
      title: 'Achievements',
      icon: <Trophy className="w-6 h-6" />,
      topics: [
        {
          title: 'How to unlock achievements',
          content: 'Achievements are unlocked automatically based on your activity:\n• Read stories (Bookworm, First Story)\n• Publish your own stories (Author, 10 Stories)\n• Get readings and reactions (100 Readings, Loved)\n• Read regularly (7-day Streak, 30-day Streak)'
        },
        {
          title: 'See your progress',
          content: 'Unlocked achievements show a progress indicator so you know how close you are to unlocking them. Go to "Profile > Achievements" to see all.'
        },
        {
          title: 'Categories',
          content: 'Achievements are divided into categories:\n• Reader - for those who love to read\n• Author - for those who write\n• Popularity - for stories that get many readings\n• Engagement - for regular activity\n• Community - for active users'
        }
      ]
    },
    {
      title: 'Settings & Privacy',
      icon: <Heart className="w-6 h-6" />,
      topics: [
        {
          title: 'Notifications',
          content: 'Under "Settings" you can enable/disable:\n• Push notifications for new episodes\n• Email notifications for weekly summaries\n• Reminders about reading streaks'
        },
        {
          title: 'Privacy',
          content: 'Your information is safe with us. We never share your data with third parties. You can delete your account at any time under "Settings".'
        },
        {
          title: 'Edit profile',
          content: 'Update your profile picture, username and bio under "Profile > Edit Profile". Changes are visible to other users immediately.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-surface-variant rounded-full transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Dokumentation</h1>
          <div className="w-9"></div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent p-8 text-center border-b border-border">
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-2xl font-bold mb-2">
          {language === 'sv' ? 'CLIFF Användarguide' : 'CLIFF User Guide'}
        </h2>
        <p className="text-text-secondary">
          {language === 'sv' 
            ? 'Allt du behöver veta för att komma igång med CLIFF' 
            : 'Everything you need to know to get started with CLIFF'
          }
        </p>
      </div>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-6 space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold">{section.title}</h3>
            </div>

            <div className="space-y-4">
              {section.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="bg-surface rounded-xl p-4 border border-border">
                  <h4 className="font-semibold mb-2">{topic.title}</h4>
                  <p className="text-sm text-text-secondary whitespace-pre-line leading-relaxed">
                    {topic.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
            {language === 'sv' ? 'Behöver du mer hjälp?' : 'Need more help?'}
          </h4>
          <p className="text-sm text-text-secondary mb-4">
            {language === 'sv' 
              ? 'Om du inte hittar svar på din fråga, kontakta oss på' 
              : 'If you can\'t find an answer to your question, contact us at'
            }
          </p>
          <a 
            href="mailto:support@cliffreader.se"
            className="text-primary font-medium hover:underline"
          >
            support@cliffreader.se
          </a>
        </div>

        {/* Version */}
        <div className="text-center text-sm text-text-dim pt-4">
          <p>{language === 'sv' ? 'Senast uppdaterad: April 2026' : 'Last updated: April 2026'}
        </div>

        {/* Version */}
        <div className="text-center text-sm text-text-dim pt-4">
          <p>Senast uppdaterad: April 2026</p>
        </div>
      </main>

      <BottomNav activeTab="profile" />
    </div>
  );
}

export default withAuth(DocsPage);
