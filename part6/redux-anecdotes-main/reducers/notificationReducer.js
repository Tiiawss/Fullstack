import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    removeNotification(state, action) {
      return null
    },
    setNotification(state, action) {
      return action.payload
    }
    
  }
})

export const { setNotification, setTime, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer

export const notification = (notification, time) => {
  return async (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}