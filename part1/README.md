# About
Notes for part 1 of the course

# Notes
## Using `create-react-app`
* `$ npx create-react-app [app-name]`

## Differences between HTML and JSX
* All tags in JSX must be closed (e.g. <br /> rather than HTML's <br>)

## Passing data to components
* Data is passed as a prop object

## Immutability
* Favor methods that do **not** modify objects in place. The functional paradigm encouraged by React has the characteristic of using immutable data structures (e.g. use Array.prototype.concat rather than Array.prototype.push)

## Hooks (e.g. useState)
* Enable adding state to functional components (previously this needed to be done with class components)
* `useState` (and `useEffect`) must **not** be called from inside a loop, a conditional expression, or any place that is not a function defining a component. This is done to ensure the hooks are always called in the same order (which prevents erratic behavior)
* e.g.:
```javascript
const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

## Best practices
* "Lifting the state up": Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor. Note "it is forbidden in React to mutate state directly". Changing state has to always be done by setting the state to a new object.
* Creating complex state: In most cases the easiest and best way to accomplish this is by using the `useState` function multiple times to create separate "pieces" of state.
* When debugging using `console.log` do not combine objects and strings using the `+` operators. Use a comma instead, e.g. `console.log('props value is', props)`

## JS Syntax reminders
### Destructuring assignment
```javascript
const t = [1, 2, 3, 4, 5]
const [first, second, ...rest] = t
console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4, 5] is printed

// ALSO
const { name, age } = props
```

## Misc
* A component should return either a single root node or an array. The root node, however, can be an empty tag ("fragment") to prevent too many divs from being in the markup
* A component name must be capitalized
* Add `debugger` to code to have Chrome pause execution at that location
