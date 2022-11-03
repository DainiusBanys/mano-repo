import { useContext } from "react";
import DataContext from "../../../../my-app/src/Components/016/ContextABC";
import A1 from "./A1";

function A2() {

    const {a2} = useContext(DataContext);
    
    return (
        
<>
<h2>{a2}</h2>

        <A1></A1>
        </>
    )
    
    }
    
    export default A2;