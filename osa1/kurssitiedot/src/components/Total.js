import React from 'react'

export default ({ parts }) => {

    const { exercises : exercises1 } = parts[0]
    const { exercises : exercises2 } = parts[1]
    const { exercises : exercises3 } = parts[2]

    return (
        <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    )
}