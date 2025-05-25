'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TranslationTest = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [translations, setTranslations] = useState<{
    en: any;
    ko: any;
  }>({ en: {}, ko: {} });

  useEffect(() => {
    // Load translations
    const loadTranslations = async () => {
      const enTranslations = await import('../../../locales/en/common.json');
      const koTranslations = await import('../../../locales/ko/common.json');
      setTranslations({
        en: enTranslations.default,
        ko: koTranslations.default
      });
    };
    loadTranslations();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const scenarios = [
    {
      title: '1. Complete Translations',
      keys: [
        'welcome',
        'navigation.home',
        'navigation.about',
        'navigation.contact'
      ]
    },
    {
      title: '2. Missing Simple Keys',
      keys: [
        'search.results',
        'search.noResults',
        'footer.terms'
      ]
    },
    {
      title: '3. Nested Fallback',
      keys: [
        'testFallback.onlyInEnglish',
        'testFallback.nested.onlyInEnglish',
        'testFallback.nested.partialTranslation'
      ]
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">i18n Fallback Test Page</h1>
        <div className="mb-4">
          <p>Current Language: <strong>en</strong></p>
        </div>
      </div>

      {scenarios.map((scenario, index) => (
        <div key={index} className="mb-8 border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">{scenario.title}</h2>
          <div className="space-y-4">
            {scenario.keys.map((key) => (
              <div key={key} className="border rounded p-4 bg-white">
                <p className="text-sm text-gray-600 mb-2">Key: {key}</p>
                <p className="font-medium">{key}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-8 border rounded-lg p-6 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">4. Raw Translation Objects</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded p-4 bg-white">
            <h3 className="font-medium mb-2">English Translations</h3>
            <pre className="text-sm overflow-auto max-h-96">
              {JSON.stringify(translations.en, null, 2)}
            </pre>
          </div>
          <div className="border rounded p-4 bg-white">
            <h3 className="font-medium mb-2">Korean Translations</h3>
            <pre className="text-sm overflow-auto max-h-96">
              {JSON.stringify(translations.ko, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationTest; 