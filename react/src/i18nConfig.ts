// /* eslint-disable import/no-relative-packages */
// import i18n, { InitOptions, PluginOptions } from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';

// import en from './locales/en.json';
// import fi from './locales/fi.json';

// export const defaultLocale = 'en';

// const resources = {
//   en: {
//     common: en,
//   },
//   fi: {
//     common: fi,
//   },
// };

// const configs: InitOptions & PluginOptions = {
//   detection: {
//     order: ['htmlTag', 'querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'path', 'subdomain'],
//   },
//   backend: {
//     loadPath: '',
//   },
//   fallbackLng: defaultLocale,
//   debug: process.env.NODE_ENV !== 'production',
//   defaultNS: 'common',
//   ns: ['common'],
//   interpolation: {
//     escapeValue: false,
//   },
// };
// configs.resources = resources;
// i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(configs);

// export default i18n;
