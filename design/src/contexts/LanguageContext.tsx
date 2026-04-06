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
    'library.progress': '% avklarat',
    'library.reads': 'läsningar',
    
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
    'create.episodeTitle': 'Kapitel 1',
    'create.errorPublish': 'Kunde inte publicera berättelsen',
    'create.formatting': 'Formatering',
    'create.titleLabel': 'Titel *',
    'create.titlePlaceholder': 'Ge din berättelse en titel...',
    'create.descriptionLabel': 'Kort beskrivning *',
    'create.descriptionPlaceholder': 'Beskriv din berättelse i en mening...',
    'create.genreLabel': 'Genre *',
    'create.coverImage': 'Omslagsbild',
    'create.uploadImage': 'Ladda upp bild',
    'create.imageSize': 'Rekommenderad storlek: 800x1200px',
    'create.characters': 'tecken',
    'create.errorTitle': 'Titel krävs',
    'create.errorDescription': 'Kort beskrivning krävs',
    'create.errorGenre': 'Genre krävs',
    'create.errorContent': 'Innehåll krävs',
    
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
    'settings.editProfile': 'Redigera Profil',
    'settings.editProfileDesc': 'Ändra bild, namn och bio',
    'settings.changePassword': 'Ändra Lösenord',
    'settings.changePasswordDesc': 'Uppdatera ditt lösenord',
    'settings.adminPanel': 'Admin Panel',
    'settings.adminPanelDesc': 'Hantera användare',
    'settings.pushNotifsDesc': 'Nya episoder och reaktioner',
    'settings.emailNotifsDesc': 'Veckosammanfattning',
    'settings.languageDesc': 'Välj språk för gränssnittet',
    'settings.publicProfile': 'Offentlig Profil',
    'settings.publicProfileDesc': 'Andra kan se din profil',
    'settings.dataPrivacy': 'Datasekretess',
    'settings.dataPrivacyDesc': 'Hantera dina data',
    'settings.support': 'Support',
    'settings.helpSupport': 'Hjälp & Support',
    'settings.helpSupportDesc': 'FAQ och kontakt',
    'settings.contactUs': 'Kontakta Oss',
    'settings.dangerZone': 'Farlig Zon',
    'settings.deleteAccount': 'Radera Konto',
    'settings.deleteAccountDesc': 'Permanent borttagning',
    
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
    'auth.loggingIn': 'Logging in...',
    
    // Profile
    'profile.title': 'Profile',
    'profile.myStories': 'My Stories',
    'profile.seeAll': 'See all →',
    'profile.achievements': 'Achievements',
    'profile.viewAll': 'View all achievements →',
    'profile.stats': 'Reading Stats',
    'profile.help': 'Help & Support',
    'profile.followers': 'Followers',
    'profile.following': 'Following',
    'profile.editProfile': 'Edit Profile',
    
    // Library
    'library.title': 'My Library',
    'library.reading': 'Reading',
    'library.saved': 'Saved',
    'library.finished': 'Finished',
    'library.noReading': 'No reading history yet',
    'library.noSaved': 'No saved stories yet',
    'library.noFinished': 'No finished stories yet',
    'library.discover': 'Discover Stories',
    'library.progress': '% completed',
    'library.reads': 'reads',
    
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
    'create.episodeTitle': 'Chapter 1',
    'create.errorPublish': 'Could not publish story',
    'create.formatting': 'Formatting',
    'create.titleLabel': 'Title *',
    'create.titlePlaceholder': 'Give your story a title...',
    'create.descriptionLabel': 'Short description *',
    'create.descriptionPlaceholder': 'Describe your story in one sentence...',
    'create.genreLabel': 'Genre *',
    'create.coverImage': 'Cover Image',
    'create.uploadImage': 'Upload image',
    'create.imageSize': 'Recommended size: 800x1200px',
    'create.characters': 'characters',
    'create.errorTitle': 'Title required',
    'create.errorDescription': 'Short description required',
    'create.errorGenre': 'Genre required',
    'create.errorContent': 'Content required',
    
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
    'settings.editProfile': 'Edit Profile',
    'settings.editProfileDesc': 'Change picture, name and bio',
    'settings.changePassword': 'Change Password',
    'settings.changePasswordDesc': 'Update your password',
    'settings.adminPanel': 'Admin Panel',
    'settings.adminPanelDesc': 'Manage users',
    'settings.pushNotifsDesc': 'New episodes and reactions',
    'settings.emailNotifsDesc': 'Weekly summary',
    'settings.languageDesc': 'Choose interface language',
    'settings.publicProfile': 'Public Profile',
    'settings.publicProfileDesc': 'Others can see your profile',
    'settings.dataPrivacy': 'Data Privacy',
    'settings.dataPrivacyDesc': 'Manage your data',
    'settings.support': 'Support',
    'settings.helpSupport': 'Help & Support',
    'settings.helpSupportDesc': 'FAQ and contact',
    'settings.contactUs': 'Contact Us',
    'settings.dangerZone': 'Danger Zone',
    'settings.deleteAccount': 'Delete Account',
    'settings.deleteAccountDesc': 'Permanent deletion',
    
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
