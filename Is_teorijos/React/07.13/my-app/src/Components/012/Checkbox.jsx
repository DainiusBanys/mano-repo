import { useEffect, useState } from "react";

function Checkbox() {

const [checkbox, setCheckbox] = useState(true)
const [checkbox1, setCheckbox1] = useState(true)
let [back, setBack] = useState('blue')
let [radius, setRadius] = useState(0)

const [list, setList] = useState([])

const doChange = e => {
    setCheckbox(c => ({[e.target.value]:!c[e.target.value]}));
    setBack((checkbox.true) ? back = 'blue' : back =  'red');
    console.log(back);
    
}
const doChange1 = e => {
    setCheckbox1(c => ({[e.target.value]:!c[e.target.value]}));
    setRadius((checkbox1.true) ? radius = 0 : radius =  '50%');
console.log(back);

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
<div className="input_box">
<fieldset>
       <legend>Checkbox </legend>
    <div>A <input type="checkbox" value={true} checked={checkbox.A} onChange={doChange}/></div>
    <div>B <input type="checkbox" value={true} checked={checkbox.B} onChange={doChange1}/></div>
</fieldset>
<div className="BlueCircle" style={{backgroundColor: back, borderRadius: radius}}></div>
</div>    )
}

export default Checkbox;