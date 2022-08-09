import { useEffect } from "react";
import { useState } from "react"
import rand from "../../Functions/rand";
 
function RandNumbers({data}) {

    const [numbers, setNumbers] = useState(null)

    useEffect(()=> {
        setNumbers(data.map((e, i) => ({...e, row: i, show: true})).filter(d => d.left !== d.right));
    }, [data]);
    
const add = () => {
const left = rand(0, 45);
const right = rand(0, 45);
if (left !==right) {
    setNumbers(n => [...n, {left, right, row: n.length, show: true}] )
}
}

let numbs =  numbers?.map((lr,i) => lr.show ? <li key={i}>{lr.left} - {lr.right}</li> : null)

const leftSort = () => { 
    setNumbers(n => [...n].sort((a, b) => a.left - b.left))
}
const rightSort = () => { 
    setNumbers(n => [...n].sort((a, b) => a.right - b.right))
}
const doDefault = () => {
    setNumbers(n => [...n].sort((a, b) => a.row - b.row));
}

const filter20 = () => {
    setNumbers(n => n.map(nb => ({...nb, show: nb.left > 20})));
}

const filter10 = () => {
    setNumbers(n => n.map(nb => ({...nb, show: nb.left < 10})));
}

const nofilter = () => {
    setNumbers(n => n.map(nb => ({...nb, show: true})));
}




    return (<>        
    
    <ul>
        {

numbs
           
        }
        </ul>       
        <button onClick={add}>add numbers</button>
        <button onClick={leftSort}>Left sort</button>
        <button onClick={rightSort}>Right sort</button>
        <button onClick={doDefault}>Default sort</button>
        <button onClick={filter20}>More 20</button>
        <button onClick={filter10}>Less 10</button>
        <button onClick={nofilter}>No filter</button>
         </>

    )
}

export default RandNumbers;