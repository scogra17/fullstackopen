const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE': 
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => {
        return note.id !== id ? note : changedNote
      })
    default:
      return state
  }
}

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0))
}

// action creator
export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

// action creator
export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer
