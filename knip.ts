import type { KnipConfig, WorkspaceProjectConfig } from 'knip';

const nextjsConfig: NonNullable<WorkspaceProjectConfig['next']> = {
  entry: [
    '{instrumentation,middleware}.{js,ts}',
    'app/{manifest,sitemap,robots}.{js,ts}',
    'app/**/{error,layout,loading,not-found,page,template,default}.{js,jsx,ts,tsx}',
    'app/**/{icon,apple-icon}.{js,jsx,ts,tsx}',
    'app/**/{opengraph,twitter}-image.{js,jsx,ts,tsx}',
    'app/**/route.{js,jsx,ts,tsx}',
    'app/global-error.{js,jsx,ts,tsx}',
    'next.config.{js,ts,cjs,mjs}',
    'pages/**/*.{js,jsx,ts,tsx}',
    'scripts/**',
    'src/{instrumentation,middleware}.{js,ts}',
    'src/app/{manifest,sitemap,robots}.{js,ts}',
    'src/app/**/{error,layout,loading,not-found,page,template,default}.{js,jsx,ts,tsx}',
    'src/app/**/{icon,apple-icon}.{js,jsx,ts,tsx}',
    'src/app/**/{opengraph,twitter}-image.{js,jsx,ts,tsx}',
    'src/app/**/route.{js,jsx,ts,tsx}',
    'src/app/global-error.{js,jsx,ts,tsx}',
    'src/pages/**/*.{js,jsx,ts,tsx}',
  ],
};


const config: KnipConfig = {
  next: nextjsConfig,
  ignore: ['dist/**', 'node_modules/**', 'pnpm-lock.yaml','examples/**'],
};

export default config;

