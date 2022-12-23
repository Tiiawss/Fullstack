import { useState } from 'react'

const StatisticsTable = (props) => {
  console.log( props)
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  
  let average = (props.good - props.bad + props.neutral) / (props.good + props.bad + props.neutral)
  let roundedAverage = average.toFixed(2)
  let positivePercentage = 100 * ( props.good/ (props.good + props.bad + props.neutral))
  let roundedPositivePercentage = positivePercentage.toFixed(2)
  return (
    <div>
    
      
    <table>

      <StatisticsTable text = "good" value = {props.good} />
      <StatisticsTable  text = "neutral" value = {props.neutral} />
      <StatisticsTable  text = "bad" value = {props.bad} />
      <StatisticsTable  text = "average" value = {roundedAverage} />
      <StatisticsTable  text = "positive" value = {roundedPositivePercentage + "%"} />
    </table>
    </div>
  )
}

const Stats = (props) => {
  if ((props.good + props.bad + props.neutral) == 0) {
    return (
      <h1>No feedback</h1>
    )
  }
  else {
    return (
      <Statistics good = {props.good} neutral = {props.neutral} bad = {props.bad} />
    )
  }
}

const Button = (props) => {
  
  return (
    <button onClick={props.handleClick}>
      {props.valueName}
    </button>
    
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button valueName = "good" handleClick = {() => setGood(good +1)} />
      <Button valueName = "neutral" handleClick = {() => setNeutral(neutral +1)} />
      <Button valueName = "bad" handleClick = {() => setBad(bad +1)} />
      <p></p>
      <Stats good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

export default App