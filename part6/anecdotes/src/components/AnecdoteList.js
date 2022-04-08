import { useSelector, useDispatch } from 'react-redux'
import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes
      .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()
  
  return (
    <div>
      {anecdotes.map(a => {
        const notification = `You voted "${a.content}"`
        return <Anecdote 
        key={a.id}
        anecdote={a}
        handleClick={() => 
          dispatch(likeAnecdote(a)) && 
          dispatch(setNotification(notification)) &&
          setTimeout(() => {
            dispatch(setNotification(''))
          }, 5000)
        }
        />
      })}
    </div>
  )
}

export default AnecdoteList
