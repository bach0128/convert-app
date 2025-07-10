import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 👇 Register plugin objects for Flat Config
  {
    plugins: {
      react, // required for rules like 'react/display-name'
      'react-hooks': reactHooks,
    },
  },

  // 👇 Legacy-style config wrapped via FlatCompat
  ...compat.config({
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
    ],
    plugins: ['prettier', 'react-hooks'], // plugin *names*
    rules: {
      // 🔁 React plugin rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // 🔁 React Hooks plugin rules
      ...reactHooks.configs.recommended.rules,

      'react/prop-types': 'off',

      // 🔧 Prettier formatting
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],

      // 🔧 Console usage
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // 🔧 TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',

      // 🔧 Unused variables (ignore `_`)
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // 🔒 Prevent deeply relative imports
      'no-restricted-imports': [
        'error',
        {
          patterns: ['../*'],
        },
      ],
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.json'],
        },
      },
    },
  }),
];

export default eslintConfig;
