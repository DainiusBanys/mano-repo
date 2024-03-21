import "./App.css";

import { comments } from "./commentData";
import Card from "./Card";

function App() {
  return (
    <div className="App">
      {comments.map((comment) => (
        <Card commentObject={comment} />
      ))}
      ;
    </div>
  );
}

export default App;
