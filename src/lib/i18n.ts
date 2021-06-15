import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import commonEn from '../locales/en.json';
import commonEs from '../locales/es.json';
import loadingEn from '../locales/pages/loading/en.json';
import loadingEs from '../locales/pages/loading/es.json';
import signUpEs from '../locales/pages/sign_up/en.json';
import signUpEn from '../locales/pages/sign_up/es.json';
import signInEs from '../locales/pages/sign_in/en.json';
import signInEn from '../locales/pages/sign_in/es.json';
import homeEs from '../locales/pages/home/en.json';
import homeEn from '../locales/pages/home/es.json';
import cartEs from '../locales/pages/cart/en.json';
import cartEn from '../locales/pages/cart/es.json';
import successEs from '../locales/pages/success/en.json';
import successEn from '../locales/pages/success/es.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        common: commonEn,
        loading: loadingEn,
        signUp: signUpEn,
        signIn: signInEn,
        home: homeEn,
        cart: cartEn,
        success: successEn,
      },
      es: {
        common: commonEs,
        loading: loadingEs,
        signUp: signUpEs,
        signIn: signInEs,
        home: homeEs,
        cart: cartEs,
        success: successEs,
      },
    },
  });

export default i18n;
