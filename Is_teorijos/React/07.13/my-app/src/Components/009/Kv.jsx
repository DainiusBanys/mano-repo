import { useEffect } from "react";

function Kv({k, i}) {

    
    useEffect(()=> {
        
        console.log('atsirado', i)
}, [])

    return (
        <div className="square" style={{backgroundColor:k}}>{i}</div>
    )
}

export default Kv;