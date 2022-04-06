## Saving user credentials
* In order to avoid needing to login upon each page refresh we save the login details to local storage. Local Storage is a key-value database in the browser
* A value corresponding to a certain key is saved to the database with method setItem. For example: 
```js
window.localStorage.setItem('name', 'juha tauriainen')

// and retrieved with
window.localStorage.getItem('name')

// and removed with
window.localStorage.removeItem('name')
```
* Storage is "origin-specific" so each web application has its own storage
* Values saved to the storage are DOMstrings, so we cannot save a JavaScript object as is. The object has to be parsed to JSON first, with the method JSON.stringify. Correspondingly, when a JSON object is read from the local storage, it has to be parsed back to JavaScript with JSON.parse

### Additional considerations - revoking tokens
1) Limit the validity period of the token
2) Save the validity information of each token in the db. This is often referred to as "server side session"

* Saving tokens in local storage may contain a security risk if the application has a Cross-Site-Scripting (XSS) security vulnerability. XSS attaacks are possible if the app allows a user to inject arbitrary JS (e.g. using a form) that the app then executes
* To play it safe, the best option is to not store a token to the local storage. This might be an option in situations where leaking a token might have tragic consequences

## Child components
* When we have a parent component (e.g. `Togglable` in notes_frontend), `props.children` refers to the cuild component, which are the React elements that we define between the opening and closing tags of a component
* Unlike "normal" props, children is automatically added by React and always exists
* If a component is defined with an automatically closing tag, `/>` then `props.children` is an empty array

## State
* From docs: "Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor" 

## useRef hook
* The `useRef` hook is used to create a reference that can be assigned to a compoent. The `useRef` acts as a reference to the component, which ensures the same reference is kept throughout re-renders of the component
* `useImperativeHandle` is a React hook that is used for definingfunctions in a component which can be invoked from outside the component
* This can also be accomplished using "old React" class-based components

## PropTypes
* The expected and required props of a component can be defined with the `prop-types` package, e.g.:
```js
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  //...
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
```

## Linting React
* Do not run the eslint --init command. It will install the latest version of ESlint that is not compatible with the configuration file created by create-react-app!
* Next, we will start testing the frontend and in order to avoid undesired and irrelevant linter errors we will install the `eslint-plugin-jest` package
* create `.eslintrc.js` and `.eslintignore` files
* Note that create-react-app has also a [default ESLint-configuration](https://www.npmjs.com/package/eslint-config-react-app), that we have now overriden. [The documentation](https://create-react-app.dev/docs/setting-up-your-editor/#extending-or-replacing-the-default-eslint-config) mentions that it is ok to replace the default but does not encourage to that: We highly recommend extending the base config, as removing it could introduce hard-to-find issues.


## Unit testing in React
* Still impletement with Jest, which is actually configured by default to applications created with create-react-app
* We will use react-testing-library to help us render components for testing purposes
  * `$ npm install --save-dev @testing-library/react @testing-library/jest-dom` 
  * jest-dom provides some helper methods
* The react-testing-library `render` function renders components in a format suitable for tests without rendering them to the DOM
  * We can then use the `screen` object to access the rendered component, and `screen`'s method `getByText` to earch for an element that has the note content and ensure it exists
* To execute tests not in watch mode use `$ CI=true npm test` or find test coverage with `$ CI=true npm test -- --coverage`
* An alternative to get by text is using CSS selectors / `querySelector`

### Simultating user events
* Use the [`user-event` library](https://testing-library.com/docs/ecosystem-user-event/)
  * `$ npm install --save-dev @testing-library/user-event`
    * To fix bug: `$ npm install -D --exact jest-watch-typeahead@0.6.5`

## End-to-end (E2E) testing 
* Potentially the most useful category of tests, because they test the system through the same interface as real users use
* Downsides:
  * Configuration is more difficult than unit tests or integration tests
  * Slow; with large systems exececution time can be minutes or even hours
    * Bad for detecting regressions
  * Can be flaky: some tests might fail and then succeed from one run to another, even if the code doesn't change 

### Cypress
* Installation as dev dependency: `$ npm install --save-dev cypress`
* Tests are run completely in the browser, which is different from most other E2E librarires that run tests in a Node-process, which is connected to the browser through an API
