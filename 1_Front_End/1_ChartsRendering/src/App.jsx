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



console.log(selector);


  return (
    <>
      <ChartSelector selector={selector} setSelector={setSelector}></ChartSelector>
      {selector.type === 'Bar' && selector.id === 1 ? <BarChart />: <PieChart />}
    </>
  )
}

export function MyChart({chartType, options, data}) {
  console.log('render')
  return (
    <Chart
      // Try different chart types by changing this property with one of: LineChart, BarChart, AreaChart...
      chartType={chartType}
      data={data}
      options={options}
      legendToggle
    />
  );
}

export default App
