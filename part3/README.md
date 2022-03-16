# Notes
## ES6 module vs. CommonJS modules
* Code that runs in the browser uses ES6 modules, which are defined with an export and taken into use with an import, e.g.:
```js
import http from 'http'
```
* Node uses CommonJS modules. The reason for this is that the Node ecosystem had a need for modules long before JavaScript supported them in the language specification. Node supports now also the use of ES6 modules, but since the support is yet not quite perfect we'll stick to CommonJS modules.

```js
const http = require('http')
```

## Semantic versioning of NPM packages
* [NPM docs](https://docs.npmjs.com/about-semantic-versioning)
* "express": "^4.17.2"
  * The caret in the front of ^4.17.2 means that if and when the dependencies of a project are updated, the version of express that is installed will be at least 4.17.2. However, the installed version of express can also be one that has a larger patch number (the last number), or a larger minor number (the middle number). The major version of the library indicated by the first major number must be the same.
  * If the major number of a dependency does not change, then the newer versions should be backwards compatible.

## Express
* `(request, response) => `The event handler function accepts two parameters. The first request parameter contains all of the information of the HTTP request, and the second response parameter is used to define how the request is responded to.

## Nodemon
* nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart your node application.
* install: `$ npm install --save-dev nodemon`
* run application: `$ node_modules/.bin/nodemon index.js`

## NPM commands
* npm init
* npm update: update packages of project
* npm install

## REST
* Singular things, like notes in the case of our application, are called resources in RESTful thinking. Every resource has an associated URL which is the resource's unique address. One convention is to create the unique address for resources by combining the name of the resource type with the resource's unique identifier. If we define the resource type of note to be notes, then the address of a note resource with the identifier 10, has the unique address www.example.com/api/notes/10. The URL for the entire collection of all note resources is www.example.com/api/notes.

### GET requests
* In particular, the convention has been established that the GET and HEAD methods SHOULD NOT have the significance of taking an action other than retrieval. These methods ought to be considered "safe". Safety means that the executing request must not cause any side effects in the server. By side-effects we mean that the state of the database must not change as a result of the request, and the response must only return data that already exists on the server.
* All HTTP requests except POST should be idempotent:
  * Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property
* POST is the only HTTP request type that is neither safe nor idempotent.

## Middleware
* Middleware are functions that can be used for handling request and response objects, e.g. `json-parser`, which takes the raw data from the requests that's stored in the request object, parses it into a JavaScript object and assigns it to the request object as a new property body.
* you can use several middleware at the same time. When you have more than one, they're executed one by one in the order that they were taken into use in express.
* Let's implement our own middleware that prints information about every request that is sent to the server. Middleware is a function that receives three parameters:
```js
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next() // The next function yields control to the next middleware.
}
// ...
app.use(requestLogger)
```
* Middleware functions have to be taken into use before routes if we want them to be executed before the route event handlers are called.
*  There are also situations where we want to define middleware functions after routes. In practice, this means that we are defining middleware functions that are only called if no route handles the HTTP request, e.g.:
```js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
```

## Debugging
* In the browser, launch with `$ node --inspect index.js`

## NoSQL DBs
* [Mongo - collections](https://docs.mongodb.com/manual/core/databases-and-collections/)
* [Mongo - documents](https://docs.mongodb.com/manual/core/document/)
* [Example MongoDB provider](https://www.mongodb.com/atlas/database)

### Commands
* `$ use <dbName>`: creates a DB if one by that name doesn't already exist
* `<dbName> db.myNewCollection1.insertOne( { x: 1 } )`: perform an operation
* "Collections" (NoSQL) == "Tables" (SQL)
  * By default, a collection does not require its documents to have the same schema;
* "BSON Documents" (NoSQL) == "Row/Entry" (SQL)
  * BSON: binary representation of JSON
  * [BSON data types](https://docs.mongodb.com/manual/reference/bson-types/), e.g.:
  ```js
  var mydoc = {
               _id: ObjectId("5099803df3f4948bd2f98391"),
               name: { first: "Alan", last: "Turing" },
               birth: new Date('Jun 23, 1912'),
               death: new Date('Jun 07, 1954'),
               contribs: [ "Turing machine", "Turing test", "Turingery" ],
               views : NumberLong(1250000)
            }
  ```
  * The field name _id is reserved for use as a primary key; its value must be unique in the collection, is immutable, and may be of any type other than an array.
* MongoDB uses the dot notation to access the elements of an array and to access the fields of an embedded document.
  * To specify or access an element of an array by the zero-based index position, concatenate the array name with the dot (.) and zero-based index position, and enclose in quotes: `"<array>.<index>"`

### Conventions
* In the Note model definition, the first "Note" parameter is the singular name of the model.
* The name of the collection will be the lowercased plural notes, because the Mongoose convention is to automatically name collections as the plural (e.g. notes) when the schema refers to them in the singular (e.g. Note).

## Node modules
* Differ from how ES6 modules are defined `export default <Name>`
* The public interface of the module is defined by setting a value to the `module.exports` variable
* Import is done through a require statement, e.g.: `const Note = require('./models/note')`

## Define environment variables
* `$ VAR_NAME=<value> <command, e.g. npm run dev>`
* A more sophisticated approach is to use [dotenv](https://github.com/motdotla/dotenv#readme)
  * create `.env` file at root of project which will contain environment variables and values, e.g.:
  ```
  MONGODB_URI=mongodb+srv://fullstack:<pasdsword>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority
  PORT=3001
  ```
  * variables defined in `.env` can be taken into use with `require('dotenv').config()`
  * reference variables with the familiar `process.env.MONGODB_URI`
* environment variables are available globally
* set config vars for heroku, e.g. `heroku config:set MONGODB_URI='mongodb+srv://fullstack:<password>@cluster0.o1opl.mongodb.net/noteApp?retryWrites=true&w=majority'` OR via UI
