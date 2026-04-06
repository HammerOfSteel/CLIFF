'use client';

import Link from 'next/link';
import { Home, Library, PenTool, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface BottomNavProps {
  activeTab: 'discover' | 'library' | 'create' | 'profile';
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  const { t } = useLanguage();
  
  const tabs = [
    { id: 'discover', icon: Home, label: t('nav.discover'), href: '/' },
    { id: 'library', icon: Library, label: t('nav.library'), href: '/library' },
    { id: 'create', icon: PenTool, label: t('nav.create'), href: '/create' },
    { id: 'profile', icon: User, label: t('nav.profile'), href: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur border-t border-border z-50">
      <div className="flex justify-around items-center h-20 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
                isActive ? 'text-primary' : 'text-text-dim hover:text-text-secondary'
              )}
            >
              <Icon className={cn('w-6 h-6', isActive && 'scale-110')} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
