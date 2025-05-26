'use client';

import React from 'react';
import { useTranslation } from 'next-i18next';

const TranslationTest = () => {
  const { t, i18n } = useTranslation('common');

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
          <p>Current Language: <strong>{i18n.language}</strong></p>
        </div>
      </div>

      {scenarios.map((scenario, index) => (
        <div key={index} className="mb-8 border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">{scenario.title}</h2>
          <div className="space-y-4">
            {scenario.keys.map((key) => (
              <div key={key} className="border rounded p-4 bg-white">
                <p className="text-sm text-gray-600 mb-2">Key: {key}</p>
                <p className="font-medium">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranslationTest;
