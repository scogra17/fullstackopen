# About
* Notes on Typescript
* [TS playground](https://www.typescriptlang.org/play)
* [Interface docs](https://www.typescriptlang.org/docs/handbook/interfaces.html)
* [Modules docs](https://www.typescriptlang.org/docs/handbook/modules.html)

## Using ts-node
* install: `$ npm install --save-dev ts-node typescript`
* After adding `"ts-node:": "ts-node"` to the scripts property of the package.json, it can be used by running `npm run ts-node`. When using ts-node through package.json, all command line arguments need to be prefixed with `--`. E.g. to run `file.js`: `$ npm run ts-node -- file.ts`

## tsconfig.json
* Used to define how the TypeScript compiler should interpret the code, how strictly the compiler should work, which files to watch or ignore and more

## typings
* Since the typings are only used before compilation, the typings are not needed in the production build and they should always be in the devDependencies of the package.json
* Usually, types for existing packages can be found from the @types organization within npm, and you can add the relevant types to your project by installing an npm package with the name of your package with a @types/ prefix. For example: npm install --save-dev @types/react @types/express @types/lodash @types/jest @types/mongoose and so on and so on.

## Import vs. require
* Which import statement to use depends on the export method used in the imported package
* A good rule of thumb is to try importing a module using the import statement first. We will always use this method in the frontend. If import does not work, try a combined method: import ... = require('...').
* In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module. Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well)

## Auto reloading
* Alternative to nodemond for TypeScript is called "ts-node-dev"
* Recompiles project with every change, meaning restarting the application isn't necessary 
* Install: `$ npm install --save-dev ts-node-dev`

## Any
* Programmers however see the code differently when any is explicitly enforced than when it is implicitly inferred. Implicit any typings are usually considered problematic, since it is quite often due to the coder forgetting to assign types (or being too lazy to do it), and it also means that the full power of TypeScript is not properly exploited
* **This is why the configuration rule noImplicitAny exists on compiler level, and it is highly recommended to keep it on at all times.**

### ESLINT for TS
* Install: `$ npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`