import Data from "./Data";
import { useContext } from 'react';

function Result() {

    const { result } = useContext(Data)

    return (
        <div className="result">
            <span>Valdymas: Q, W, A, S</span>
            <h2>Missed: {result.missed}</h2>
            <h2>Catched: {result.catched}</h2>
        </div>
    )

}

export default Result;