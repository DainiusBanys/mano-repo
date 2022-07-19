import { useState } from "react";

function Squares3() {
    const [count, setCount] = useState(0);

    return <div className="square" onClick={() => setCount(s => s + 1)}>{count}</div>
}

export default Squares3