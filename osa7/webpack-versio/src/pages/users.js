
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const UsersContainer = styled.div`
    width: 80%;
    height: 400px;
    margin: 0 auto;
    color: #999;
    background: #333;
    padding: 15px;
    border-radius: 5px;
    margin-top: 60px;
    -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  `

const Users = ({ users }) => {

  return (
    <UsersContainer>
      <h2 style={{ color: '#ddd' }}>Users</h2>
      <table>
        <tbody>
          <tr>
            <td><h3>name</h3></td><td><h3>blogs created</h3></td>
          </tr>
          {users.map(user => {
            return <tr key={user.id}>
              <td style={{ width: '300px' }}>
                <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </UsersContainer>
  )
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps)(Users)