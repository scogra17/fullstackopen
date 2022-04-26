# About
* Notes on Typescript
* [TS playground](https://www.typescriptlang.org/play)
* [Interface docs](https://www.typescriptlang.org/docs/handbook/interfaces.html)

## Using ts-node
* install: `$ npm install --save-dev ts-node typescript`
* After adding `"ts-node:": "ts-node"` to the scripts property of the package.json, it can be used by running `npm run ts-node`. When using ts-node through package.json, all command line arguments need to be prefixed with `--`. E.g. to run `file.js`: `$ npm run ts-node -- file.ts`

## tsconfig.json
* Used to define how the TypeScript compiler should interpret the code, how strictly the compiler should work, which files to watch or ignore and more

## typings
* Since the typings are only used before compilation, the typings are not needed in the production build and they should always be in the devDependencies of the package.json
* Usually, types for existing packages can be found from the @types organization within npm, and you can add the relevant types to your project by installing an npm package with the name of your package with a @types/ prefix. For example: npm install --save-dev @types/react @types/express @types/lodash @types/jest @types/mongoose and so on and so on.