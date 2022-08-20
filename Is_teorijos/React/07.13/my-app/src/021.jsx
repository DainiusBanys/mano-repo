import { useState } from 'react';
import './App.scss';
import Circle from './Components/021/Circle';
import rand from './Functions/rand';
function App() {

    const [circles, setCircles] = useState([]);

    const reset = () => {
        setCircles([...Array(rand(5, 15))].map((_, i) => ({ id: i + 1, side: 'left' })));
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Apskritimynas</h1>
                <div className="container">
                    <button className="red" onClick={reset}>RESET</button>
                </div>
                <div className="field">
                    <div className="side left">
                        {
                            circles.map(c => c.side === 'left' ? <Circle key={c.id} circle={c} setCircles={setCircles} circles={circles}></Circle> : null)
                        }
                    </div>
                    <div className="side right">
                        {
                            circles.map(c => c.side === 'right' ? <Circle key={c.id} circle={c} setCircles={setCircles} circles={circles}></Circle> : null)
                        }
                    </div>
                </div>
            </header>
        </div>
    );
}
export default App;