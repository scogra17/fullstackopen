# NOTES
## React-router
* Routing: the conditional render of components based on the url in the browser
  * achieved by placing components as children of the `Router` component (see ./notes-pages)
* "BrowserRouter is a Router that uses the HTML5 history API (pushState, replaceState and the popState event) to keep your UI in sync with the URL"
* Manages page navigation
* install with `$ npm install react-router-dom`

## Hook functions
* `useParams`: access parameters from a url within a component
* `useNavigate`: programmatically change the url in the browser

### Rules of hook functions
* Can't be called from within a conditional/loop or any place that is not a function defining a component. This is done to make sure hooks are always called in the same order
* Don't call hooks from inside nested functions
* You should call hooks: 
  1) From Reaction function components
  2) From custom hooks

### Performing tasks on re-render
* Use `useMatch` e.g.: 
  * `const match = useMatch('/notes/:id')`

## Hooks
### Custom hooks
* Regular JS functions that can use other hooks
* Building your own hooks lets you extract component logic into reusable functions
* Naming: must be prefixed with `use...`