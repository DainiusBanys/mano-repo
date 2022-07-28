import {  useState } from "react";
function Input2({setWord, setPrintcolor}) {

const [text, setText] = useState('');
const [color, setColor] = useState('#FFFFFF');

const add = () => {
     setWord(text);
     setPrintcolor(color);
}

// useEffect(() => 
// setPrintcolor(printcolor),[color])

// const doChange = e => {
//     setCheckbox(c => ({[e.target.value]:!c[e.target.value]}));
// }

// const sortName = () => { 
//     setList(l => [...l].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)));
// }


const inputHandler = e => {
    setText(e.target.value)
}
const inputHandler1 = e => {
    setColor(e.target.value)
}

return (
    
    <>
    <div className="input_box">Task 2
<input type="text" placeholder="Tekstas" value ={text} onChange={inputHandler}/>
<div></div> 
<input type="color" placeholder="Color" value ={color} onChange={inputHandler1}/>
<button onClick={add}>Įvesti</button>
<div>   
    {/* {word} */}
</div>
</div>
{/* <div>A <input type="checkbox" value={checkbox} checked={checkbox} onChange={doChange}/></div> */}
</>
)}

export default Input2;