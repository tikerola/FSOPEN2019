import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>


const Statistics = props => {

    const { good, neutral, bad } = props

    return (
        <div>

            {(good + neutral + bad) > 0 ?
                (
                    <div>
                        <h1>statistics</h1>
                        <table>
                            <tbody>
                                <Statistic text="good" value={good} />
                                <Statistic text="neutral" value={neutral} />
                                <Statistic text="bad" value={bad} />

                                <Statistic text="all" value={good + neutral + bad} />
                                <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
                                <Statistic text="positive" value={(good / (good + neutral + bad)) * 100 + ' %'} />
                            </tbody>
                        </table>
                    </div>
                )
                :
                <p>No feedback given</p>
            }
        </div>
    )
}


const Button = ({ children, setFn }) => {
    return <button onClick={() => setFn(prevState => prevState + 1)}>
        {children}
    </button>
}


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button setFn={setGood}>good</Button>
            <Button setFn={setNeutral}>neutral</Button>
            <Button setFn={setBad}>bad</Button>

            <Statistics
                good={good}
                neutral={neutral}
                bad={bad}
                setGood={setGood}
                setNeutral={setNeutral}
                setBad={setBad}
            />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)