import { useState, memo } from "react";
import { MyChart } from "../App";

function transformDataForChart(formData) {
    return [
        ["Category", formData.yAxisLabel || "Value"],
        ...formData.barData.map(bar => [bar.label || `Bar ${bar.id}`, bar.value])
    ];
}

export default function BarChart({ chart, setChart }) {
    const [formData, setFormData] = useState({
        title: '',
        bars: 2,
        gridInterval: 10,
        yAxisLabel: '',
        barData: [{id: 1, label: '', value: 0}, {id: 2, label: '', value: 0}]
    })

    console.log(formData);
    return (
        <div className="">
            <label htmlFor="title">Title</label>
            <input value={formData.title} id="title" type="text" className="border-1 rounded-sm ml-2" onChange={(e) => setFormData({...formData, title: e.target.value})}/>
            <div className="flex gap-4">
                <label>Number of Bars</label>
                <select id="bars" onChange={(e) => {
                    const newBarCount = Number(e.target.value);
                    const newBarData = [...formData.barData];

                    while (newBarData.length < newBarCount) {
                        newBarData.push({
                            id: newBarData.length + 1,
                            label: '',
                            value: 0
                        })
                    }

                    while (newBarCount < newBarData.length) {
                        newBarData.pop();
                    }

                    setFormData({
                        ...formData,
                        bars: newBarCount,
                        barData: newBarData
                    })
                }}>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                </select>
            </div>
            <div className="flex gap-4">
                <label htmlFor="gridInterval">Grid Interval (10-100)</label>
                <input 
                    id="gridInterval" 
                    className="border-1 rounded-sm ml-2" 
                    type="number"
                    min="10"
                    max="100"
                    value={formData.gridInterval}
                    onChange={(e)=> setFormData({...formData, gridInterval: Number(e.target.value)})}
                />
            </div>
            <div className="flex gap-4">
                <label htmlFor="yAxisLabel">Y-Axis Label</label>
                <input 
                    id="yAxisLabel" 
                    className="border-1 rounded-sm ml-2" 
                    type="text"
                    value={formData.yAxisLabel}
                    onChange={(e)=> setFormData({...formData, yAxisLabel: e.target.value})}
                />
            </div>
            <div id="barCollection" className="flex flex-wrap gap-10 max-w-3/7 border bg-red-100">
                <RenderBars items={formData.barData} formData={formData} setFormData={setFormData} />
            </div>

            <MyChart 
            chartType="BarChart"
            data={transformDataForChart(formData)}
            options={{
                title: formData.title,
                hAxis: { title: "Categories" },
                vAxis: { title: formData.yAxisLabel, gridlines: { count: formData.gridInterval } }
            }}
             />
        </div>

        
    )
}

const RenderBars = memo(function ({items, formData, setFormData}) {
    return (
        <>
            {items.map((item, index) => (
                <div className="flex flex-col m-auto">
                    <label id={item.id} htmlFor={`bar${index + 1}`}>Bar {index + 1}</label>

                    <div className="flex gap-4 justify-around py-1">
                        <label htmlFor={`label${index}`}>Label</label>
                        <input 
                            id={`label${index}`} 
                            className="border w-25 rounded-sm"
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                                const newBarData = [...formData.barData];
                                newBarData[index].label = e.target.value;
                                setFormData({...formData, barData: newBarData})
                            }}
                        />
                    </div>
                    <div className="flex gap-4 justify-around pb-2">
                        <label htmlFor={`value${index}`}>Value</label>
                        <input
                            className="border w-25 rounded-sm"
                            type="number"
                            id={`value${index}`}
                            max="400"
                            value={item.value}
                            onChange={(e) => {
                                const newBarData = [...formData.barData];
                                newBarData[index].value = Math.min(Number(e.target.value), 400);
                                setFormData({ ...formData, barData: newBarData });
                            }}
                        />
                    </div>
                </div>
            ))}
        </>
    )
})