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

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ( { good, neutral, bad }) => {
  const allResponses = () => good + neutral + bad
  const averageScore = () => {
    return (good - bad) / allResponses()
  }
  const percentPositive = () => {
    return `${good * 100 / allResponses()} %`
  }

  if (allResponses() > 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good}/>
          <StatisticsLine text="neutral" value={neutral}/>
          <StatisticsLine text="bad" value={bad}/>
          <StatisticsLine text="all" value={allResponses()}/>
          <StatisticsLine text="average" value={averageScore()}/>
          <StatisticsLine text="positive" value={percentPositive()}/>
        </tbody>
      </table>
    )
  }
  return "No feedback given"
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodToValue = newValue => setGood(newValue)
  const setNeutralToValue = newValue => setNeutral(newValue)
  const setBadToValue = newValue => setBad(newValue)

  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={() => setGoodToValue(good + 1)} text="good"/>
      <Button onClick={() => setNeutralToValue(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBadToValue(bad + 1)} text="bad"/>
      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
