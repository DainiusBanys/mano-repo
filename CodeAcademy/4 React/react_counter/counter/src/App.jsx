import React, { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App-header">
      <button className="fonts" onClick={() => setCounter(counter + 2)}>
        counter +
      </button>
      <button className="fonts" onClick={() => setCounter(counter - 2)}>
        counter -
      </button>
      <div>Current counter value is: {counter}</div>
    </div>
  );
}

export default App;
