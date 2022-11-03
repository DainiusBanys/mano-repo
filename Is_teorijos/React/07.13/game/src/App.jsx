import { useState } from 'react';
import './App.scss';
import Catcher from './Components/Catcher';
import Data from './Components/Data';
import EggsHolder from './Components/EggsHolder';
import Result from './Components/Result';

function App() {

  const [play, setPlay] = useState(false);
  const [result, setResult] = useState({ missed: 0, catched: 0 });
  const [pos, setPos] = useState(2);
  const [show, setShow] = useState(true);

  const resetPlay = () => {
    setResult({ missed: 0, catched: 0 });
    setPlay(false);
    setShow(false);
    setTimeout(() => setShow(true), 500);
  }

  return (
    <Data.Provider value={{
      play,
      setResult,
      result,
      pos,
      setPos,
    }}>
      <div className="App">
        <div className="game-frame">
          {show ? <EggsHolder side="left top" number={1} roll={1} /> : null}
          {show ? <EggsHolder side="right top" number={2} roll={-1}  /> : null}
          {show ? <EggsHolder side="left bottom" number={3} roll={1}  /> : null}
          {show ? <EggsHolder side="right bottom" number={4} roll={-1}  /> : null}
          <Catcher />
        </div>
        <div className="button-holder">
          <button className="red" onClick={() => setPlay(p => !p)}>Play/Stop</button>
          <button className="red" onClick={() => resetPlay()}>Reset</button>
        </div>
        <Result />
      </div>
    </Data.Provider>
  );

}

export default App;