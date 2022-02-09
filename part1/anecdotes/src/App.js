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

const Anecdote = ({ anecdote, points }) => {
  return (
    <>
      {anecdote}<br />
      has {points} votes<br />
    </>
  )
}

const TopAnecdote = ( { anecdote, points} ) => {
  if (points > 0) {
    return <Anecdote anecdote={anecdote} points={points}/>
  }
  return "No votes yet cast"
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [topIdx, setTopIdx] = useState(0)

  const setSelectedToValue = () => {
    let newValue = Math.floor(Math.random() * anecdotes.length)
    setSelected(newValue)
  }

  const setTopIdxToValue = (newIdx) => {
    setTopIdx(newIdx)
  }

  const topAnecdoteIdx = () => {
    let topVotes = Math.max(...points)
    // only change current leader if the new leader's
    // point total exceeds the old leader's
    if (topVotes > points[topIdx]) {
      let newTopIdx = points.indexOf(topVotes)
      setTopIdxToValue(newTopIdx)
      return newTopIdx
    }
    return topIdx
  }

  const setPointsToValue = (idx) => {
    return () => {
      const copy = [...points]
      copy[idx] += 1
      setPoints(copy)
    }
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]}/>
      <Button text="vote" onClick={setPointsToValue(selected)}/>
      <Button text="next anecdote" onClick={setSelectedToValue}/>
      <Header text="Anecdote with most votes"/>
      <TopAnecdote anecdote={anecdotes[topAnecdoteIdx()]} points={points[topAnecdoteIdx()]}/>
    </div>
  )
}

export default App
