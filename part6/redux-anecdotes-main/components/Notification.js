import React from "react"
import { useSelector} from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    display: notification ? "block" : "none"
  }

  return (notification
    ? <div style={style}>
        {notification}
      </div>
    : null
  ) 
}

export default Notification