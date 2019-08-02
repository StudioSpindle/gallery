
Example of a gallery project using the Flickr API.

# Purpose of this example

The goal was to create a responsive image gallery and make use of the Flickr API. One of the features is It works independent of the surrounding HTML element. Another feature is infinite scrolling.

# Fickr API

In order for this project to work you have to use an API key. Request one here: https://www.flickr.com/services/api/misc.api_keys.html

And place this key in an file named .env at the root of this project.

Example:

```
$ touch .env; open .env;
```

**./.env**
```
API_KEY = <your-key>
```

# CI

Typically the tests should run on a CI.

# Build production

```
npm run build:prod
```

# Contributing

```
npm run watch
```

This starts a local development server to work on, and opens the gallery in a browser. 

## Testing

```
npm run test
```

### methods

This project uses [testing-library](https://testing-library.com/docs/dom-testing-library/intro)

The main goal of this approach is to test the gallery from a users perspective. So implementation details are not tested. More on this approach in [this article](https://kentcdodds.com/blog/testing-implementation-details) by Kent C. Dodds.

The unit tests are located next to the functions itself to rais awareness that they're tested. Also it improves the urgency to adjust tests once you adjust a fuction. The integration tests are located in the `__test__` folder.

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
Modules on the other hand are not interchangable and independent.

# Authors Notes:

- ES lint enforces ES6 modules over UMD and CJS to bundle. More info: https://medium.com/@kelin2025/so-you-wanna-use-es6-modules-714f48b3a953
- The airbnb (ES) styleguide is a preference.
