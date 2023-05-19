process.env.ESLINT_TSCONFIG = "tsconfig.json"
module.exports = {
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  overrides: [
    {
      files: [
        "*.ts",
        "*.tsx",
        "*.js",
        "*.html",
        "*.vue"
      ],
      plugins: [
        "html",
        "vue",
        "cypress",
        "import",
        "simple-import-sort",
      ],
      rules: {
        "no-unused-vars": "off",
        // "object-curly-newline": [
        //   "error", {
        //     "ObjectExpression": { "minProperties": 2 },
        //     "ObjectPattern": { "minProperties": 2 },
        //     "ImportDeclaration": { "minProperties": 1 },
        //     "ExportDeclaration": "never"
        //   }
        // ],
        "object-curly-newline": [
          "error", {
            multiline: true,
            consistent: true
          }
        ],
        curly: ["error", "all"],
        "newline-after-var": ["error", "always"],
        "no-continue": "off",
        "no-alert": "off",
        "no-console": ["error", { allow: ["warn", "error"] }],
        "object-curly-spacing": [
          "error",
          "always",
          {
            "objectsInObjects": true,
            "arraysInObjects": true
          }
        ],
        "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": false }],
        "quotes": ["error", "double"],
        "rest-spread-spacing": ["error", "never"],
        "space-before-blocks": "error",
        "space-in-parens": ["error", "never"],
        "space-infix-ops": ["error", { "int32Hint": false }],
        "linebreak-style": ["error", "unix"],
        "no-sparse-arrays": "error",
        "array-element-newline": [
          "error", {
            "ArrayExpression": { "minItems": 3 },
            "ArrayPattern": { "minItems": 3 },
          }
        ],
        "array-bracket-newline": [
          "error", {
            "multiline": true,
            "minItems": 3
          }
        ],
        "arrow-spacing": "error",
        "indent": ["error", 2],
        "key-spacing": [
          "error", {
            "beforeColon": false,
            "afterColon": true
          }
        ],
        "import/extensions": "off",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "function-paren-newline": ["error", { "minItems": 3 }],
        // "sort-keys": [
        //   "error",
        //   "asc",
        //   {
        //     "caseSensitive": true,
        //     "natural": true
        //   }
        // ],
      }
    }
  ]
}
