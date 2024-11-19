import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import jest from "eslint-plugin-jest";
import pluginCypress from "eslint-plugin-cypress/flat";

export default [
  {
    files: ["**/*.js", "**/*.mjs"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  jest.configs["flat/recommended"],
  pluginCypress.configs.recommended,
  {
    plugins: {
      "@stylistic/js": stylisticJs,
      cypress: pluginCypress,
    },
  },
  {
    rules: {
      "no-unused-vars": "error",
      "no-console": "off",
      "no-prototype-builtins": 0,
      "@stylistic/js/indent": ["error", 2, { SwitchCase: 1 }],
      "space-in-parens": ["error", "never"],
      "eol-last": ["error", "always"],
      "no-trailing-spaces": "error",
      "max-len": ["error", { code: 120 }],
      "no-useless-return": "error",
      "template-curly-spacing": ["error", "never"],
      "jest/no-conditional-expect": "off",
      "jest/expect-expect": "off",
      "no-undef": "warn",
      "no-extra-parens": [
        "error",
        "all",
        {
          ternaryOperandBinaryExpressions: false,
          conditionalAssign: false,
          nestedBinaryExpressions: false,
          returnAssign: false,
        },
      ],
      "no-confusing-arrow": [
        "error",
        {
          allowParens: true,
        },
      ],
    },
  },
  {
    files: ["**/*.mjs"],
    rules: {
      indent: "off",
    },
  },
  {
    ignores: ["data/**"],
  },
];
