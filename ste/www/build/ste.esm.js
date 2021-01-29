import { b as bootstrapLazy } from './index-58c212db.js';
import { p as patchBrowser, g as globalScripts } from './app-globals-c2a65efd.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1],"estatura":[2],"peso":[2],"masa_corporal":[2],"temperatura":[2],"frecuencia_respiratoria":[2],"sistolica":[2],"diastolica":[2],"frecuencia_cardiaca":[2],"porcentaje_grasa_corporal":[2],"consulta_seleccionada":[2],"name":[1],"url_api_nimbo_vital_signs":[1],"token_api_nimbo_vital_signs":[1],"vital_signs_data":[1],"vital_signs_set_id":[2],"vital_signs_consultation_id":[2],"vital_signs_person_id":[2],"imgSrc":[1,"img-src"]}]]],["my-name",[[0,"my-name",{"value":[32]}]]]], options);
});
