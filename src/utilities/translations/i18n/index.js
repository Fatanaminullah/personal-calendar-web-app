import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../dictionary/en.json';
import id from '../dictionary/id.json';

i18n.use(initReactI18next).init({
  resources: {en, id},
  lng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
