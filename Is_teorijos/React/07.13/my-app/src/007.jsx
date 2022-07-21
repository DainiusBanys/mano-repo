import './App.scss';
import { useState } from "react"
import Blue from './Components/007/Blue';
import Green from './Components/007/Green';
import Red from './Components/007/Red';
import Brown from './Components/007/Brown';
import Yellow from './Components/007/Yellow';
import rand from './Functions/rand';

function App() {
    
    const [count, setCount] = useState(0)
    const [radius, setRadius] = useState(true)
    const [color, setColor] = useState('red')
    const [incr1, setIncr1] = useState(0)
    const [incr2, setIncr2] = useState(0)

    const addRandom = () =>  {
        const rand1 = rand(1,5);
        const rand2 = rand(1,5);
        setIncr1(s => s + rand1); 
        setIncr2(s => s + rand2);
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>State Uplifting</h1>
                <div className='Container'>
                <Green count={count}></Green>   
                <Blue setCount={setCount}></Blue>
                </div>  
                <Yellow addRandom={addRandom}></Yellow>
                <Brown radius={radius} setColor={setColor} incr1={incr1} ></Brown>
                <Red color={color} setRadius={setRadius} incr2={incr2} ></Red>         
                
            </header>
        </div>
    );
}

export default App;