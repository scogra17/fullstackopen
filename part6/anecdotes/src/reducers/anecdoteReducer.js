import anecdoteService from '../services/anecdotes'

// const anecdoteSlice = createSlice({
//   name: 'anecdotes',
//   initialState,
//   reducers: {
//     createAnecdote(state, action) {
//       const content = action.payload
//       state.push({
//         content,
//         id: getId(),
//         votes: 0
//       })
//     },
//     vote(state, action) {
//       const id = action.payload
//       const anecdoteToChange = state.find(a => a.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }
//       return state.map(anecdote => {
//         return anecdote.id !== id ? anecdote : changedAnecdote
//       })
//     }
//   }
// })

// action creator
export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

// action creator
export const vote = (id) => {
  return {
    type: 'CAST_VOTE',
    data: { id }
  }
}

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CAST_VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => {
        return anecdote.id !== id ? anecdote : changedAnecdote
      })
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'SET_ANECDOTES': 
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// export const { createAnecdote, vote } = anecdoteSlice.actions
// export default anecdoteSlice.reducer
export default reducer
