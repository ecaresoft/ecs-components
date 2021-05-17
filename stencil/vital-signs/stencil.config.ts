import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'ste',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      dir: 'public',
      copy: [
        { src: 'components/stencil-asset/assets', dest: 'assets' }
      ],
      serviceWorker: null, // disable service workers
    },
  ],
};
