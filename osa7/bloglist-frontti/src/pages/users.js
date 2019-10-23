
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <td><h3>name</h3></td><td><h3>blogs created</h3></td>
          </tr>
          {users.map(user => {
            return <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps)(Users)