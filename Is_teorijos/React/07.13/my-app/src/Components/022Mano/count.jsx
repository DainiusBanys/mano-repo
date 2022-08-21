import { useState } from "react";
import randColor from '../../Functions/randomColor'

function Count() {

    const [count, setCount] = useState(0);

    const addCount = () => { (count < 10) ? setCount(count + 1) : setCount(0) };
    const minusCount = () => { (count > -10) ? setCount(count - 1) : setCount(0) };

    return (


        <>
            <h2 style={{color: randColor()}}>Skaitiklis: {count}</h2>
            <button onClick={addCount}>Count plus</button>
            <button onClick={minusCount}>Count minus</button>
        </>

    );

}

export default Count;