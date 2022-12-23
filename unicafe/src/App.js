import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newValue) => {
    console.log('value now', newValue)
    setGood(newValue)
  }
  const setToNeutral = (newValue) => {
    console.log('value now', newValue)
    setNeutral(newValue)
  }
  const setToBad = (newValue) => {
    console.log('value now', newValue)
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setToGood(good + 1)}>
        good
      </button>
      <button onClick={() => setToNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setToBad(bad + 1)}>
        bad
      </button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}
export default App