import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

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
  {
    plugins: {
      "@stylistic/js": stylisticJs,
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
      "max-len": ["error", { code: 80 }],
      "no-useless-return": "error",
      "template-curly-spacing": ["error", "never"],
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
