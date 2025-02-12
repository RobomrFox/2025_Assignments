import { useState } from 'react'
import ChartSelector from './components/ChartSelector'
import './App.css'
import { Chart } from 'react-google-charts'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

function App() {

  const [selector, setSelector] = useState({
    type: 'Bar',
    id: 1,
})


  return (
    <>
      <ChartSelector selector={selector} setSelector={setSelector}></ChartSelector>
      {/* <PieChart></PieChart> */}
      <BarChart></BarChart>
      {/* <MyChart></MyChart> */}
    </>
  )
}

function MyChart({chartType, options, data}) {
  console.log('render')
  return (
    <Chart
      // Try different chart types by changing this property with one of: LineChart, BarChart, AreaChart...
      chartType="PieChart"
      data={[
        ["Task", "Hours per Day"],
        ["Work", 9],
        ["Eat", 2],
        ["Commute", 2],
        ["Watch TV", 2],
        ["Sleep", 7],
      ]}
      options={{
        title: "Average Weight by Age",
      }}
      legendToggle
    />
  );
}

export default App
