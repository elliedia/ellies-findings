module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ko'],
    localeDetection: false,
  },
  localePath: './src/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}; 