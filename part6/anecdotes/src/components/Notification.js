import { useSelector } from "react-redux"
import { notificationChange } from "../reducers/notificationReducer"
import { useDispatch } from 'react-redux'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(({ notification }) => {
    return notification
  })
  setTimeout(() => {
    dispatch(notificationChange(''))
  }, 5000)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default Notification
