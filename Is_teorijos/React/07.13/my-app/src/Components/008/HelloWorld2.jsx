import { useState } from "react";
import randColor from "../../Functions/randomColor";

function Hello2({visible, active}) {

    const HW = 'Hello World';
    const HWA = [...Array(HW.length)].map((_, i) => ({l:HW[i], c: randColor()}));
    const [hw, setHw] = useState(HWA);
    
    if (visible !== active) {
        return null;
    }



        // <h2>{"Hello World!".split('').map((l, i) => <span style={{color: randColor() }} key={i}>{l}</span> )}</h2>

        const changeColor = () => {
            setHw([...Array(HW.length)].map((_, i) => ({l:HW[i], c: randColor()})));
        }
    
        return (
            <h2 onClick={changeColor}>
                {
                     hw.map((l, i) => <span key={i} style={{color: l.c}}>{l.l}</span>)
                }
            </h2>
        )


}

export default Hello2