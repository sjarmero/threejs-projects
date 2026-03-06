import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import html from "@html-eslint/eslint-plugin";
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.html"],
    plugins: {
      html,
    },
    extends: ["html/recommended"],
    language: "html/html",
  },

  ...pluginVue.configs['flat/recommended'].map(config => ({
    ...config,
    files: ['**/*.vue'],
  })),

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      }
    }
  },
]);
