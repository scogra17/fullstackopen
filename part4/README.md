# Notes
## Node project structure
├── index.js
├── app.js
├── build
│   └── ...
├── controllers
│   └── notes.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  

### Notes from ^ 
* We extract logging into its own module so that if we wanted to start sending logs to an external service we would only have to make changes in one place
* `index.js` only imports the actual application from `app.js` and starts the application
* The event handlers of routes are commonly referred to as controllers, which is why these handlers are in the "controllers" directory

## Router object
* A router object is an isolated instance of middleware and routes. You can think of it as a "mini-application", capable only of performing middleware and routing functions. Every Express application has a built-in app router
* The router is used for defining "related routes" in a single place and is typically placed in its own module

## Unit tests with jest
* We must specify that the `testingEnvironment` is "node" in `package.json`
* Jest expects the names of the test files to contain ".test" (<name>.test.js is a common convention)
* Describe blocks can be used for grouping tests into logical collections. They are also needed when we want to run some shared setup or teardown operations for a group of tests
* run a single test
  1) use the `test.only` syntax
  2) `$ npm test -- -t '<test_name>'`
* run only test in a specific file
  * `$ npm test -- tests/test_name.test.js`

### setting up database for tests with promises 
* use `Promise.all` and `await` to ensure all database operations are completed before tests are run
* `Promise.all` executes the promises it receives in parallel. If promises need to be run in a particular order, use a `for...of` block

## Using async/await
* Warning: If you find yourself using async/await and then methods in the same code, it is almost guaranteed that you are doing something wrong. Use one or the other and don't mix the two
* We would normally need to wrap this code in try-catch blocks, but this can be avoided with the use of the `express-async-error` pacakge
```js
require('express-async-errors')
// ...
notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

// becomes

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
```

