// eslint.config.js
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import jest from 'eslint-plugin-jest';

export default [
  {
    ignores: [
      'node_modules/**',
      '.cache/**',
      'build/**',
      'public/build/**',
      'dist/**',
      'coverage/**',
      '**/*.min.js',
    ],
  },
  // Apply recommended JS rules to JS files
  {
    files: ['**/*.{js,jsx}'],
    ...js.configs.recommended,
    rules: {
      ...js.configs.recommended.rules,
      // Disable rules as needed
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-empty': 'off',
      'no-var': 'off',
      'prefer-const': 'off',
    },
  },
  // Apply TypeScript rules to TS files
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
    plugins: {
      ...config.plugins,
      'jsx-a11y': jsxA11y,
      'react-hooks': reactHooks,
      'jest': jest,
    },
    rules: {
      ...config.rules,
      // Disable TypeScript rules as needed
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'prefer-const': 'off',
      // Disable plugin rules but keep them available
      'jsx-a11y/anchor-has-content': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'jest/no-conditional-expect': 'off',
    },
  })),
];
