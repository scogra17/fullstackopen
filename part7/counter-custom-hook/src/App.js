import { useState } from 'react'

const useCounter = () => {
  const [value, setValue] = useState(0)

  const increase = () => {
    setValue(value + 1)
  }

  const decrease = () => {
    setValue(value - 1)
  }

  const zero = () => {
    setValue(0)
  }

  return {
    value,
    increase,
    decrease,
    zero
  }
}

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
