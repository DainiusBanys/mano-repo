import { useState } from 'react';
import Input1 from './Components/012/Input1';
import Input2 from './Components/012/Input2';
import Show from './Components/012/Show';
import './App.scss';

function App() {
    
const [word, setWord] = useState('')
const [printcolor, setPrintcolor] = useState('#ffffff');

    return (
        <div className="App">
            <header className="App-header">
                <h1>Repeat</h1>
                    <div className='container'>
<Input1></Input1>
<div className='input_box'>
<Input2 setWord={setWord} setPrintcolor={setPrintcolor} ></Input2>
<Show word={word} printcolor={printcolor}></Show>
</div>
                </div>
            </header>
        </div>
    );
}

export default App;