import { useState } from "react";

function Squares5() {
    const [count, setCount] = useState(0);

    return <div style={{borderRadius: (count < 5) ? '0%' : '50%'}} className="square" onClick={() => setCount(s => s + 1)}>{count}</div>
}

export default Squares5