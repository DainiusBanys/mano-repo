import { useEffect } from "react";
import { useState } from "react"
import randColor from "../../Functions/randomColor";
 
function Word({color}) {

    const [word, setWord] = useState(null)

   useEffect(() => 
 setWord(color),[color])
    

    return (<>        <span style={{color:word}}>GOOD!!!</span>
        <button onClick={() => setWord(randColor())}>Change Color</button>
        </>

    )
}

export default Word;