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
    // Not really needed on server side
    "no-console": "off",
    "require-await": "off",
    "id-length": [ "error", { "exceptions": [ "_", /* placeholder */ "a", /* sort */ "b", /* sort */ "i" /* loop */ ] } ],

    // Ignore errors for desctructurization and rest args in override methods
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "ignoreRestSiblings": true }],
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
