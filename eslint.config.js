import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'


export default [
    {
        languageOptions: {
            globals: globals.browser
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "off"
        }
    },
    ...pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
]
