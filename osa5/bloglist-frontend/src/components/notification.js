import React from 'react'

const Notification = ({ message }) => {

  if (!message) return null

  return (
    <div style={styles}>
      {message}
    </div>
  )
}

const styles = {
  backgroundColor: 'black',
  color: 'yellow',
  fontSize: '2rem',
  padding: 10,
  borderRadius: 5,
  textAlign: 'center'

}

export default Notification