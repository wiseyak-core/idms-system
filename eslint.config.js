import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginTypescript from '@typescript-eslint/eslint-plugin'

export default [
    {
        parser: '@typescript-eslint/parser',
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            ecmaFeatures: {
                jsx: true, // Enable JSX parsing
            },
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx,tsx,ts}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            // Optionally include TypeScript globals
            parser: '@typescript-eslint/parser',
        },
    },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            '@typescript-eslint': pluginTypescript,
        },
        rules: {
            'react/react-in-jsx-scope': 'off',
            // Add any additional rules you want to customize
        },
    },
]
