import { createSlice } from '@reduxjs/toolkit'

const notificatonSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { notificationChange, setNotification } = notificatonSlice.actions

export default notificatonSlice.reducer
