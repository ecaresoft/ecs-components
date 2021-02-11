import { b as bootstrapLazy } from './index-58c212db.js';
import { p as patchBrowser, g as globalScripts } from './app-globals-c2a65efd.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["my-component",[[1,"my-component",{"vital_signs_data":[1],"token_api_nimbo_vital_signs":[1],"vital_signs_person_id":[2],"vital_signs_set_id":[2],"vital_signs_consultation_id":[2],"vital_signs_account_id":[2]}]]],["my-name",[[0,"my-name",{"value":[32]}]]]], options);
});
