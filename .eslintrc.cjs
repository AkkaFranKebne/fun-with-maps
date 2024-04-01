const { defineConfig } = require("eslint-define-config");

module.exports = {
  root: true,
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ["src/**/*.{ts,tsx}"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/no-unused-vars": 0,
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/jsx-runtime",
      ],
    },
    {
      files: ["**/*.{js,mjs,cjs}"],
      env: {
        node: true,
        browser: true,
        es2021: true,
      },
      extends: ["eslint:recommended"],
      rules: {
        "no-unused-vars": 0,
      },
    },
  ],
};