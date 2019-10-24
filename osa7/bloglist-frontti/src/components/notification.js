import React from 'react'
import styled from 'styled-components'

const NotificationContainer = styled.div`
  background-color: #222;
  color: #ddd;
  font-size: 0.9rem;
  border-radius: 5px;
  padding: 10px;
  text-align: 'center';
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
`

const Notification = ({ message }) => {

  if (!message) return null

  return (
    <NotificationContainer>
      {message}
    </NotificationContainer>
  )
}



export default Notification