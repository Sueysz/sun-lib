import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                console: 'readonly',
                process: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': ts,
        },
        rules: {
            'no-console': "error",
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 2],
            'no-trailing-spaces': 'error',
            'eol-last': ['error', 'always'],
            'comma-dangle': ['error', 'always-multiline'],
            'object-curly-spacing': ['error', 'always'],
            'arrow-spacing': ['error', { before: true, after: true }],
            'eqeqeq': ['error', 'always'],
            },
    },
];
