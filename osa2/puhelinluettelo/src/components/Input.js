import React from 'react'

export default ({ text, value, setFn }) => {
    
    return (
        <div>
            {text} <input value={value} onChange={(e) => setFn(e.target.value)} />
        </div>
    )
}