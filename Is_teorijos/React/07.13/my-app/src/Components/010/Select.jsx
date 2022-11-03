import { useState } from "react";
const selectData = [{value:'1', text:'one'},{value: '2', text: 'two'}, {value: '3', text: 'three'}, {value: '100', text: 'one hundred'}];
function Select() {

    const [select, setSelect] = useState(5);

    const [color, setColor] = useState(null);

    const [colorInput, setColorInput] = useState('#ffffff');

    const [count, setCount] = useState(0)

    const selectHandler = e => {
        setSelect(e.target.value);
        setCount(c => c +1)
    }


return (
    <fieldset>
    <legend style={{color}}>Selected: <b>{select} </b></legend>
    <h4>Selected count: {count}</h4>
    <select value={select} onChange={selectHandler}>
        {
            selectData.map(s => <option key={s.value} value={s.value}>{s.text}</option>)
        }
    </select>
    <button onClick={() => setColor(colorInput)}>Make Color</button>
    <input type="color" value={colorInput} onChange={e => setColorInput(e.target.value)}></input>
</fieldset>
)

}

export default Select;