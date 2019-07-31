

# Build production

```
npm run build:prod
```

# CI

...

# Contributing

```
npm run watch
```

This starts a local development server to work on.

## Testing

```
npm run test
```

## Linting

```
npm run test:lint
```

_Note: Usually in a project the linting can be done on the git commit hook but for now out of scope for this assignment_

Example IDE linting plugin (used Visual Studio Code):
- https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint

# Style Scaffolding

Generic styles are included in all files, and in that way are global.
Modules on the other hand are not interchangable and be independent.

# Authors Notes:

- ES lint enforces ES6 modules over UMD and CJS to bundle. More info: https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953
- The airbnb (ES) styleguide is a preference.
