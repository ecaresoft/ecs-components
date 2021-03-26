import { es as spanish, en as english, ar as arabic} from './_translations'

export namespace TranslationUtils {
  
  /**
   * Attempts to find the closest tag with a lang attribute.
   * Falls back to english if no language is found.
   * @param element The element to find a lang attribute for.
   */
  function getTranslations(locale: string){
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
    }

    return translation;
  }

  export async function fetchTranslations(locale: string) {

    const existingTranslations = JSON.parse(sessionStorage.getItem(`i18n.${locale}`));
    if (existingTranslations && Object.keys(existingTranslations).length > 0) {
      return existingTranslations;
    } else {
      try {
        const result = getTranslations(locale);
        if (Object.keys(result).length !== 0) {
          const data = result;
          sessionStorage.setItem(`i18n.${locale}`, JSON.stringify(data));
          return data;
        }
      } catch (exception) {
        console.log(exception);
      }
    }
  }

}
