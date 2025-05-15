module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier', // Disables ESLint rules that conflict with Prettier
    ],
    rules: {
        // Naming conventions
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'default', format: ['camelCase'] },
            { selector: 'typeLike', format: ['PascalCase'] },
            { selector: 'function', format: ['PascalCase'] },
            { selector: 'method', format: ['PascalCase'] },
            { selector: 'variable', types: ['function'], format: ['PascalCase'] },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
            },
        ],
        // Other common rules
        'react/react-in-jsx-scope': 'off', // Not needed with React 17+
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
