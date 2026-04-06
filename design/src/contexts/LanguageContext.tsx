'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'sv' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  sv: {
    // Navigation
    'nav.discover': 'Upptäck',
    'nav.library': 'Bibliotek',
    'nav.create': 'Skapa',
    'nav.profile': 'Profil',
    
    // Common
    'common.loading': 'Laddar...',
    'common.error': 'Fel',
    'common.save': 'Spara',
    'common.cancel': 'Avbryt',
    'common.delete': 'Ta bort',
    'common.edit': 'Redigera',
    'common.back': 'Tillbaka',
    'common.settings': 'Inställningar',
    
    // Login/Auth
    'auth.login': 'Logga in',
    'auth.signup': 'Registrera',
    'auth.logout': 'Logga ut',
    'auth.username': 'Användarnamn',
    'auth.password': 'Lösenord',
    'auth.email': 'E-post',
    
    // Profile
    'profile.title': 'Profil',
    'profile.myStories': 'Mina Berättelser',
    'profile.seeAll': 'Se alla →',
    'profile.achievements': 'Prestationer',
    'profile.viewAll': 'Visa alla prestationer →',
    'profile.stats': 'Lässtatistik',
    'profile.help': 'Hjälp & Support',
    
    // Library
    'library.title': 'Mitt Bibliotek',
    'library.reading': 'Läser',
    'library.saved': 'Sparade',
    'library.finished': 'Avklarade',
    'library.noReading': 'Ingen läshistorik än',
    'library.noSaved': 'Inga sparade berättelser än',
    'library.noFinished': 'Inga avklarade berättelser än',
    'library.discover': 'Upptäck Berättelser',
    
    // Story
    'story.startReading': 'Börja Läsa Episode 1 →',
    'story.nextEpisode': 'Nästa Kapitel →',
    'story.prevEpisode': '← Föregående Kapitel',
    'story.episodes': 'episoder',
    'story.reads': 'läsningar',
    'story.min': 'min',
    'story.ongoing': 'Pågående',
    'story.completed': 'Avslutad',
    
    // Create
    'create.title': 'Ny Berättelse',
    'create.publish': 'Publicera',
    'create.publishing': 'Publicerar...',
    'create.storyTitle': 'Titel',
    'create.description': 'Kort beskrivning',
    'create.genre': 'Genre',
    'create.selectGenre': 'Välj genre...',
    'create.content': 'Innehåll',
    'create.wordCount': 'ord',
    'create.formatting': 'Formatering',
    
    // Settings
    'settings.title': 'Inställningar',
    'settings.account': 'Konto',
    'settings.notifications': 'Aviseringar',
    'settings.appearance': 'Utseende',
    'settings.privacy': 'Sekretess',
    'settings.about': 'Om',
    'settings.language': 'Språk',
    'settings.darkMode': 'Mörkt läge',
    'settings.pushNotifs': 'Push-notiser',
    'settings.emailNotifs': 'E-postaviseringar',
    'settings.version': 'Version',
    
    // Help
    'help.title': 'Hjälp & Support',
    'help.faq': 'Vanliga Frågor',
    'help.contact': 'Kontakta Oss',
    'help.docs': 'Dokumentation',
    
    // Achievements
    'achievements.title': 'Prestationer',
    'achievements.unlocked': 'upplåsta',
    'achievements.all': 'Alla',
    'achievements.stats': 'Din Statistik',
  },
  en: {
    // Navigation
    'nav.discover': 'Discover',
    'nav.library': 'Library',
    'nav.create': 'Create',
    'nav.profile': 'Profile',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.settings': 'Settings',
    
    // Login/Auth
    'auth.login': 'Log in',
    'auth.signup': 'Sign up',
    'auth.logout': 'Log out',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.email': 'Email',
    
    // Profile
    'profile.title': 'Profile',
    'profile.myStories': 'My Stories',
    'profile.seeAll': 'See all →',
    'profile.achievements': 'Achievements',
    'profile.viewAll': 'View all achievements →',
    'profile.stats': 'Reading Stats',
    'profile.help': 'Help & Support',
    
    // Library
    'library.title': 'My Library',
    'library.reading': 'Reading',
    'library.saved': 'Saved',
    'library.finished': 'Finished',
    'library.noReading': 'No reading history yet',
    'library.noSaved': 'No saved stories yet',
    'library.noFinished': 'No finished stories yet',
    'library.discover': 'Discover Stories',
    
    // Story
    'story.startReading': 'Start Reading Episode 1 →',
    'story.nextEpisode': 'Next Chapter →',
    'story.prevEpisode': '← Previous Chapter',
    'story.episodes': 'episodes',
    'story.reads': 'reads',
    'story.min': 'min',
    'story.ongoing': 'Ongoing',
    'story.completed': 'Completed',
    
    // Create
    'create.title': 'New Story',
    'create.publish': 'Publish',
    'create.publishing': 'Publishing...',
    'create.storyTitle': 'Title',
    'create.description': 'Short description',
    'create.genre': 'Genre',
    'create.selectGenre': 'Select genre...',
    'create.content': 'Content',
    'create.wordCount': 'words',
    'create.formatting': 'Formatting',
    
    // Settings
    'settings.title': 'Settings',
    'settings.account': 'Account',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Appearance',
    'settings.privacy': 'Privacy',
    'settings.about': 'About',
    'settings.language': 'Language',
    'settings.darkMode': 'Dark mode',
    'settings.pushNotifs': 'Push notifications',
    'settings.emailNotifs': 'Email notifications',
    'settings.version': 'Version',
    
    // Help
    'help.title': 'Help & Support',
    'help.faq': 'Frequently Asked Questions',
    'help.contact': 'Contact Us',
    'help.docs': 'Documentation',
    
    // Achievements
    'achievements.title': 'Achievements',
    'achievements.unlocked': 'unlocked',
    'achievements.all': 'All',
    'achievements.stats': 'Your Stats',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('sv');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'sv' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.sv] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
