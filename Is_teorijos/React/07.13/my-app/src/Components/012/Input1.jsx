import { useState } from "react";
function Input1() {

const [text, setText] = useState('');
const [word, setWord] = useState('');
const [color, setColor] = useState('#00FF00');
const [printcolor, setPrintcolor] = useState('#00FF00');

const add = () => {
     setWord(text);
     setPrintcolor(color);
}


const inputHandler = e => {
    setText(e.target.value)
}
const inputHandler1 = e => {
    setColor(e.target.value)
}

return (
    
    <>
    <div className="input_box"> Task 1
<input type="text" placeholder="Tekstas" value ={text} onChange={inputHandler}/>
<div></div> 
<input type="color" placeholder="Color" value ={color} onChange={inputHandler1}/>
<button onClick={add}>Įvesti</button>
<div style={{color: printcolor}}>   
    {word}
</div>
</div>
{/* <div>A <input type="checkbox" value={checkbox} checked={checkbox} onChange={doChange}/></div> */}
</>
)}

export default Input1;