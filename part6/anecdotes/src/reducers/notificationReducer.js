import { createSlice } from '@reduxjs/toolkit'

const notificatonSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      state = action.payload
      return state 
    }
  }
})

export const { notificationChange } = notificatonSlice.actions
export default notificatonSlice.reducer
