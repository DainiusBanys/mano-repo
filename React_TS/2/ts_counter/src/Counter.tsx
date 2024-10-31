import { useEffect, useState } from "react";
function Counter() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (counter > 10 || counter < 0) {
      setCounter(0);
    }
  }, [counter])
  return (
    <div>
      <button className="fonts" onClick={() => setCounter(counter + 2)}>
        counter +
      </button>
      <button className="fonts" onClick={() => setCounter(counter - 2)}>
        counter -
      </button>
      <div>Current counter value is: {counter}</div>
    </div >
  );
}

export default Counter;
