import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import LanguageSwitcherInline from '../components/LanguageSwitcherInline';

const AboutPage: NextPage = () => {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('about.title', 'About Us')}</h1>
          <LanguageSwitcherInline />
        </div>
        
        <div className="prose prose-lg">
          <p>{t('about.description', 'Welcome to Ellie\'s Findings, a multilingual platform for sharing discoveries.')}</p>
          
          <h2>{t('about.mission.title', 'Our Mission')}</h2>
          <p>{t('about.mission.description', 'To connect people across languages and cultures through shared knowledge and discoveries.')}</p>
          
          <h2>{t('about.features.title', 'Features')}</h2>
          <ul>
            <li>{t('about.features.multilingual', 'Full multilingual support')}</li>
            <li>{t('about.features.community', 'Community-driven content')}</li>
            <li>{t('about.features.accessibility', 'Accessibility-first design')}</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default AboutPage;
