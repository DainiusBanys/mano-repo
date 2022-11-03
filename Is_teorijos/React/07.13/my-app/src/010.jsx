import { useEffect, useState } from 'react';
import Text from './Components/011/Text'
import Checkbox from './Components/011/Checkbox';
import './App.scss';

function App() {
    


    return (
        <div className="App">
            <header className="App-header">
                <h1>Form Control 2</h1>
                    <div className='container'>
                        <Text></Text>
                        <Checkbox></Checkbox>

                </div>
            </header>
        </div>
    );
}

export default App;