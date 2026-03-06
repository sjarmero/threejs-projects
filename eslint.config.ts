import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import html from "@html-eslint/eslint-plugin";
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
  {
    files: [
        "**/*.{js,mjs,cjs,ts,mts,cts}"
    ],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser }
  },
  tseslint.configs.recommended,
]);
