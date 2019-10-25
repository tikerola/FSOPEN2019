import React from 'react'
import Login from '../components/login'
import Blogs from '../components/Blogs'
import { connect } from 'react-redux'
import { setUser } from '../actions/user'

const Home = ({ user, blogs, setUser }) => {

  return (
    <div>
      {user
        ?
        <Blogs user={user} blogs={blogs} />
        :
        <Login setUser={setUser} />
      }

    </div>
  )
}

const mapStateToProps = state => ({
  blogs: state.blogs,
  user: state.user
})

const mapDispatchToProps = {
  setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)