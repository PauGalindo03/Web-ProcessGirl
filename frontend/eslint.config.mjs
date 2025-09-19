import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";

export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      ".cache/**",
      "next-env.d.ts",
      "*.d.ts",
      "postcss.config.js"
    ],

    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json"
      }
    },
    settings: {
      react: { version: "detect" }
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "@next/next": nextPlugin,
      import: importPlugin // 👈 nuevo
    },
    rules: {
      // --- TypeScript ---
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" }
      ],

      // --- React ---
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "react/jsx-max-props-per-line": ["warn", { maximum: 3 }],
      "react/self-closing-comp": "error",

      // --- Hooks ---
      ...reactHooksPlugin.configs.recommended.rules,

      // --- Accesibilidad ---
      ...jsxA11yPlugin.configs.recommended.rules,
      "jsx-a11y/alt-text": ["error", { elements: ["img"], img: ["Image"] }],
      "jsx-a11y/anchor-is-valid": [
        "error",
        {
          components: ["Link"],
          specialLink: ["hrefLeft", "hrefRight"],
          aspects: ["invalidHref", "preferButton"]
        }
      ],

      // --- Next.js Core Web Vitals ---
      ...nextPlugin.configs["core-web-vitals"].rules,

      // --- Estilo y consistencia ---
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "quotes": ["error", "single", { avoidEscape: true }],
      "semi": ["error", "always"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "max-len": ["warn", { code: 100, ignoreUrls: true }],

      // --- Orden de imports ---
      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "type"],
            ["parent", "sibling", "index"]
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }
        }
      ]
    }
  },
  prettierConfig
];
