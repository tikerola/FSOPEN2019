import React from 'react'
import blogService from '../services/blogs'
import { NavigationContainer, NavigationElement, Button, NavigationGroup } from './Header.styles'

import { connect } from 'react-redux'
import { logout } from '../actions/user'
import withRouter from 'with-router'
import { NavLink } from 'react-router-dom'

const Header = withRouter(({ user, logout, history }) => {

  const handleLogout = () => {
    localStorage.removeItem('savedUser')
    logout()
    blogService.restoreToken('')
    history.push('/')
  }

  if (!user.hasOwnProperty('name'))
    return null

  return (
    <NavigationContainer>
      <NavigationGroup>
        <NavigationElement>
          <NavLink to='/' activeClassName="active" exact>blogs</NavLink>
        </NavigationElement>

        <NavigationElement>
          <NavLink to='/users' activeClassName="active" >users</NavLink>
        </NavigationElement>

        <NavigationElement>{user.name} logged in</NavigationElement>
      </NavigationGroup>
      <NavigationGroup>
        <NavigationElement ><Button onClick={handleLogout}>logout</Button></NavigationElement>
      </NavigationGroup>
    </NavigationContainer>
  )
})

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)