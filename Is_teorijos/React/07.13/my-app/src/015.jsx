import { useState } from 'react';
import './App.scss';
import LocalStorage from './Components/015/LocalStorage';
import Sq1 from './Components/015/Sq1';
function App() {

    const [counter, setCounter] = useState([0, 0]);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Total Recall {counter[0]} {counter[1]}</h1>
                <Sq1 setCounter={setCounter}/>
                <LocalStorage />
            </header>
        </div>
    );
}
export default App;