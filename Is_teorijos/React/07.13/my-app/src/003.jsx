import './App.css';
import Bebras from './Components/003/Bebras';
import Briedis from './Components/003/Briedis';
import BlueCircle from './Components/BlueCircle';
import RedCircle from './Components/RedCircle';
import randColor from './Functions/randomColor';


const cats = ['Pilkis', "Mukis", 'Kriukis']


function App() {
  return (
    <div className="App">
      <header className="App-header">
<h1 className='start'>Start</h1>
<Bebras />
<Briedis />
{ cats.map((c, i) => <span key={i}>{c}</span>)}
<div className='container'>
{ [...Array(5)].map((_, i) => <BlueCircle key={i} ></BlueCircle>) }</div>
<div className='container'>
{ [...Array(6)].map((_, i) => (i % 2) ? <RedCircle key={i} ></RedCircle> : <BlueCircle key={i} ></BlueCircle>) }</div>

<div className='container'>
{ [...Array(10)].map((_, i) => <div className='circle' style={{borderColor: randColor()}} key={i} ></div>) }</div>

      </header>
    </div>
  );
}

export default App;
