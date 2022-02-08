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

## JS Syntax reminders
### Destructuring assignment
```javascript
const t = [1, 2, 3, 4, 5]
const [first, second, ...rest] = t
console.log(first, second)  // 1, 2 is printed
console.log(rest)          // [3, 4, 5] is printed
```

## Misc
* A component should return either a single root node or an array. The root node, however, can be an empty tag ("fragment") to prevent too many divs from being in the markup
* A component name must be capitalized
