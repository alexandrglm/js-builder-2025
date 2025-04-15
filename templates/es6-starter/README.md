# ES6 Starter Project (Updated to 2025, React18, Babel 7+, )

As long as time goes by as modules have new updates, the original starter script was found outdated.  
This fork tries to update those modules by fixing every breaking changes they made at many parts of the scripts.  

## Updated Components:
|                    | Original Version | Updated to             |
| ------------------ | ---------------- | ---------------------- |
| React              | 14               | **18.2.0**             |
| webpack            | 4.16.4           | **5.99.5**             |
| webpack-dev-server | 3.1.5            | **5.2.1**              |
| babel-core         | 6.26.3           | **@babel/core 7.24.0** |
| eslint             | 5.3.0            | **9.24.0**             |

## Performed Code Changes:
#### packacge.json:
- Removed outdated dependences:
```
babel-polyfill@6.26.0
babel-plugin-transform-class-properties@6.24.1
babel-plugin-transform-object-rest-spread@6.26.0
uglifyjs-webpack-plugin@1.2.7
```
- The most hard-to-fix Breaking-change dependences:
```json
# Core JS and Polyfills:

core-js@^3.36.1
regenerator-runtime@^0.14.1


# New Babel 7+ and it's sub-modules (plugins) new format:

@babel/plugin-transform-class-properties@^7.24.1
@babel/plugin-transform-object-rest-spread@^7.24.1


# New Webpack plugins updated

terser-webpack-plugin@^5.3.10 (Replacing uglifyjs-webpack)
css-minimizer-webpack-plugin@^5.0.0
mini-css-extract-plugin@^2.7.6
```
- Every dependences:
```json
"devDependencies": {
    "@babel/core": "^7.24.0",
    "@babel/plugin-transform-class-properties": "^7.23.3",
    "@babel/plugin-transform-object-rest-spread": "^7.23.4",
    "@babel/preset-env": "^7.24.0",
    "@babel/preset-react": "^7.23.3",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.16",
    "autoprefixer": "^10.4.21",
    "babel-loader": "^9.1.3",
    "clean-webpack-plugin": "^4.0.0",
    "copy-webpack-plugin": "^13.0.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.10.0",
    "css-minimizer-webpack-plugin": "^7.0.2",
    "eslint": "^9.24.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-webpack-plugin": "^5.0.0",
    "express": "^5.1.0",
    "file-loader": "^6.2.0",
    "glob": "^11.0.1",
    "html-webpack-plugin": "^5.6.3",
    "inflight": "^1.0.6",
    "mini-css-extract-plugin": "^2.7.6",
    "postcss-loader": "^8.1.0",
    "rimraf": "^6.0.1",
    "terser-webpack-plugin": "^5.3.14",
    "url-loader": "^4.1.1",
    "webpack": "^5.99.5",
    "webpack-cli": "^6.0.1",
    "webpack-dev-middleware": "^7.4.2",
    "webpack-dev-server": "^5.2.1",
    "webpack-merge": "^6.0.1"
  }
```
***
# Code Changes (breaking changes fixes):
1. From `packages.json`:
  * Even with the new packages, some inner script has been updated to new methods as seen here:
    ```json
      "scripts": {
          "preinstall": "npm set audit false",
          "start": "webpack serve --config webpack/dev.config.js",
          "build": "cross-env NODE_ENV=production webpack --config webpack/prod.config.js --progress --display-error-details --color",
          "heroku-postbuild": "npm run build",
          "precommit": "eslint src",
          "prod": "NODE_ENV=production node server.js"
    ```   
3. Many included files were their syntax/methods updated:
   ```
    ./src/vendor.js
    ./webpack/common.config.js
    ./webpack/dev.config.js
    ./webpack/prod.config.js
    ./proxy/rules.js
    ./.babelrc
   ```
**Check differences from original files vs the included in this fork, they've been self-explanatory commented**
***

## Instructions after generating the project (as in the original project):

- Change into the directory and run `npm install` to install the dependencies
- Add initial code to the src/bootstrap.js file, it will be the root file for your ES6 projects
- Run `npm start`
- Visit localhost:3000 in the browser and you should see the running application. If you are running console log statements they will appear in the browser's JS console.


> Provided for the students of the [Bottega Code School](https://bottega.tech/)

*Fork from [es6-webpack2-starter](https://github.com/micooz/es6-webpack2-starter)*
