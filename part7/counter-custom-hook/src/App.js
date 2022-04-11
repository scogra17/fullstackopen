import useCounter from './hooks/counter'

const App = (props) => {
  const { value, increase, decrease, zero } = useCounter()

  return (
    <div>
      <div>{value}</div>
      <button onClick={increase}>
        plus
      </button>
      <button onClick={decrease}>
        minus
      </button>      
      <button onClick={zero}>
        zero
      </button>
    </div>
  )
}

export default App
