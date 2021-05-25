import { b as bootstrapLazy } from './index-7678e4f3.js';
import { p as patchBrowser, g as globalScripts } from './app-globals-0d81e7ce.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["my-component",[[1,"my-component",{"vital_signs_data":[1],"token_api_nimbo_vital_signs":[1],"vital_signs_person_id":[2],"vital_signs_set_id":[2],"vital_signs_consultation_id":[2],"vital_signs_account_id":[2],"environment":[1],"obtenerRgb":[8,"obtener-rgb"],"labelsDate":[32],"obtenerDataSets":[32],"obtenerDate":[32],"multi":[32]}]]],["my-name",[[0,"my-name",{"value":[32]}]]],["collapsible-chart",[[1,"collapsible-chart",{"title":[1],"collapsed":[32],"toggle":[64]}]]],["stencil-asset",[[0,"stencil-asset",{"icon":[1]}]]]], options);
});
