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
* set `NODE_ENV` ins package.json to distinguish between the project being run in production vs. development
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

## Adding user authentication and authorization
* Traditionally document databases like Mongo do not support join queries; however, starting in version 3.2 Mongo supports "lookup aggregation queries"
* If we need functionality similar to join queries, we will implement it in our application code by making multiple queries
* Schema-less databases like Mongo rewquire developers to make far more radical design decisions about data organization at the beginning of a project than relational databases with schemas. On average, relational databases offer a more-or-less suitable way of organizing data for many applications
* Mongoose accomplishes the join by doing multiple queries, which is different from join queries in relational databases which are transactional, meaning that the state of the database does not change during the time that the query is made. With join queries in Mongoose, nothing can guarantee that the state between the collections being joined is consistent, meaning that if we make a query that joins the user and notes collections, the state of the collections may change during the query.

## Token-based user authentication
* backend generates and returns a token that identifies user when the browswer makes a successful /api/login request POST. This token is included by the browswer on all subsequent requests