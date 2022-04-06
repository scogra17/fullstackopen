# Notes

## State management up to this point
* Add state and methods for handling state to the root component of the application. Pass the state and handler methods to the components with props
* This becomes challenging when applications become larger

## Flux architecture 
* Developed by FB to make state management easier 
* State is separated completely from React-components into its own `stores`
* State in a store is not changed directly, but with different actions
  * When an action changes the state of the store, the views are re-rendered