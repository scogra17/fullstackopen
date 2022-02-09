import React, { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Value = ({ text, value }) => {
  return (
    <div>{text} {value}<br /></div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodToValue = newValue => setGood(newValue)
  const setNeutralToValue = newValue => setNeutral(newValue)
  const setBadToValue = newValue => setBad(newValue)
  const allResponses = () => good + neutral + bad
  const averageScore = () => {
    let average = 0
    if (allResponses() > 0) {
      average = (good - bad) / allResponses()
    }
    return average
  }
  const percentPositive = () => {
    let percentPositive = 0;
    if (allResponses() >0) {
      percentPositive = good * 100 / allResponses()
    }
    return `${percentPositive} %`
  }

  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={() => setGoodToValue(good + 1)} text="good"/>
      <Button onClick={() => setNeutralToValue(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBadToValue(bad + 1)} text="bad"/>
      <Header text="statistics"/>
      <Value text="good" value={good}/>
      <Value text="neutral" value={neutral}/>
      <Value text="bad" value={bad}/>
      <Value text="all" value={allResponses()}/>
      <Value text="average" value={averageScore()}/>
      <Value text="positive" value={percentPositive()}/>
    </div>
  )
}

export default App
