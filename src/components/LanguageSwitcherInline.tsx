import React from 'react';
import { useTranslation } from 'next-i18next';

const languages = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'ko', label: 'KO', nativeName: '한국어' },
  { code: 'ja', label: 'JA', nativeName: '日本語' },
  { code: 'zh', label: 'ZH', nativeName: '中文' },
  { code: 'es', label: 'ES', nativeName: 'Español' },
  { code: 'vi', label: 'VI', nativeName: 'Tiếng Việt' },
] as const;

const LanguageSwitcherInline: React.FC = () => {
  const { t, i18n } = useTranslation();

  const switchLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex flex-wrap items-center gap-1 text-sm">
      <span className="text-gray-500 text-xs">
        {t('language.select', 'Language')}:
      </span>
      <div className="flex flex-wrap gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`
              px-2 py-1 rounded text-xs font-medium
              ${i18n.language === lang.code
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}
            `}
            title={lang.nativeName}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcherInline;
