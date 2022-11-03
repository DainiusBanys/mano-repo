import { useState } from "react";
function Text() {

const [text, setText] = useState('text');
const [color, setColor] = useState('#00FF00');

const inputHandler = e => {
    setText(e.target.value)
}
const inputHandler1 = e => {
    setColor(e.target.value)
}

return (
    <fieldset>
<legend style={{color}}>{ text ? text : 'text'}</legend>
<input type="text" value ={text} onChange={inputHandler}/>
<div></div>
<input type="color" value={color} onChange={inputHandler1}/>

    </fieldset>
)

}

export default Text;