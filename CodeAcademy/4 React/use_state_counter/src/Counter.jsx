import { useState } from "react";
function Counter() {
  const [counter, setCounter] = useState(7);

  const handleClick1 = () => {
    // Counter state is incremented
    setCounter(counter + 1);
  };

  const handleClick2 = () => {
    setCounter(counter - 1);
  };

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick2}>Counter-</button>
      <button onClick={handleClick1}>Counter+</button>
    </div>
  );
}
export default Counter;
