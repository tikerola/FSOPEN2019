import React from 'react'
import Part from './Part'

export default ({ parts }) => {
    
    return (
        <div>
            <Part part={parts[0]} />
            <Part part={parts[1]} />
            <Part part={parts[2]} />
        </div>
    )
}