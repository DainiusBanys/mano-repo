import { useState } from "react";
import rand from "../../Functions/rand";

function Hello({visible, active}) {

const [space, setSpace] = useState(10)

    if (visible !== active) {
        return null;
    }

    return (


    <h2 style={{letterSpacing: [space] + 'px'}} onClick={() => setSpace( s => s = rand(-3,20))}  >Hello World!</h2>
    );


}

export default Hello