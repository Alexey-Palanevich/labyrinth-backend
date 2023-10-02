module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', "import"],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    "import/resolver": {
      node: {
        'extensions': [
          '.ts',
          '.tsx'
        ]
      }
    }
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    "@typescript-eslint/consistent-type-imports": ["error", { "prefer": "type-imports" }],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "groups": [
          ["builtin", "external"],
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type"
        ]
      }
    ],
    // TODO: try to setup eslint for ban imports from ifra
    // "import/no-restricted-paths": ["error", {
    //   zones: [
    //     {
    //       target: ["./src/domain", '.src/domain/labyrinth/core/entities/Labyrinth.ts'],
    //       from: ["./src/infra", "./src/test"],
    //     }
    //   ]
    // }]
  },
};
