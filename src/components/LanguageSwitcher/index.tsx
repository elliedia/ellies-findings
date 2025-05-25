import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './LanguageSwitcher.module.css';

type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

const LANGUAGES: Record<string, Language> = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  ko: { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳' },
  vi: { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
};

export const LanguageSwitcher = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentLang, setCurrentLang] = useState<Language>(
    LANGUAGES[router.locale || 'en']
  );

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update current language when router.locale changes
  useEffect(() => {
    if (router.locale && LANGUAGES[router.locale]) {
      setCurrentLang(LANGUAGES[router.locale]);
    }
  }, [router.locale]);

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== router.locale && LANGUAGES[savedLanguage]) {
      changeLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = useCallback(async (locale: string) => {
    try {
      // Store language preference in both localStorage and cookie
      localStorage.setItem('preferred-language', locale);
      document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;

      // Get current path and query
      const { pathname, asPath, query } = router;

      // Update the URL and change language
      await router.push({ pathname, query }, asPath, { 
        locale,
        scroll: false // Prevent page jump
      });

      // Close dropdown
      setIsOpen(false);

      // Update current language state immediately
      setCurrentLang(LANGUAGES[locale]);

    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [router]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, locale: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      changeLanguage(locale);
    }
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t('language.select')}
        aria-haspopup="listbox"
      >
        <span className={styles.flag} role="img" aria-hidden="true">
          {currentLang.flag}
        </span>
        <span className={styles.language}>{currentLang.nativeName}</span>
        <span className={styles.arrow} aria-hidden="true">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div 
          className={styles.dropdown} 
          role="listbox"
          aria-label={t('language.select')}
        >
          {Object.values(LANGUAGES).map((lang) => (
            <button
              key={lang.code}
              className={`${styles.option} ${
                lang.code === router.locale ? styles.selected : ''
              }`}
              onClick={() => changeLanguage(lang.code)}
              onKeyDown={(e) => handleKeyDown(e, lang.code)}
              role="option"
              aria-selected={lang.code === router.locale}
              tabIndex={0}
            >
              <span className={styles.flag} role="img" aria-hidden="true">
                {lang.flag}
              </span>
              <span className={styles.nativeName}>{lang.nativeName}</span>
              <span className={styles.name}>({lang.name})</span>
              {lang.code === router.locale && (
                <span className={styles.checkmark} aria-hidden="true">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};