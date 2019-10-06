import React from 'react'

export default ({ message }) => {

    const messageStyles = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null)
        return null

    return <div style={messageStyles}>
        {message}
    </div>
}