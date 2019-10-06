import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

export default ({ courses }) => {

    return (
        <div>
            {courses.map((course, index) => {
                return (
                    <div key={index}>
                        <Header course={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )
            })}

        </div>
    )
}