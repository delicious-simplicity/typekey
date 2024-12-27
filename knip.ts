import type { KnipConfig } from 'knip';

const nextjsConfig: KnipConfig['next'] = {
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

const commonFilesIgnore = ['src/image/loader.js', 'src/components/ui/**'];
const commonDepsIgnore = [''];

const config: KnipConfig = {
  workspaces: {
    'apps/api': {
      ignore: [...commonFilesIgnore],
      ignoreDependencies: [...commonDepsIgnore],
      includeEntryExports: true,
      next: nextjsConfig,
    },
    'apps/auth': {
      ignore: [...commonFilesIgnore],
      ignoreDependencies: [...commonDepsIgnore],
      includeEntryExports: true,
      next: nextjsConfig,
    },
    'apps/play': {
      ignore: [...commonFilesIgnore],
      ignoreDependencies: [...commonDepsIgnore],
      includeEntryExports: true,
      next: nextjsConfig,
    },
    'apps/www': {
      ignore: [...commonFilesIgnore],
      ignoreDependencies: [...commonDepsIgnore],
      includeEntryExports: true,
      next: nextjsConfig,
    },
    'packages/api': {
      ignore: ['src/server/generated/**', 'scripts/**', 'contentful/codegen.ts'],
      includeEntryExports: true,
    },
    'contentful-apps/user-mgmt': { includeEntryExports: true },
    'packages/db': { includeEntryExports: true },
    'packages/ui': {
      ignore: ['turbo/**', 'dist/**'],
      includeEntryExports: true,
    },
  },
};

export default config;
