import { useReducer } from 'react';
import './App.scss';
import countSquares from './Reducers/countSquares';
import count from './Reducers/count';
import { useState } from 'react';

function App() {

    const [number, dispatchNumber] = useReducer(count, 0)
    const [numberVal, setNumberVal] = useState('');
    const [sqNumberVal, setSqNumberVal] = useState('');
    const [square, dispatchSquare] = useReducer(countSquares, []);

    const add1 = () => {
        const action = {
            type: 'plus_one'
        }
        dispatchNumber(action);
    }
    const rem1 = () => {
        const action = {
            type: 'minus_one'
        }
        dispatchNumber(action);
    }
    const do0 = () => {
        const action = {
            type: 'reset'
        }
        dispatchNumber(action);
    }

    const addSome = () => {
        const action = {
            type: 'add_some',
            payload: numberVal
        }
        dispatchNumber(action);
    }

    const remSome = () => {
        const action = {
            type: 'rem_some',
            payload: numberVal
        }
        dispatchNumber(action);
    }



    const addSquare = () => {
        const action = {
            type: 'plus_square',
            payload: sqNumberVal
        }
        setSqNumberVal('');
        dispatchSquare(action);
    }
    const remSquare = () => {
        const action = {
            type: 'minus_square'
        }
        dispatchSquare(action);
    }
    const zeroSquare = () => {
        const action = {
            type: 'reset_square'
        }
        dispatchSquare(action);
    }

    const sortAsc = () => {
        const action = {
            type: 'sort_asc',
        }
        dispatchSquare(action);
    }
    const sortDesc = () => {
        const action = {
            type: 'sort_desc',
        }
        dispatchSquare(action);
    }
    const showEven = () => {
        const action = {
            type: 'show_even',
        }
        dispatchSquare(action);
    }
    const showOdd = () => {
        const action = {
            type: 'show_odd',
        }
        dispatchSquare(action);
    }
    const showAll = () => {
        const action = {
            type: 'show_all',
        }
        dispatchSquare(action);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>useReducer</h1>
                <h2>Number now is: {number}</h2>
                <div className='container'>
                    <button onClick={add1}>+1</button>
                    <button onClick={rem1}>-1</button>
                    <button onClick={do0}>0</button>
                    <input className="reducerInput" type="text" value={numberVal} onChange={e => setNumberVal(e.target.value.length <= 2 ? e.target.value : numberVal)} />
                    <button onClick={addSome}>+?</button>
                    <button onClick={remSome}>-?</button>
                </div>
                <div className='container'>
                    <button onClick={addSquare}>+[]</button>
                    <button onClick={remSquare}>-[]</button>
                    <button onClick={zeroSquare}>0[]</button>
                </div>
                <div className='container'>
                    <input className="reducerInput" type="text" value={sqNumberVal} onChange={e => setSqNumberVal(e.target.value.length <= 2 ? e.target.value : numberVal)} />
                    {square.map((s, i) => (s.show) ? <div key={i} className="square" >{s.number}</div> : null)}
                </div>
                <div className='container'>
                    <button onClick={sortAsc}>Sort Asc</button>
                    <button onClick={sortDesc}>Sort Desc</button>
                </div>
                <div className='container'>
                    <button onClick={showEven}>Show Even</button>
                    <button onClick={showOdd}>Show Odd</button>
                    <button onClick={showAll}>Show All</button>

                </div>

            </header>
        </div>
    );
}
export default App; 