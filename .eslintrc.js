module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    linebreak-style: ["error", "windows"]
  },
};
