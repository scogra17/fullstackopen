# Notes

## State management up to this point
* Add state and methods for handling state to the root component of the application. Pass the state and handler methods to the components with props
* This becomes challenging when applications become larger

## Flux architecture 
* Developed by FB to make state management easier 
* State is separated completely from React-components into its own `stores`
* State in a store is not changed directly, but with different actions
  * When an action changes the state of the store, the views are re-rendered

# Redux
* Simplified version of Flux, state is still stored in "store"
* The whole state of the application is stored in one JS object in the store
* The state of the store is changed with actions, which are objects as well consisting of at least a field indicating the type of action
* The impact of the action to the state of the application is defined using a `reducer`, which is a function that takes the current state and action as parameters and returns a new state
  * The reducer should not be called directly from the application code. Rather it is given as a parameter to the  `createStore` function, which creates the store
  * Actions are "dispatched" to the store with its `dispatch` method e.g. `store.dispatch({ type: 'INCREMENT' })`

## Store
* `.getState()`: get the state of the store
* `.subscribe()`: creates callback functions the store calls when the state is changed, e.g. to log every change in the store to the console: 
```js
store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
```

## Reducer
* Must be a "pure function", which means that it does not cause any side effects
  * One effect: use `.concat` instaed of `.push` when adding to an array in state since `.concat` creates a new array
* Reducer state must be composed of immutable objects. If there is a change in the state, the old object is not changed, but it is replaced with a new, changed object
* Use deep-freeze to ensure the reducer has been correctly defined as an immutable function: `$ npm install --save-dev deep-freeze`