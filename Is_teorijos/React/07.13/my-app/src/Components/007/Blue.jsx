import { useState } from "react"

function Blue() {

    const [count, setCount] = useState(0)    

    return  (

<>
<h2>{count}</h2>
<button onClick={() => setCount( s => s + 1)} >+1</button>
</>

    )
}

export default Blue