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
export const appendAnecdote = (content) => {
  return {
    type: 'APPEND_ANECDOTE',
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

export const replaceAnecdote = (anecdote) => {
  return {
    type: 'REPLACE_ANECDOTE',
    data: anecdote
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CAST_VOTE':
      let id = action.data.id
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
    case 'APPEND_ANECDOTE':
      return [...state, action.data]
    case 'REPLACE_ANECDOTE':
      console.log(action)
      const newID = action.data.id
      return state.map(anecdote => {
        return anecdote.id !== newID ? anecdote : action.data
      })
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

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote.content))
  }
}

export const likeAnecdote = content => {
  return async dispatch => {
    const updatedContent = {
      ...content,
      votes: content.votes + 1
    }
    const newAnecdote = await anecdoteService.update(content.id, updatedContent)
    dispatch(replaceAnecdote(newAnecdote))
  }
}

// export const { createAnecdote, vote } = anecdoteSlice.actions
// export default anecdoteSlice.reducer
export default reducer
