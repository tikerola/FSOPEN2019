import React from 'react'

export default ({ part: { name, exercises } }) => {

    return (
        <p>
            {name} {exercises}
        </p>
    )
}