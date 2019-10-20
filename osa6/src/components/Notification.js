import React from 'react'
import { connect } from 'react-redux'

const Notification = ({message}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20
  }

  

  if (!message)
    return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

const mapStateToProps = state => ({
  message: state.message
})

export default connect(mapStateToProps)(Notification)