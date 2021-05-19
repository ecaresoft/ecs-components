import { b as bootstrapLazy } from './index-ecc28489.js';
import { p as patchBrowser, g as globalScripts } from './app-globals-4419405c.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["stencil-asset",[[0,"stencil-asset",{"icon":[1]}]]],["my-component",[[1,"my-component",{"vital_signs_data":[1],"token_api_nimbo_vital_signs":[1],"vital_signs_person_id":[2],"vital_signs_set_id":[2],"vital_signs_consultation_id":[2],"vital_signs_account_id":[2],"environment":[1],"obtenerRgb":[8,"obtener-rgb"],"labelsDate":[32],"obtenerDataSets":[32],"obtenerDate":[32],"multi":[32]}]]],["my-name",[[0,"my-name",{"value":[32]}]]]], options);
});
