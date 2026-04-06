'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import withAuth from '@/components/withAuth';
import { ArrowLeft, Bell, Lock, Eye, Globe, HelpCircle, Mail, Shield, Trash2, Languages } from 'lucide-react';

function SettingsPage() {
  const router = useRouter();
  const { user, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-surface border-b border-border">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-surface-variant rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">{t('settings.title')}</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        {/* Account Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('settings.account')}</h2>
          <div className="bg-surface rounded-2xl border border-border divide-y divide-border">
            <button
              onClick={() => router.push('/profile/edit')}
              className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{t('settings.editProfile')}</div>
                  <div className="text-sm text-text-dim">{t('settings.editProfileDesc')}</div>
                </div>
              </div>
              <span className="text-text-dim">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-xl">
                  <Lock className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{t('settings.changePassword')}</div>
                  <div className="text-sm text-text-dim">{t('settings.changePasswordDesc')}</div>
                </div>
              </div>
              <span className="text-text-dim">›</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => router.push('/admin')}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{t('settings.adminPanel')}</div>
                    <div className="text-sm text-text-dim">{t('settings.adminPanelDesc')}</div>
                  </div>
                </div>
                <span className="text-text-dim">›</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('settings.notifications')}</h2>
          <div className="bg-surface rounded-2xl border border-border divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-xl">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="font-medium">{t('settings.pushNotifs')}</div>
                  <div className="text-sm text-text-dim">{t('settings.pushNotifsDesc')}</div>
                </div>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-surface-variant rounded-full peer-checked:bg-primary transition-colors cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-text rounded-full peer-checked:translate-x-6 transition-transform"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-xl">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="font-medium">{t('settings.emailNotifs')}</div>
                  <div className="text-sm text-text-dim">{t('settings.emailNotifsDesc')}</div>
                </div>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-surface-variant rounded-full peer-checked:bg-primary transition-colors cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-text rounded-full peer-checked:translate-x-6 transition-transform"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Language & Appearance Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('settings.appearance')}</h2>
          <div className="bg-surface rounded-2xl border border-border divide-y divide-border">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Languages className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{t('settings.language')}</div>
                  <div className="text-sm text-text-dim">{t('settings.languageDesc')}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setLanguage('sv')}
                  className={`flex-1 py-2 px-4 rounded-xl transition ${
                    language === 'sv'
                      ? 'bg-primary text-white'
                      : 'bg-surface-variant hover:bg-surface-variant/80'
                  }`}
                >
                  🇸🇪 Svenska
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-2 px-4 rounded-xl transition ${
                    language === 'en'
                      ? 'bg-primary text-white'
                      : 'bg-surface-variant hover:bg-surface-variant/80'
                  }`}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('settings.privacy')}</h2>
          <div className="bg-surface rounded-2xl bord{language === 'sv' ? 'Support' : 'Support'}er-border divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{t('settings.publicProfile')}</div>
                  <div className="text-sm text-text-dim">{t('settings.publicProfileDesc')}</div>
                </div>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={publicProfile}
                  onChange={(e) => setPublicProfile(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-surface-variant rounded-full peer-checked:bg-primary transition-colors cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-text rounded-full peer-checked:translate-x-6 transition-transform"></div>
              </label>
            </div>

            <button className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-xl">
                  <Lock className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{t('settings.dataPrivacy')}</div>
                  <div className="text-sm text-text-dim">{t('settings.dataPrivacyDesc')}</div>
                </div>
              </div>
              <span className="text-text-dim">›</span>
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">{t('settings.support')}</h2>
          <div className="bg-surface rounded-2xl border border-border divide-y divide-border">
            <button className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-xl">
                  <HelpCircle className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{t('settings.helpSupport')}</div>
                  <div className="text-sm text-text-dim">{t('settings.helpSupportDesc')}</div>
                </div>
              </div>
              <span className="text-text-dim">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-4 hover:bg-surface-variant transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-xl">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{t('settings.contactUs')}</div>
                  <div className="text-sm text-text-dim">support@cliff.se</div>
                </div>
              </div>
              <span className="text-text-dim">›</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-red-400">{t('settings.dangerZone')}</h2>
          <div className="bg-surface rounded-2xl border border-red-500/20 divide-y divide-border">
            <button className="w-full flex items-center justify-between p-4 hover:bg-red-500/5 transition">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-xl">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-red-400">{t('settings.deleteAccount')}</div>
                  <div className="text-sm text-text-dim">{t('settings.deleteAccountDesc')}</div>
                </div>
              </div>
              <span className="text-red-400">›</span>
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="text-center text-sm text-text-dim pt-4">
          CLIFF v1.0.0 • © 2026
        </div>
      </main>
    </div>
  );
}

export default withAuth(SettingsPage);
