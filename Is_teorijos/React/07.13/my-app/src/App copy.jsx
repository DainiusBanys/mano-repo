import './App.scss';
import { useState } from "react"
import Buttons from './Components/008/Buttons';
import View from './Components/008/View';
import Hello from './Components/008/HelloWorld';
import Hello2 from './Components/008/HelloWorld2';
import SquareRound from './Components/006/SquareRound';

function App() {
    


    const [visible, setVisible] = useState('none')




    return (
        <div className="App">
            <header className="App-header">
                <h1>State Uplifting Tesinys</h1>
                <div className='Container'>
                <View visible={visible} active={1} element={null}></View>
                <View visible={visible} active={2} element={<Hello/>}></View>
                <View visible={visible} active={3} element={<Hello2/>}></View>
                </div>  
                <Buttons setVisible={setVisible} ></Buttons>   
                <SquareRound></SquareRound>

       
                
            </header>
        </div>
    );
}

export default App;