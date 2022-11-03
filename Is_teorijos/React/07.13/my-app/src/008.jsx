import { useEffect, useState } from 'react';
import './App.scss';
import Kv from './Components/009/Kv';
import randColor from './Functions/randomColor';
import Word from './Components/009/Word';
import RandNumbers from './Components/009/MagicNumbers';

function App() {
    
    const magicNumbers = [

        {left: 5, right: 11},
    
        {left: 45, right: 0},
    
        {left: 4, right: 22},
    
        {left: 13, right: 13}
    
    ];

const [kv, setKv] = useState([])
const [plius, setPlius] = useState(1)




const add = () => {
setKv(k => [...k, randColor()]);

}

const plus = () => {
setPlius(s =>  s+1 )
}


useEffect(()=> {
    console.log('kvadratukas pridetas',kv.length)
}, [kv])

useEffect(() => {
   if (plius >10) {
    setPlius(0);

}
}, [plius])

useEffect(() => {

    if (kv.length > 10) {
      setKv([]);
    }

  }, [kv]);


  useEffect(() => {

    if (kv.length === 4 && kv[3] !== 'black') {
        setKv(kv.map((c, i) => i === 3 ? 'black' : c));
    }

  }, [kv]);




    return (
        <div className="App">
            <header className="App-header">
                <h1>Use Effect</h1>
                    <div className='container'>
                    {
kv.map((k, i) => <Kv key={i} k={k} i={i}></Kv> )

}


                </div>  
<div>{plius}</div>

<button onClick={add}>add []</button>     
<button onClick={plus}>plus 1</button>  
<Word color='orange'></Word>
<RandNumbers data={magicNumbers}></RandNumbers>

                
            </header>
        </div>
    );
}

export default App;