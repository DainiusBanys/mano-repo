import { useState } from "react";

function Count() {

    const [count, setCount] = useState(0);

    const addCount = () => { setCount(count + 1) };
    const minusCount = () => { setCount(count - 1) };

    return (


        <>
            <h2>Skaitiklis: {count}</h2>
            <button onClick={addCount}>Count plus</button>
            <button onClick={minusCount}>Count minus</button>
        </>

    );

}

export default Count;