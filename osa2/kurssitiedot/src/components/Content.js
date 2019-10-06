import React from 'react'
import Part from './Part'

export default ({ parts }) => {
    
    return (
        <div>
            {parts.map((part, index) => <Part key={index} part={part} />)}
        </div>
    )
}