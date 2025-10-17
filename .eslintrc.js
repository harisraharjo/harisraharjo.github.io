module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended", // This is the crucial one for integrating prettier
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  plugins: ["@typescript-eslint", "prettier", "import"],
  rules: {
    // Add your specific rules here
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
}
