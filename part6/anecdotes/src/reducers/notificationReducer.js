import { createSlice } from '@reduxjs/toolkit'

const notificatonSlice = createSlice({
  name: 'notifications',
  initialState: 'Jello world',
  reducers: {
    notificationChange(state, action) {
      state = action.payload 
    }
  }
})

export const { notificationChange } = notificatonSlice.actions
export default notificatonSlice.reducer
