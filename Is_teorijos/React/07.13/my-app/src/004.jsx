import './App.css';
import Form from './Components/004/Form';
import Text from './Components/004/Text';
import Square from './Components/004/Square';
import Colors from './Components/004/Colors';
import Tencircles from './Components/Tencircles';
import A from './Components/A';
import C from './Components/C';


function App() {
  return (
    <div className="App">
      <header className="App-header">
<h1>Props</h1>
<Text zodis="Raudonas Zuikis" color="red"></Text>
<Text zodis="Melynas Zuikis" color="blue"></Text>
<Form forma='square'> </Form>
<Form forma='circle'> </Form>
<Square width='100' height='100'></Square>
<Square width='50' height='50'></Square>
<Square width='150' height='250'></Square>
<Square width='150' height='50'></Square>
<Colors backgroundColor='gray' color='white'></Colors>
<Colors backgroundColor='yellow' color='cyan'></Colors>
<Colors backgroundColor='green' color='orange'></Colors>
<Colors backgroundColor='blue' color='blue'></Colors>
<div className='row'><Tencircles qty={5}></Tencircles></div>
<A color1='red' color2='blue'></A>
<div className='row'>
<C count={6}></C></div>
      </header>
    </div>
  );
}

export default App;
