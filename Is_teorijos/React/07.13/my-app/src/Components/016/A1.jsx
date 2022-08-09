import { useContext } from "react";
import ContextABC from "./ContextABC";

function A1() {

    const { text } = useContext(ContextABC);

    return (
        <h1>{text}</h1>
    )
}


export default A1;