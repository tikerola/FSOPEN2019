import React from 'react'

export default ({ parts }) => {

    return (
        <p>
            <strong>
                Total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises
            </strong>
        </p>
    )
}