import { useState } from "react";

function SquareRound() {
    const [visual, setVisual] = useState(false);

    return <div style={{borderRadius: visual ? '0%' : '50%'}} className="square" onClick={() => setVisual(s => !s)}></div>
}

export default SquareRound