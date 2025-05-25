// src/pages/test.tsx

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default function TestPage() {
  const { t, i18n } = useTranslation('common');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t('nav.home')}</h1>
      <p>{t('nav.search')}</p>
      <p>{t('auth.signIn')}</p>
      <p>Current language: {i18n.language}</p>
      <div style={{ marginTop: '2rem' }}>
  <h2>Fallback Translation Test</h2>
  <p>{t('test.missingKey')}</p>
  <p>{t('test.nested.deepKey')}</p>
  <p>{t('test.interpolation', { count: 5 })}</p>
    </div>
    </div>
  );
}
