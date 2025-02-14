import PieChart from "./PieChart";


export default function ChartSelector({selector, setSelector}) {
    
    function selectedGraph(selected) {
        if (selected.target.value === 'Pie') {
            console.log(`Selected Value ${selected.target.value}`);
            setSelector({type: 'Pie', id: 2});
        } else if (selected.target.value === 'Bar') {
            console.log(`Selected Value ${selected.target.value}`);
            setSelector({type: 'Bar', id: 1})
        }
    }

    return <div className='flex gap-4 w-8/10 m-auto justify-center'>
        <span className='text-2xl'>Select Type </span>
        <select id='chart' onChange={selectedGraph} value={selector.type} className='rounded-sm border-1 px-2 py-1'>
            <option value="Pie"> Pie Chart </option>
            <option value="Bar"> Bar Chart </option>
        </select>
    </div>
}