import { es as spanish, en as english, ar as arabic} from './_translations';

function getTranslations(locale){
  let translation = {};
  switch(locale){
    case 'es':
      translation = spanish;
      break;
    case 'en':
      translation = english;
      break;
    case 'ar':
      translation = arabic;
      break;
    default :
      translation = english;
  }
  return translation;
}

export namespace TranslationUtils {
  export async function fetchTranslations(locale) {
    let _locale: any;

    if(locale.includes('-')) {
      _locale = locale.split('-');
      _locale = _locale[0];
    }else {
      _locale = locale;
    }
    
    const existingTranslations = JSON.parse(sessionStorage.getItem(`i18n.${_locale}`));
    if (existingTranslations && Object.keys(existingTranslations).length > 0) {
      return existingTranslations;
    } else {
      try {
        const result = getTranslations(_locale);
        if (Object.keys(result).length !== 0) {
          const data = result;
          sessionStorage.setItem(`i18n.${_locale}`, JSON.stringify(data));
          return data;
        }
      } catch (exception) {
        console.log(exception);
      }
    }
  }

}
