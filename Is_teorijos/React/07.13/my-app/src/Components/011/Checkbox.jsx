import { useEffect, useState } from "react";

function Checkbox() {

const [checkbox, setCheckbox] = useState({A: true, B: false, C: false, D: true})

const [list, setList] = useState([])

const doChange = e => {
    setCheckbox(c => ({...c,[e.target.value]:!c[e.target.value]}));
}

useEffect(() => {
    const c = [];
    for (const a in checkbox) {
        if (checkbox[a] === true) {
            c.push(a)
        }
    }
    setList(c);
}, [checkbox]);


    return (

<fieldset>
       <legend>Checkbox {list.map(l => <span key={l}>{l}</span>)}</legend>
    <div>A <input type="checkbox" value='A' checked={checkbox.A} onChange={doChange}/></div>
    <div>B <input type="checkbox" value='B' checked={checkbox.B} onChange={doChange} /></div>
    <div>C <input type="checkbox" value='C' checked={checkbox.C} onChange={doChange} /></div>
    <div>D <input type="checkbox" value='D' checked={checkbox.D} onChange={doChange}/></div>

</fieldset>

    )
}

export default Checkbox;