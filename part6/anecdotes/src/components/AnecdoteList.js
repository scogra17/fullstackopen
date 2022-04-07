import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button
          onClick={handleClick}
        >vote
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes}) => anecdotes.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()
  
  return (
    <div>
      {anecdotes.map(a => {
        return <Anecdote 
        key={a.id}
        anecdote={a}
        handleClick={() => 
          dispatch(vote(a.id))}
        />
      })}
    </div>
  )
}

export default AnecdoteList
