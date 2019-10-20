import React from 'react'
import { addFilter } from '../actions/filter'
import { connect } from 'react-redux'

const Filter = ({ addFilter }) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    addFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default connect(null, { addFilter })(Filter)