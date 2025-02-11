import { useState, memo } from "react"

export default function PieChart({ chart, setChart }) {
    const [formData, setFormData] = useState({
        title: '',
        sectors: 2,
        totalValue: 0,
        sectorData: [{id: 1, label: '', value: 0}, {id: 2, label: '', value: 0}]
    })

   
    console.log(formData);
    return (
        <div className="">
            <label htmlFor="title">Title</label>
            <input value={formData.title} id="title" type="text" className="border-1 rounded-sm ml-2" onChange={(e) => setFormData({...formData, title: e.target.value})}/>
            <div className="flex gap-4">
                <label>Number of Sector</label>
                <select id="sector" onChange={(e) => {
                    const newSectorCount = Number(e.target.value);
                    const newSectorData = [...formData.sectorData];

                    while (newSectorData.length < newSectorCount) {
                        newSectorData.push({
                            id: newSectorData.length + 1,
                            label: '',
                        })
                    }

                    while (newSectorCount < newSectorData.length) {
                        newSectorData.pop();
                    }

                    setFormData({
                        ...formData,
                        sectors: newSectorCount,
                        sectorData: newSectorData
                    })
                }}>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                </select>
            </div>
            <label htmlFor="totalValue" >Total Value</label>
            <input id="totalValue" className="border-1 rounded-sm ml-2" type="text" onChange={(e)=> setFormData({...formData, totalValue: e.target.value})}/>
            <div id="sectorCollection" className="flex flex-wrap gap-10 max-w-3/7 border bg-red-100">
                <RenderSector items = {formData.sectorData} formData = {formData} setFormData= {setFormData} />
            </div>
        </div>
    )
}




const RenderSector = memo(function ({items, formData, setFormData}) {
    let sumOfValues = () => {
        let sum = 0
        for (let i = 0; i < formData.sectorData.length-1; i++) {
            sum = sum + formData.sectorData[i].value;
        }
        return sum;
    }

    const getLastSectorValue = () => {
        return Number(formData.totalValue) - sumOfValues();
    };

    return (
        <>
            {items.map((item, index) => (
                <div className="flex flex-col m-auto">
                    <label id={item.id} htmlFor={`sector${index + 1}`} >Sector {index + 1} </label>

                    <div className="flex gap-4 justify-around py-1">
                        <label htmlFor={`label${index}`}>Label</label>
                        <input 
                        id={`label${index}`} 
                        className="border w-25 rounded-sm"
                        type="text"
                        onChange={(e) => {
                            const newSectorData = [...formData.sectorData];
                            newSectorData[index].label = e.target.value;
                            setFormData({...formData, sectorData: newSectorData})
                        }}
                        />
                    </div>
                    <div className="flex gap-4 justify-around pb-2">
                        <label htmlFor={`value${index}`}>Value</label>
                        {index === items.length - 1 ? (
                            <span className="border w-25 rounded-sm px-2 py-1">
                                {getLastSectorValue()}
                            </span>
                        ) : (
                            <input
                                className="border w-25 rounded-sm"
                                type="number"
                                id={`value${index}`}
                                placeholder="0"
                                onChange={(e) => {
                                    const newSectorData = [...formData.sectorData];
                                    newSectorData[index].value = Number(e.target.value);
                                    setFormData({ ...formData, sectorData: newSectorData });
                                }}
                            />
                        )}

                    </div>
                </div>
            ))}
        </>
    )
})
