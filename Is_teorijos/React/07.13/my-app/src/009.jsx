import { useEffect, useState } from 'react';
import './App.scss';
import Text from './Components/010/Text';
import Select from './Components/010/Select';

function App() {
    


    return (
        <div className="App">
            <header className="App-header">
                <h1>Form</h1>
                    <div className='container'>
                        <Text setColor={setColor}></Text>
                        <Select color={color}></Select>
                </div>
            </header>
        </div>
    );
}

export default App;